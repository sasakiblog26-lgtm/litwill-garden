import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "五行タイプ診断｜四柱推命であなたの本質を診断（無料）",
  description:
    "四柱推命の考え方をもとに、生まれ年からあなたの五行（木・火・土・金・水）タイプを無料診断。性格・恋愛・仕事・相性・開運カラー・2026年の運気がわかります。",
  openGraph: {
    title: "五行タイプ診断｜四柱推命であなたの本質を",
    description: "生まれ年から五行タイプを無料診断。性格・相性・開運カラー・2026年の運気まで。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
