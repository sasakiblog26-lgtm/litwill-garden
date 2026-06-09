import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タロット1枚引き｜今日のあなたへのメッセージ（無料）",
  description:
    "大アルカナ22枚から1枚を引いて、今日のあなたへのメッセージとアドバイスを受け取る無料タロット占い。正位置・逆位置の意味をやさしく解説します。",
  openGraph: {
    title: "タロット1枚引き｜今日のあなたへのメッセージ",
    description: "大アルカナ22枚から引く無料の1枚タロット。今日のヒントを受け取りましょう。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
