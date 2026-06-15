import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "診断・計算ツール一覧",
  description: "16タイプ性格診断・数秘術計算機・星座判定・相性診断・MBTI解説など、自分を深く知るための無料ツール集。",
};

const tools = [
  {
    href: "/tools/meishiki",
    icon: "🀄",
    title: "命式 無料計算（四柱推命）",
    desc: "生年月日から四柱推命の命式（年柱・月柱・日柱・時柱）と日干・五行バランスを無料で自動計算。命式とはも解説。",
    tag: "命式を出す",
  },
  {
    href: "/tools/16types",
    icon: "🔮",
    title: "16タイプ占い性格診断",
    desc: "占星術の4エレメント×心理学で、あなたの本質を16タイプで診断。全12問・約2分、生年月日不要。",
    tag: "12問で診断",
  },
  {
    href: "/tools/tarot",
    icon: "🎴",
    title: "タロット1枚引き",
    desc: "大アルカナ22枚から1枚を引いて、今日のあなたへのメッセージを受け取る無料タロット。毎日引けます。",
    tag: "今日の1枚",
  },
  {
    href: "/tools/gogyo",
    icon: "🌳",
    title: "五行タイプ診断",
    desc: "四柱推命の五行（木・火・土・金・水）であなたの本質を診断。性格・相性・開運カラー・2026年の運気まで。",
    tag: "生まれ年で診断",
  },
  {
    href: "/tools/numerology",
    icon: "✨",
    title: "数秘術計算機",
    desc: "生年月日からライフパスナンバーを計算。あなたの本質と人生テーマを数字で読み解きます。",
    tag: "数字で読む",
  },
  {
    href: "/tools/zodiac",
    icon: "⭐",
    title: "星座・月星座判定",
    desc: "生年月日から太陽星座を判定。12星座の特徴と今月の運勢傾向をご紹介します。",
    tag: "星で読む",
  },
  {
    href: "/tools/compatibility",
    icon: "💜",
    title: "相性診断ツール",
    desc: "2人の生年月日をもとに数秘術で相性スコアを算出。恋愛・友人・仕事別に解説します。",
    tag: "2人で診断",
  },
  {
    href: "/tools/mbti",
    icon: "🔮",
    title: "MBTI・性格タイプ解説",
    desc: "16の性格タイプを一覧で解説。各タイプの強み・弱み・恋愛傾向・向いている仕事がわかります。",
    tag: "タイプ別解説",
  },
];

export default function ToolsPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ TOOLS ✦</p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">診断・計算ツール</h1>
          <p className="text-purple-200 text-sm max-w-xl mx-auto leading-relaxed">
            数字・星・タイプで、あなたの内側をもっと深く知る。
            <br />
            すべて無料で使えます。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="block">
              <div
                style={{
                  background: "rgba(91, 33, 182, 0.12)",
                  border: "1px solid rgba(167, 139, 250, 0.22)",
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                  transition: "all 0.2s",
                }}
                className="h-full hover:border-purple-400/50 hover:bg-purple-900/20"
              >
                <span className="text-4xl block mb-4">{tool.icon}</span>
                <span
                  style={{
                    background: "rgba(109, 40, 217, 0.3)",
                    border: "1px solid rgba(167, 139, 250, 0.3)",
                    borderRadius: "9999px",
                    padding: "0.2rem 0.75rem",
                    color: "#c084fc",
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tool.tag}
                </span>
                <h2 className="text-white font-black text-xl mt-3 mb-2">{tool.title}</h2>
                <p className="text-purple-300 text-sm leading-relaxed">{tool.desc}</p>
                <p className="text-purple-400 text-sm mt-4 font-bold">使ってみる →</p>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            background: "rgba(91, 33, 182, 0.1)",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <p className="text-purple-300 text-sm">
            🔮 さらに詳しいパーソナル鑑定をご希望の方は
            <Link href="/fortune" className="text-purple-200 font-bold underline ml-1">
              運命鑑定レポート
            </Link>
            へ
          </p>
        </div>
      </div>
    </div>
  );
}
