/** ナビゲーション構造 */
export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  {
    label: "心理診断",
    href: "/tools",
    children: [
      { label: "MBTI診断", href: "/tools/mbti" },
      { label: "相性診断", href: "/tools/compatibility" },
      { label: "数秘術", href: "/tools/numerology" },
    ],
  },
  {
    label: "占い",
    href: "/fortune",
    children: [
      { label: "占いトップ", href: "/fortune" },
      { label: "鑑定を受ける", href: "/fortune/reading" },
      { label: "診断結果", href: "/fortune/result" },
    ],
  },
  {
    label: "読みもの",
    href: "/articles/self-understanding-guide",
  },
  {
    label: "お問い合わせ",
    href: "/contact",
  },
];

export const footerNavigation = {
  content: [
    { label: "心理診断", href: "/tools" },
    { label: "占い", href: "/fortune" },
    { label: "読みもの", href: "/articles/self-understanding-guide" },
  ],
  tools: [
    { label: "MBTI診断", href: "/tools/mbti" },
    { label: "相性診断", href: "/tools/compatibility" },
    { label: "数秘術", href: "/tools/numerology" },
    { label: "星座占い", href: "/tools/zodiac" },
  ],
  about: [
    { label: "チーム紹介", href: "/team" },
    { label: "運営者情報", href: "/team#operator" },
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
