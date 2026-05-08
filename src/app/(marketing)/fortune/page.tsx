import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "魂の星図リーディング - 運命鑑定",
  description:
    "生年月日・出生時刻・出生地から読み解く、あなただけの運命分析。性格・恋愛・仕事・金運を網羅したスピリチュアルリーディングレポート。",
};

const painPoints = [
  { icon: "🌙", text: "自分が何者なのか、うまく言葉にできない" },
  { icon: "💫", text: "恋愛でいつも同じパターンを繰り返している" },
  { icon: "🌿", text: "仕事や進路に迷っていて、方向性が見えない" },
  { icon: "✨", text: "自分の強みを見つけて、もっと輝きたい" },
  { icon: "🔮", text: "なんとなく将来が不安で、心が落ち着かない" },
  { icon: "💎", text: "本当の自分に気づいて、人生を変えたい" },
];

const reportContents = [
  { icon: "🌸", title: "魂のテーマ", desc: "あなたの魂が持つ本質的な使命と、今世のテーマを読み解きます" },
  { icon: "⭐", title: "自然な性格と強み", desc: "生まれながらの才能と、自然に発揮される強みを詳しく分析" },
  { icon: "💜", title: "恋愛・人間関係", desc: "愛情パターン・理想のパートナー像・相性のエネルギーを鑑定" },
  { icon: "🌟", title: "仕事・使命の方向性", desc: "あなたの魂が喜ぶ仕事の種類と、活躍できる環境をリーディング" },
  { icon: "✨", title: "金運の流れ", desc: "お金との関係性、豊かさを引き寄せるパターンを解読" },
  { icon: "🔮", title: "人生のターニングポイント", desc: "重要な時期と、そこでの気づきや選択の意味を明らかに" },
  { icon: "💎", title: "運気を高める習慣", desc: "あなたのエネルギーを高める習慣とアイテムをご紹介" },
  { icon: "🌙", title: "魂からのメッセージ", desc: "今のあなたへ、魂が届けたい言葉と指針をお伝えします" },
];

const steps = [
  { num: "01", title: "情報を入力", desc: "お名前・生年月日・出生時刻・出生地をご入力ください" },
  { num: "02", title: "鑑定・リーディング", desc: "星座・数秘術・タロットの視点から、あなたの情報を丁寧に読み解きます" },
  { num: "03", title: "レポートを受け取る", desc: "美しいデザインの鑑定レポートをダウンロードできます" },
];

