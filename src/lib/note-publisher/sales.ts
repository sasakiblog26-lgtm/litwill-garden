/**
 * Sales tracking and reporting for note.com articles.
 *
 * Provides functions to sync sales data from the note API, generate
 * revenue reports by date range, and query top-selling articles and
 * magazine subscriber counts.
 */

import { eq, gte, lte, and, desc, sql } from "drizzle-orm";
import { noteArticles, noteSalesLogs } from "@/lib/db/schema";
import { fetchAllSalesData } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Revenue report for a given date range. */
export interface RevenueReport {
  period: { start: Date; end: Date };
  totalRevenue: number;
  totalSales: number;
  byCategory: { category: string; revenue: number; sales: number }[];
  byArticle: { title: string; revenue: number; sales: number }[];
}

/** A top-selling article record. */
export interface TopArticle {
  noteArticleId: number;
  title: string;
  price: number;
  salesCount: number;
  revenue: number;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches sales data from the note API for all published articles, updates
 * the `noteArticles` table with current totals, and inserts new sales
 * entries into `noteSalesLogs`.
 *
 * @param db - Drizzle ORM database instance.
 * @returns The number of articles synced and the total revenue across all articles.
 */
export async function syncSalesData(
  db: any,
): Promise<{ synced: number; totalRevenue: number }> {
  const allSales = await fetchAllSalesData();

  let synced = 0;
  let totalRevenue = 0;

  for (const sale of allSales) {
    // Find the matching noteArticle row by external ID
    const [existing] = await db
      .select()
      .from(noteArticles)
      .where(eq(noteArticles.noteExternalId, sale.noteId))
      .limit(1);

    if (!existing) {
      continue;
    }

    const previousSalesCount = existing.salesCount ?? 0;
    const newSalesCount = sale.salesCount - previousSalesCount;

    // Update the noteArticle row with latest totals
    await db
      .update(noteArticles)
      .set({
        salesCount: sale.salesCount,
        revenue: sale.revenue,
        updatedAt: new Date(),
      })
      .where(eq(noteArticles.id, existing.id));

    // Insert new individual sale log entries for the delta
    if (newSalesCount > 0) {
      const price = existing.price ?? 0;
      // note.com takes roughly 15% platform fee; net is ~85%
      const netAmount = Math.floor(price * 0.85);

      for (let i = 0; i < newSalesCount; i++) {
        await db.insert(noteSalesLogs).values({
          noteArticleId: existing.id,
          saleType: existing.magazineId ? "magazine-subscription" : "single",
          amount: price,
          netAmount,
          purchasedAt: sale.lastSaleAt ?? new Date(),
        });
      }
    }

    synced++;
    totalRevenue += sale.revenue;
  }

  return { synced, totalRevenue };
}

/**
 * Generates a revenue report for the specified date range.
 *
 * Aggregates sales from `noteSalesLogs` joined with `noteArticles` to
 * provide breakdowns by category and by individual article.
 *
 * @param db        - Drizzle ORM database instance.
 * @param startDate - Start of the reporting period (inclusive).
 * @param endDate   - End of the reporting period (inclusive).
 * @returns A complete revenue report with totals and breakdowns.
 */
export async function getRevenueReport(
  db: any,
  startDate: Date,
  endDate: Date,
): Promise<RevenueReport> {
  // Fetch all sales logs within the date range joined with article info
  const salesRows = await db
    .select({
      title: noteArticles.title,
      category: noteArticles.category,
      amount: noteSalesLogs.amount,
      netAmount: noteSalesLogs.netAmount,
    })
    .from(noteSalesLogs)
    .innerJoin(noteArticles, eq(noteSalesLogs.noteArticleId, noteArticles.id))
    .where(
      and(
        gte(noteSalesLogs.purchasedAt, startDate),
        lte(noteSalesLogs.purchasedAt, endDate),
      ),
    );

  let totalRevenue = 0;
  let totalSales = 0;
  const categoryMap = new Map<string, { revenue: number; sales: number }>();
  const articleMap = new Map<string, { revenue: number; sales: number }>();

  for (const row of salesRows) {
    const amount = row.amount ?? 0;
    totalRevenue += amount;
    totalSales++;

    // Aggregate by category
    const cat = row.category ?? "unknown";
    const catEntry = categoryMap.get(cat) ?? { revenue: 0, sales: 0 };
    catEntry.revenue += amount;
    catEntry.sales++;
    categoryMap.set(cat, catEntry);

    // Aggregate by article title
    const title = row.title ?? "Unknown";
    const artEntry = articleMap.get(title) ?? { revenue: 0, sales: 0 };
    artEntry.revenue += amount;
    artEntry.sales++;
    articleMap.set(title, artEntry);
  }

  const byCategory = Array.from(categoryMap.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  const byArticle = Array.from(articleMap.entries())
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  return {
    period: { start: startDate, end: endDate },
    totalRevenue,
    totalSales,
    byCategory,
    byArticle,
  };
}

/**
 * Gets the best-selling note articles ordered by sales count descending.
 *
 * @param db    - Drizzle ORM database instance.
 * @param limit - Maximum number of articles to return. Defaults to 10.
 * @returns An array of top-selling article records.
 */
export async function getTopSellingArticles(
  db: any,
  limit: number = 10,
): Promise<TopArticle[]> {
  const rows = await db
    .select({
      noteArticleId: noteArticles.id,
      title: noteArticles.title,
      price: noteArticles.price,
      salesCount: noteArticles.salesCount,
      revenue: noteArticles.revenue,
    })
    .from(noteArticles)
    .where(sql`${noteArticles.salesCount} > 0`)
    .orderBy(desc(noteArticles.salesCount))
    .limit(limit);

  return rows.map((row: any) => ({
    noteArticleId: row.noteArticleId,
    title: row.title,
    price: row.price ?? 0,
    salesCount: row.salesCount ?? 0,
    revenue: row.revenue ?? 0,
  }));
}

/**
 * Gets the current magazine subscriber count.
 *
 * Counts distinct note articles with a non-null `magazineId` that have
 * active sales, as a proxy for current subscribers.
 *
 * @param db - Drizzle ORM database instance.
 * @returns The number of current magazine subscribers.
 */
export async function getMagazineSubscriberCount(db: any): Promise<number> {
  const [result] = await db
    .select({
      count: sql<number>`coalesce(sum(${noteArticles.salesCount}), 0)`,
    })
    .from(noteArticles)
    .where(sql`${noteArticles.magazineId} is not null`);

  return Number(result?.count ?? 0);
}
