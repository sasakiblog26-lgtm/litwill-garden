export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "占いコラム", href: "/articles" },
  { label: "鑑定メニュー", href: "/readings" },
  { label: "無料診断", href: "/diagnosis" },
  { label: "診断・計算ツール", href: "/tools" },
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
    { label: "プライバシーポリシー", href: "/legal/privacy" },
    { label: "利用規約", href: "/legal/terms" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  ],
};
