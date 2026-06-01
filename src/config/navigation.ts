export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
<<<<<<< HEAD
  { label: "占いコラム", href: "/articles" },
  { label: "鑑定メニュー", href: "/readings" },
  { label: "無料診断", href: "/diagnosis" },
  { label: "クリスタル", href: "/crystals" },
  { label: "占い師紹介", href: "/readers" },
];

export const footerNavigation = {
  service: [
    { label: "鑑定メニュー", href: "/readings" },
    { label: "無料診断", href: "/diagnosis" },
    { label: "占いコラム", href: "/articles" },
    { label: "クリスタルガイド", href: "/crystals" },
  ],
  about: [
    { label: "占い師紹介", href: "/readers" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  legal: [
=======
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
>>>>>>> origin/main
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "利用規約", href: "/legal/terms" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
