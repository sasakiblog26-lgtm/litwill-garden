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
};

export type Article = ArticleMeta & {
  slug: string;
  contentHtml: string;
};

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

export function getAllArticles(): (ArticleMeta & { slug: string })[] {
  return getAllArticleSlugs().map((slug) => {
    const fullPath = path.join(articlesDir, `${slug}.md`);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    return { slug, ...(data as ArticleMeta) };
  });
}
