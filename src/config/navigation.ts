export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "コラム", href: "/articles/self-understanding-guide" },
  { label: "無料診断", href: "/tools" },
  { label: "占い", href: "/fortune" },
  { label: "チーム", href: "/team" },
  { label: "お問い合わせ", href: "/contact" },
];

export const footerNavigation = {
  content: [
    { label: "コラム", href: "/articles/self-understanding-guide" },
    { label: "ガイド", href: "/guides" },
    { label: "ランキング", href: "/ranking" },
  ],
  tools: [
    { label: "MBTI診断", href: "/tools/mbti" },
    { label: "相性診断", href: "/tools/compatibility" },
    { label: "数秘術", href: "/tools/numerology" },
    { label: "星座占い", href: "/tools/zodiac" },
  ],
  about: [
    { label: "チーム紹介", href: "/team" },
    { label: "よくある質問", href: "/faq" },
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
