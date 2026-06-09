import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "16タイプ占い性格診断｜占星術×心理学の無料診断",
  description:
    "西洋占星術の4エレメント（火・水・風・地）と心理学を融合したオリジナル性格診断。全12問・約2分、生年月日不要で、あなたの本質を16タイプで読み解きます。",
  openGraph: {
    title: "16タイプ占い性格診断｜占星術×心理学",
    description:
      "占星術の4エレメント×心理学であなたを16タイプで診断。全12問・約2分の無料診断。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
