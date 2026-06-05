import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDir = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags?: string[];
};

export type Article = ArticleMeta & {
  slug: string;
  contentHtml: string;
};

export type ArticleListItem = ArticleMeta & { slug: string };

export type TaxonomyTerm = { name: string; count: number };

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fullPath = path.join(articlesDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    contentHtml: processed.toString(),
    ...(data as ArticleMeta),
  };
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleListItem[] {
  return getAllArticleSlugs().map((slug) => {
    const fullPath = path.join(articlesDir, `${slug}.md`);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    return { slug, ...(data as ArticleMeta) };
  });
}

/** 新しい順にソート済みの全記事 */
export function getSortedArticles(): ArticleListItem[] {
  return getAllArticles().sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** カテゴリ一覧（記事数つき・多い順） */
export function getAllCategories(): TaxonomyTerm[] {
  const counts = new Map<string, number>();
  for (const a of getAllArticles()) {
    if (!a.category) continue;
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"));
}

/** タグ一覧（記事数つき・多い順） */
export function getAllTags(): TaxonomyTerm[] {
  const counts = new Map<string, number>();
  for (const a of getAllArticles()) {
    for (const t of a.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"));
}

/** 指定カテゴリの記事（新しい順） */
export function getArticlesByCategory(category: string): ArticleListItem[] {
  return getSortedArticles().filter((a) => a.category === category);
}

/** 指定タグの記事（新しい順） */
export function getArticlesByTag(tag: string): ArticleListItem[] {
  return getSortedArticles().filter((a) => (a.tags ?? []).includes(tag));
}

/** 関連記事：同カテゴリ→同タグの順で最大 limit 件（自分は除外） */
export function getRelatedArticles(slug: string, limit = 3): ArticleListItem[] {
  const all = getSortedArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.filter((a) => a.slug !== slug).slice(0, limit);

  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => {
      let score = 0;
      if (a.category === current.category) score += 2;
      const overlap = (a.tags ?? []).filter((t) =>
        (current.tags ?? []).includes(t)
      ).length;
      score += overlap;
      return { article: a, score };
    })
    .sort((x, y) => y.score - x.score);

  return scored.slice(0, limit).map((s) => s.article);
}
