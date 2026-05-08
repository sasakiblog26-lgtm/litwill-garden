/** ナビゲーション構造 */
export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  {
    label: "心理テスト",
    href: "/tests",
    children: [
      { label: "性格診断", href: "/tests?category=personality" },
      { label: "恋愛診断", href: "/tests?category=love" },
      { label: "強み診断", href: "/tests?category=strengths" },
    ],
  },
  {
    label: "占い",
    href: "/fortune",
    children: [
      { label: "星座占い", href: "/fortune?category=horoscope" },
      { label: "数秘術", href: "/fortune?category=numerology" },
      { label: "タロット", href: "/fortune?category=tarot" },
    ],
  },
  {
    label: "記事・コラム",
    href: "/articles",
  },
  {
    label: "ツール",
    href: "/tools",
  },
];

export const footerNavigation = {
  content: [
    { label: "心理テスト", href: "/tests" },
    { label: "占い", href: "/fortune" },
    { label: "記事・コラム", href: "/articles" },
  ],
  tools: [
    { label: "診断ツール", href: "/tools" },
  ],
  about: [
    { label: "チーム紹介", href: "/team" },
    { label: "運営者情報", href: "/team#operator" },
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
