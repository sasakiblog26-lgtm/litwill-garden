import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import {
  getSortedArticles,
  getAllCategories,
  getAllTags,
} from "@/lib/markdown";
import { TYPE_CODES } from "./(marketing)/tools/16types/data";
import { CARDS } from "./(marketing)/tools/tarot/data";
import { ELEMENTS_LIST } from "./(marketing)/tools/gogyo/data";

const base = brand.url;

/**
 * Next.js ネイティブのサイトマップ。
 * 記事・タクソノミー・診断（16タイプ／タロット／五行の各深掘りページ）を
 * データから直接列挙するため、ページを追加すると自動でサイトマップに反映される。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // --- 固定ページ ---
  const staticPaths: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/about", priority: 0.6, changefreq: "monthly" },
    { path: "/team", priority: 0.5, changefreq: "monthly" },
    { path: "/readers", priority: 0.5, changefreq: "monthly" },
    { path: "/readings", priority: 0.9, changefreq: "weekly" },
    { path: "/readings/apply", priority: 0.7, changefreq: "monthly" },
    { path: "/fortune", priority: 0.7, changefreq: "weekly" },
    { path: "/fortune/reading", priority: 0.6, changefreq: "monthly" },
    { path: "/crystals", priority: 0.6, changefreq: "monthly" },
    { path: "/faq", priority: 0.5, changefreq: "monthly" },
    { path: "/contact", priority: 0.4, changefreq: "yearly" },
    { path: "/articles", priority: 0.8, changefreq: "daily" },
    // 診断ツール
    { path: "/diagnosis", priority: 0.8, changefreq: "monthly" },
    { path: "/tools", priority: 0.8, changefreq: "weekly" },
    { path: "/tools/16types", priority: 0.9, changefreq: "monthly" },
    { path: "/tools/tarot", priority: 0.9, changefreq: "monthly" },
    { path: "/tools/gogyo", priority: 0.9, changefreq: "monthly" },
    { path: "/tools/numerology", priority: 0.7, changefreq: "monthly" },
    { path: "/tools/zodiac", priority: 0.7, changefreq: "monthly" },
    { path: "/tools/compatibility", priority: 0.7, changefreq: "monthly" },
    { path: "/tools/mbti", priority: 0.7, changefreq: "monthly" },
    // 法務
    { path: "/legal/privacy", priority: 0.3, changefreq: "yearly" },
    { path: "/legal/terms", priority: 0.3, changefreq: "yearly" },
    { path: "/legal/tokushoho", priority: 0.3, changefreq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changefreq,
    priority: p.priority,
  }));

  // --- 記事 ---
  const articleEntries: MetadataRoute.Sitemap = getSortedArticles().map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // --- カテゴリ / タグ ---
  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${base}/articles/category/${encodeURIComponent(c.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `${base}/articles/tag/${encodeURIComponent(t.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  // --- 診断の深掘りページ ---
  const typeEntries: MetadataRoute.Sitemap = TYPE_CODES.map((code) => ({
    url: `${base}/tools/16types/${code}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const tarotEntries: MetadataRoute.Sitemap = CARDS.map((c) => ({
    url: `${base}/tools/tarot/${c.no}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const gogyoEntries: MetadataRoute.Sitemap = ELEMENTS_LIST.map((e) => ({
    url: `${base}/tools/gogyo/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...articleEntries,
    ...categoryEntries,
    ...tagEntries,
    ...typeEntries,
    ...tarotEntries,
    ...gogyoEntries,
  ];
}
