/**
 * CTA自動挿入ロジック
 *
 * 記事のセクション構成に基づいてCTAブロックを自動挿入する。
 * デバイス言及時にはアフィリエイトリンクも自動挿入する。
 */

import { ctaRules, deviceKeywords, type CtaPosition } from "@/content/prompts/cta-rules";
import type { ArticleTemplateType } from "@/content/prompts/templates";

/**
 * Markdownコンテンツの見出し（H2）でセクションを分割する
 */
function splitBySections(content: string): string[] {
  const sections: string[] = [];
  const lines = content.split("\n");
  let currentSection = "";

  for (const line of lines) {
    if (line.startsWith("## ") && currentSection.trim()) {
      sections.push(currentSection);
      currentSection = line + "\n";
    } else {
      currentSection += line + "\n";
    }
  }
  if (currentSection.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * デバイス関連キーワードの出現をチェックする
 */
function detectDeviceMentions(content: string): string[] {
  const detectedCategories: string[] = [];

  for (const [category, keywords] of Object.entries(deviceKeywords)) {
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        detectedCategories.push(category);
        break;
      }
    }
  }

  return detectedCategories;
}

/**
 * 特定のCTAルールを取得する
 */
function getCtaRule(id: CtaPosition) {
  return ctaRules.find((rule) => rule.id === id);
}

/**
 * 記事コンテンツにCTAブロックを自動挿入する
 *
 * @param content - Markdown形式の記事コンテンツ
 * @param _templateType - 記事テンプレートタイプ（将来のカスタマイズ用）
 * @returns CTA挿入済みのコンテンツ
 */
export function insertCtas(content: string, _templateType: ArticleTemplateType): string {
  const sections = splitBySections(content);
  const result: string[] = [];

  const youtubeCtaRule = getCtaRule("mid-youtube");
  const noteCtaRule = getCtaRule("mid-note");
  const lineCtaRule = getCtaRule("end-line");

  for (let i = 0; i < sections.length; i++) {
    result.push(sections[i]);

    // 記事中盤: YouTube CTA（3番目のセクション後）
    if (
      youtubeCtaRule &&
      typeof youtubeCtaRule.insertAfterSection === "number" &&
      i === youtubeCtaRule.insertAfterSection - 1
    ) {
      result.push("\n" + youtubeCtaRule.template + "\n\n");
    }

    // 記事中盤2: note CTA（4番目のセクション後）
    if (
      noteCtaRule &&
      typeof noteCtaRule.insertAfterSection === "number" &&
      i === noteCtaRule.insertAfterSection - 1
    ) {
      result.push("\n" + noteCtaRule.template + "\n\n");
    }
  }

  // 記事末尾: LINE CTA
  if (lineCtaRule) {
    const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "#";
    const lineTemplate = lineCtaRule.template.replace("{LINE_URL}", lineUrl);
    result.push("\n" + lineTemplate + "\n");
  }

  // デバイス言及チェック & アフィリエイトリンク挿入
  let finalContent = result.join("");
  const detectedDevices = detectDeviceMentions(finalContent);

  if (detectedDevices.length > 0) {
    const affiliateSection = buildAffiliateSection(detectedDevices);
    // まとめセクションの前に挿入
    const summaryIndex = finalContent.lastIndexOf("## まとめ");
    if (summaryIndex !== -1) {
      finalContent =
        finalContent.slice(0, summaryIndex) +
        affiliateSection +
        "\n\n" +
        finalContent.slice(summaryIndex);
    }
  }

  return finalContent;
}

/**
 * 検出されたデバイスカテゴリに基づくアフィリエイトセクションを構築する
 */
function buildAffiliateSection(categories: string[]): string {
  const categoryLabels: Record<string, string> = {
    mouse: "ゲーミングマウス",
    keyboard: "ゲーミングキーボード",
    monitor: "ゲーミングモニター",
    headset: "ゲーミングヘッドセット",
    mousepad: "マウスパッド",
    controller: "コントローラー",
  };

  const items = categories
    .map((cat) => categoryLabels[cat])
    .filter(Boolean)
    .map((label) => `- ${label}のおすすめ商品を見る`)
    .join("\n");

  return `:::affiliate-section
## この記事で紹介したプロが使っているデバイス

${items}

※ 商品リンクはアフィリエイトリンクを含みます。
:::`;
}
