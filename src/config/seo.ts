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
  guides: {
    title: "攻略ガイド",
    description: "Apex Legends の立ち回り・エイム・戦術を体系的に解説する攻略ガイド集",
  },
  characters: {
    title: "キャラクター攻略",
    description: "全レジェンドのアビリティ解説・立ち回り・おすすめ武器を徹底攻略",
  },
  weapons: {
    title: "武器攻略",
    description: "全武器のダメージ・リコイル・おすすめアタッチメントを詳細解説",
  },
  ranking: {
    title: "ランク攻略",
    description: "ブロンズからプレデターまで。ランク別の立ち回りと上達のコツ",
  },
  settings: {
    title: "設定・デバイス",
    description: "プロゲーマーの感度設定・デバイス環境を徹底調査。最適な設定を見つけよう",
  },
  tierList: {
    title: "ティアリスト",
    description: "最新シーズンのキャラ・武器ティアリスト。メタ環境を一目で把握",
  },
  tools: {
    title: "ツール",
    description: "感度計算機などApexプレイヤー向けの便利ツール集",
  },
} as const;
