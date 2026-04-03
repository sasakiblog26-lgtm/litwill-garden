/** ナビゲーション構造 */
export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  {
    label: "攻略ガイド",
    href: "/guides",
    children: [
      { label: "初心者ガイド", href: "/guides?category=beginner" },
      { label: "立ち回り", href: "/guides?category=positioning" },
      { label: "エイム練習", href: "/guides?category=aim" },
    ],
  },
  {
    label: "キャラ攻略",
    href: "/characters",
  },
  {
    label: "武器攻略",
    href: "/weapons",
  },
  {
    label: "ランク攻略",
    href: "/ranking",
  },
  {
    label: "ティアリスト",
    href: "/tier-list",
  },
  {
    label: "設定・デバイス",
    href: "/settings",
  },
  {
    label: "ツール",
    href: "/tools",
  },
];

export const footerNavigation = {
  content: [
    { label: "攻略ガイド", href: "/guides" },
    { label: "キャラ攻略", href: "/characters" },
    { label: "武器攻略", href: "/weapons" },
    { label: "ランク攻略", href: "/ranking" },
    { label: "ティアリスト", href: "/tier-list" },
  ],
  tools: [
    { label: "感度計算機", href: "/tools" },
    { label: "設定・デバイス", href: "/settings" },
  ],
  about: [
    { label: "チーム紹介", href: "/team" },
    { label: "運営者情報", href: "/team#operator" },
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