export default function FortunePage() {
  return (
    <div style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)" }}>
      {/* ━━━ Hero ━━━ */}
      <section className="relative overflow-hidden py-28 md:py-44 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <span className="absolute top-10 left-1/4 text-purple-300/20 text-5xl">✦</span>
          <span className="absolute top-20 right-1/3 text-indigo-200/15 text-3xl">⋆</span>
          <span className="absolute top-1/3 left-10 text-purple-400/15 text-4xl">✧</span>
          <span className="absolute top-1/4 right-14 text-purple-200/20 text-2xl">✦</span>
          <span className="absolute bottom-1/3 left-1/3 text-indigo-300/15 text-3xl">⋆</span>
          <span className="absolute bottom-20 right-1/5 text-purple-300/15 text-4xl">✧</span>
          <span className="absolute top-2/3 right-1/4 text-purple-400/10 text-5xl">✦</span>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-purple-300 text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            ✦ スピリチュアルリーディング ✦
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-6">
            あなたの魂が描く、
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              人生の星図
            </span>
          </h1>
          <p className="text-purple-200 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            生年月日・出生時刻・出生地から読み解く、
            <br className="hidden sm:block" />
            あなただけの本質と未来へのリーディング。
          </p>
          <Link href="/fortune/reading">
            <button
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
              className="text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
              ✦ 鑑定を受ける ✦
            </button>
          </Link>
          <p className="text-purple-400 text-sm mt-5">所要時間：約3分 ✦ 無料でお試し</p>
        </div>
      </section>

      {/* ━━━ Pain points ━━━ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">
          こんなお悩み、ありませんか？
        </h2>
        <p className="text-purple-300 text-center text-sm mb-12">多くの方が抱えている、心の中の疑問</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map((p, i) => (
            <div
              key={i}
              style={{
                background: "rgba(91, 33, 182, 0.12)",
                border: "1px solid rgba(167, 139, 250, 0.2)",
              }}
              className="rounded-2xl p-5 flex items-start gap-3"
            >
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <p className="text-purple-100 text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-purple-200 mt-10 text-lg leading-relaxed">
          そのすべての答えが、
          <span className="text-purple-300 font-bold">あなたの生まれた瞬間</span>
          に刻まれています。
        </p>
      </section>

      {/* ━━━ Report contents ━━━ */}
      <section style={{ background: "rgba(91, 33, 182, 0.07)" }} className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-purple-300 text-xs tracking-[0.3em] text-center mb-4">REPORT CONTENTS</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">
            鑑定レポートに含まれる内容
          </h2>
          <p className="text-purple-300 text-center text-sm mb-12">
            8つの視点から、あなたの全体像を丁寧に読み解きます
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportContents.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(109, 40, 217, 0.18)",
                  border: "1px solid rgba(167, 139, 250, 0.22)",
                }}
                className="rounded-2xl p-5 text-center hover:border-purple-400/50 transition-colors"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="text-white font-bold mb-2 text-sm">{item.title}</h3>
                <p className="text-purple-300 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ How it works ━━━ */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-purple-300 text-xs tracking-[0.3em] mb-4">HOW IT WORKS</p>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-12">鑑定の流れ</h2>
        <div className="flex flex-col md:flex-row gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex-1">
              <p
                style={{
                  background: "linear-gradient(135deg, #c084fc, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-5xl font-black mb-4"
              >
                {step.num}
              </p>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-purple-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ Sample preview teaser ━━━ */}
      <section className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <div
          style={{
            background: "linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(79, 70, 229, 0.2))",
            border: "1px solid rgba(167, 139, 250, 0.3)",
          }}
          className="rounded-3xl p-8 md:p-12 text-center"
        >
          <p className="text-purple-300 text-xs tracking-widest mb-4">SAMPLE REPORT</p>
          <div className="text-6xl mb-6">🔮</div>
          <h3 className="text-white text-xl md:text-2xl font-black mb-4">
            魂のテーマ：光をやさしく届ける、癒しの調和者
          </h3>
          <p className="text-purple-200 text-sm leading-relaxed max-w-xl mx-auto mb-6">
            あなたの魂は、周囲の人の場の緊張をやわらげ、安心と安らぎを感じてもらうことを喜びとしています。
            美しいものや心地よい空間を好み、人と人の間に橋をかける調和者としての役割を担っています。
          </p>
          <p className="text-purple-400 text-xs">↑ これはサンプルです。あなたの鑑定結果はこちらよりさらに詳細です</p>
        </div>
      </section>

      {/* ━━━ Final CTA ━━━ */}
      <section
        style={{ background: "linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(79, 70, 229, 0.25))" }}
        className="py-24 px-4 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-5xl mb-6">🌙</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
            今、あなたの物語が始まります
          </h2>
          <p className="text-purple-200 mb-10 leading-relaxed">
            星と数が示す、あなただけの設計図。
            <br />
            今日から、より深く自分を知り、
            <br />
            豊かな人生への第一歩を踏み出しましょう。
          </p>
          <Link href="/fortune/reading">
            <button
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
              className="text-white px-14 py-5 rounded-full text-xl font-bold shadow-xl hover:opacity-90 transition-opacity"
            >
              ✦ 鑑定を受ける ✦
            </button>
          </Link>
          <p className="text-purple-400 text-sm mt-6">✦ 無料 ✦ 3分で完了 ✦</p>
        </div>
      </section>
    </div>
  );
}
