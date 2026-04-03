/**
 * End-to-end publishing pipeline for note.com articles.
 *
 * Orchestrates the full workflow from fetching a site article, converting
 * it to note format, publishing via the API, persisting the record, and
 * generating sales reports.
 */

import { eq } from "drizzle-orm";
import { articles, noteArticles } from "@/lib/db/schema";
import { publishToNote } from "./client";
import { NOTE_ARTICLE_CATEGORIES, NOTE_PRICE_TIERS } from "./categories";
import type { NoteCategory } from "./categories";
import { convertArticleToNote } from "./converter";
import type { SiteArticle } from "./converter";
import { syncSalesData, getRevenueReport } from "./sales";
import type { RevenueReport } from "./sales";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Maps a price category string to the corresponding note price tier value.
 */
function resolvePriceTier(priceCategory: string): number {
  const tierMap: Record<string, number> = {
    free: NOTE_PRICE_TIERS.free,
    standard: NOTE_PRICE_TIERS.standard,
    premium: NOTE_PRICE_TIERS.premium,
    highEnd: NOTE_PRICE_TIERS.highEnd,
    magazine: NOTE_PRICE_TIERS.magazine,
  };
  return tierMap[priceCategory] ?? NOTE_PRICE_TIERS.free;
}

/**
 * Finds a matching NoteCategory from the predefined categories based on
 * article type and price tier.
 */
function findNoteCategory(
  articleType: string,
  price: number,
): NoteCategory {
  const match = NOTE_ARTICLE_CATEGORIES.find(
    (cat) => cat.type === articleType && cat.price === price,
  );

  if (match) {
    return match;
  }

  // Fallback: construct a category on the fly
  return {
    title: "",
    type: articleType,
    price,
    description: "",
    isMagazine: false,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Full publishing pipeline: fetches an article from the database, converts
 * it to note format, publishes it to note.com, saves the note article
 * record, and links it back to the source article.
 *
 * @param db            - Drizzle ORM database instance.
 * @param articleId     - The ID of the site article to publish.
 * @param priceCategory - Price category key (e.g. `"free"`, `"standard"`, `"premium"`, `"highEnd"`).
 * @returns The new `noteArticleId` and the public note.com `url`.
 * @throws {Error} If the article is not found in the database.
 */
export async function publishArticleToNote(
  db: any,
  articleId: number,
  priceCategory: string,
): Promise<{ noteArticleId: number; url: string }> {
  // Step 1: Fetch the article from the database
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) {
    throw new Error(`Article with id ${articleId} not found`);
  }

  const siteArticle: SiteArticle = {
    id: article.id,
    title: article.title,
    content: article.content,
    category: article.category,
    articleType: article.articleType ?? "beginner-guide",
    excerpt: article.excerpt ?? "",
  };

  // Step 2: Resolve price and find matching note category
  const price = resolvePriceTier(priceCategory);
  const noteCategory = findNoteCategory(siteArticle.articleType, price);

  // Step 3: Convert to note format
  const noteInput = convertArticleToNote(siteArticle, noteCategory);

  // Step 4: Publish to note.com
  const { noteId, url } = await publishToNote(noteInput);

  // Step 5: Insert the note article record
  const [noteArticle] = await db
    .insert(noteArticles)
    .values({
      title: siteArticle.title,
      noteSlug: url.split("/").pop() ?? null,
      noteExternalId: noteId,
      price,
      category: priceCategoryToDbCategory(priceCategory),
      articleType: siteArticle.articleType,
      content: noteInput.body,
      sourceArticleId: articleId,
      status: "published",
      publishedAt: new Date(),
    })
    .returning();

  // Step 6: Link the note article back to the source article
  await db
    .update(articles)
    .set({
      noteArticleId: noteArticle.id,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, articleId));

  return {
    noteArticleId: noteArticle.id,
    url,
  };
}

/**
 * Publishes a new entry to the monthly Apex meta report magazine on note.com.
 *
 * @param db      - Drizzle ORM database instance.
 * @param content - The magazine entry content in Markdown.
 * @param title   - The title of the magazine entry.
 * @returns The new `noteArticleId` and the public note.com `url`.
 */
export async function publishMagazineEntry(
  db: any,
  content: string,
  title: string,
): Promise<{ noteArticleId: number; url: string }> {
  const magazineCategory = NOTE_ARTICLE_CATEGORIES.find(
    (cat) => cat.isMagazine,
  );

  if (!magazineCategory) {
    throw new Error("Magazine category not found in NOTE_ARTICLE_CATEGORIES");
  }

  const magazineId = process.env.NOTE_MAGAZINE_ID;
  if (!magazineId) {
    throw new Error(
      "NOTE_MAGAZINE_ID environment variable is not set. Cannot publish magazine entry.",
    );
  }

  const noteInput = {
    title,
    body: content,
    status: "published" as const,
    price: NOTE_PRICE_TIERS.magazine,
    magazineId,
    tags: ["ApexLegends", "メタ分析", "パッチノート", "ティアリスト"],
  };

  // Publish to note.com
  const { noteId, url } = await publishToNote(noteInput);

  // Insert the note article record
  const [noteArticle] = await db
    .insert(noteArticles)
    .values({
      title,
      noteSlug: url.split("/").pop() ?? null,
      noteExternalId: noteId,
      price: NOTE_PRICE_TIERS.magazine,
      category: "magazine",
      articleType: "meta-report",
      content: noteInput.body,
      status: "published",
      magazineId,
      publishedAt: new Date(),
    })
    .returning();

  return {
    noteArticleId: noteArticle.id,
    url,
  };
}

/**
 * Syncs sales data from the note API and generates a revenue report for
 * the current calendar month.
 *
 * @param db - Drizzle ORM database instance.
 * @returns A revenue report covering the current month to date.
 */
export async function syncAndReport(db: any): Promise<RevenueReport> {
  // Sync latest sales data
  await syncSalesData(db);

  // Generate report for current month
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = now;

  return getRevenueReport(db, startDate, endDate);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Maps a price category key to the database category value.
 */
function priceCategoryToDbCategory(priceCategory: string): string {
  const map: Record<string, string> = {
    free: "free",
    standard: "paid-980",
    premium: "paid-2980",
    highEnd: "paid-4980",
    magazine: "magazine",
  };
  return map[priceCategory] ?? "free";
}
