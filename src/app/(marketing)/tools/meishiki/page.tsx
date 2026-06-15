import type { Metadata } from "next";
import Link from "next/link";
import MeishikiTool from "./meishiki-client";

export const metadata: Metadata = {
  title: "命式 無料計算｜生年月日から四柱推命の命式を自動で出す",
  description:
    "生年月日（出生時刻があればより正確）から、四柱推命の命式（年柱・月柱・日柱・時柱）と日干・五行バランスを無料で自動計算。「命式とは何か」もやさしく解説します。",
  alternates: { canonical: "/tools/meishiki" },
};

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

const FAQ = [
  {
    q: "命式は無料で出せますか？",
    a: "はい。このページで生年月日（任意で出生時刻）を入力するだけで、四柱推命の命式を無料で自動計算できます。会員登録も不要です。",
  },
  {
    q: "出生時刻がわからなくても大丈夫ですか？",
    a: "大丈夫です。時柱を除いた年柱・月柱・日柱と五行バランスを算出します。出生時刻がわかると時柱まで出て、より詳しい命式になります。",
  },
  {
    q: "命式と算命学の違いは何ですか？",
    a: "どちらも生年月日から干支を割り出しますが、本ツールは四柱推命の命式（四柱）を算出します。読み解きの体系（通変星・十二運など）は流派によって異なります。",
  },
];

export default function MeishikiPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-10">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ MEISHIKI ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">命式 無料計算</h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            生年月日（出生時刻があればより正確）から、四柱推命の<strong className="text-white">命式</strong>
            ——年柱・月柱・日柱・時柱と、あなたを表す<strong className="text-white">日干（日主）</strong>・五行バランスを
            その場で自動計算します。
          </p>
        </div>

        {/* ツール本体（クライアント） */}
        <MeishikiTool />

        {/* 命式とは（SEO・静的） */}
        <section style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem", marginTop: "3rem" }}>
          <h2 className="text-white font-black text-xl mb-4">命式とは？</h2>
          <div className="text-purple-100 text-sm leading-relaxed space-y-3">
            <p>
              <strong className="text-white">命式（めいしき）</strong>とは、四柱推命で使う「あなたの設計図」です。
              生まれた<strong className="text-white">年・月・日・時</strong>の4つの時点を、それぞれ
              干支（十干十二支）で表したものを指します。この4本の柱（年柱・月柱・日柱・時柱）からなるため、
              「<strong className="text-white">四柱</strong>推命」と呼ばれます。
            </p>
            <p>
              中でも重要なのが、日柱の天干＝<strong className="text-white">日干（にっかん／日主）</strong>。
              これが「あなた自身」を表す中心点で、性格や本質を読み解く出発点になります。
            </p>
            <p>
              命式からは、木・火・土・金・水の<strong className="text-white">五行のバランス</strong>を見て、
              生まれ持った強み・弱み、運気の傾向を読み解きます。
              出生時刻がわかると時柱まで算出でき、より精度が上がります（不明でも年月日で命式は出せます）。
            </p>
            <p className="text-purple-300">
              本ツールは二十四節気（節入り）に基づいて月柱・日柱を正確に算出しています。
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: "2rem" }}>
          <h2 className="text-white font-black text-xl mb-4 text-center">よくある質問</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <div key={f.q} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.1rem 1.4rem" }}>
                <p className="text-white font-bold text-sm mb-2">Q. {f.q}</p>
                <p className="text-purple-200 text-sm leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 関連導線 */}
        <div style={{ background: "rgba(91,33,182,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "1rem", padding: "1.5rem", marginTop: "2rem", textAlign: "center" }}>
          <p className="text-purple-300 text-sm">
            命式をもっと深く知りたい方は
            <Link href="/diagnosis" className="text-purple-200 font-bold underline mx-1">無料の統合鑑定</Link>
            や
            <Link href="/readings" className="text-purple-200 font-bold underline mx-1">鑑定メニュー</Link>
            へ。
          </p>
        </div>
      </div>
    </div>
  );
}
