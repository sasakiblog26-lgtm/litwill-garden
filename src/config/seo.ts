import { brand } from "./brand";

/** デフォルトSEO設定 */
export const defaultSeo = {
  titleTemplate: `%s | ${brand.name}`,
  defaultTitle: `${brand.name} - ${brand.tagline}`,
  description: brand.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: brand.url,
    siteName: brand.name,
    images: [
      {
        url: `${brand.url}/og-default.png`,
        width: 1200,
        height: 630,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    { name: "theme-color", content: brand.colors.background },
    { name: "color-scheme", content: "dark" },
  ],
} as const;

/** カテゴリ別SEO設定 */
export const categorySeo = {
  tests: {
    title: "心理テスト・性格診断",
    description: "性格診断・恋愛診断・強み診断など、科学的根拠に基づいた心理テスト集",
  },
  fortune: {
    title: "占い",
    description: "星座占い・数秘術・タロットなど、あなたの運勢や本質を読み解く占いコンテンツ",
  },
  articles: {
    title: "記事・コラム",
    description: "心理学・自己理解・人間関係に関する読み応えあるコラム記事",
  },
  tools: {
    title: "診断ツール",
    description: "自己分析・相性診断など、インタラクティブに楽しめる診断ツール集",
  },
} as const;
