/**
 * 記事生成スクリプト
 * 使い方: npx tsx src/agents/content-writer/run.ts
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY  - Anthropic APIキー（必須）
 *   ARTICLE_KEYWORD    - メインKW（デフォルト: "Apex Legends 初心者 始め方"）
 *   ARTICLE_CATEGORY   - カテゴリ（デフォルト: beginner）
 *   ARTICLE_RANK       - ターゲットランク帯（任意）
 */

import { generateArticle } from "./index.js";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

async function main() {
  const input = {
    keyword: process.env.ARTICLE_KEYWORD ?? "Apex Legends 初心者 始め方",
    category: (process.env.ARTICLE_CATEGORY ?? "beginner") as Parameters<typeof generateArticle>[0]["category"],
    targetRank: process.env.ARTICLE_RANK || undefined,
  };

  console.log("🚀 記事生成開始:", input.keyword);

  const result = await generateArticle(input);
  if (!result) {
    console.error("❌ 生成失敗");
    process.exit(1);
  }

  // src/content/articles/ に保存
  const outDir = join(process.cwd(), "src/content/articles");
  mkdirSync(outDir, { recursive: true });

  const filename = `${result.slug}.md`;
  const frontmatter = `---
title: "${result.title}"
slug: "${result.slug}"
category: "${input.category}"
seoTitle: "${result.seoMeta.title}"
seoDescription: "${result.seoMeta.description}"
keywords: [${result.seoMeta.keywords.map((k) => `"${k}"`).join(", ")}]
generatedAt: "${new Date().toISOString()}"
---

`;

  writeFileSync(join(outDir, filename), frontmatter + result.content, "utf-8");

  console.log(`✅ 記事生成完了: src/content/articles/${filename}`);
  console.log(`   タイトル: ${result.title}`);
  console.log(`   スラッグ: ${result.slug}`);
}

main().catch((err) => {
  console.error("❌ エラー:", err);
  process.exit(1);
});
