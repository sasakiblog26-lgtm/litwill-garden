import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "鑑定結果 - 魂の星図リーディング",
  description: "あなたの魂が描く、人生の星図。スピリチュアルリーディング鑑定結果。",
};

const strengths = [
  "深い共感力で人の心を動かせる",
  "直感が鋭く、本質を見抜く力がある",
  "美的センスと感性が豊か",
  "真面目でコツコツ努力できる",
  "調和を生み出すバランス感覚",
];

const challenges = [
  "気にしすぎて疲れやすい",
  "察しすぎて自分を苦しめる",
  "完璧を求めすぎてしまう",
  "考えすぎて動けなくなることも",
  "自分の価値を十分に認識できない",
];

const loveTendency = [
  "愛は安心感の中でつながることを重視するタイプ",
  "相手の気持ちを感じながら大切にする",
  "期待されると応えようと頑張りすぎる",
  "傷つくことを怖れ、慎重に心を開く",
  "優しすぎるがゆえに自分を見失いがち",
];

const relationships = [
  "少数の深いつながりを大切にする",
  "聞き上手で人から信頼される",
  "話を押しつけることなく柔らかいサポート",
  "共感されることで自分も喜びを感じる",
];

const workDirection = [
  "感性とやさしさを活かせる仕事が向いている",
  "ヒーリング・アロマ・オーガニック関連",
  "デザイン・アート・ライティング",
  "教育・保育・サポート系",
  "自然・環境に関わる仕事",
];

const habits = [
  "朝、空や光を感じて深呼吸する",
  "自然の中をゆっくり歩く",
  "感謝日記をつける",
  "感情を溜め込まず紙に書き出す",
  "自分だけの静かな時間をつくる",
];

const items = ["💜 ラベンダーアメジスト", "🌕 ムーンストーン", "✨ セレナイト", "🌸 ローズクォーツ"];

const lifeCycles = [
  { period: "〜18歳", label: "受感期", desc: "感性を育て、可能性を広げる時期。多くの経験が未来の土台に。" },
  { period: "19〜28歳", label: "探求期", desc: "学びと挑戦で自分の土台を築く。" },
  { period: "29〜36歳", label: "花開き期", desc: "才能が開花し、人との縁が広がる。" },
  { period: "37〜45歳", label: "安定期", desc: "安定と愛の時期。自分の場所が見つかる。" },
  { period: "46歳〜", label: "実り期", desc: "経験と知恵が人の役に立ち、次世代へ受け継がれていく。" },
];

function Section({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(91, 33, 182, 0.12)",
        border: "1px solid rgba(167, 139, 250, 0.2)",
        borderRadius: "1rem",
        padding: "1.25rem",
      }}
    >
      <h3 className="text-purple-200 font-bold text-sm mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-purple-100 text-xs leading-relaxed flex items-start gap-2">
          <span className="text-purple-400 flex-shrink-0 mt-0.5">✦</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResultPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0a0520 0%, #13073a 50%, #080e1f 100%)", minHeight: "100vh" }}
      className="py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* ━━━ Header ━━━ */}
        <div className="text-center mb-12">
          <p className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-4">
            ✦ あなたの魂の星図 ✦
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
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
          <p className="text-purple-300 text-sm">
            未来のあなたを思い出し、調和の流れに乗るスピリチュアルリーディング
          </p>
        </div>

        {/* ━━━ Soul Theme (Main) ━━━ */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(109, 40, 217, 0.3), rgba(79, 70, 229, 0.3))",
            border: "1px solid rgba(167, 139, 250, 0.4)",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "1.5rem",
          }}
          className="text-center"
        >
          <p className="text-purple-300 text-xs tracking-widest mb-3">✦ 魂のテーマ ✦</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            光をやさしく届ける、
            <br className="md:hidden" />
            <span className="text-purple-300">癒しの調和者</span>
          </h2>
          <p className="text-purple-100 text-sm leading-relaxed max-w-xl mx-auto">
            あなたの魂は、周囲の人の場の緊張をやわらげ、安心と安らぎを感じてもらうことを喜びとしています。
            美しいものや心地よい空間を好み、人と人の間に橋をかける調和者としての役割を担っています。
            あなたのやさしさは、この世にとってかけがえのない光です。
          </p>
        </div>

        {/* ━━━ Natural Personality ━━━ */}
        <div
          style={{
            background: "rgba(91, 33, 182, 0.15)",
            border: "1px solid rgba(167, 139, 250, 0.25)",
            borderRadius: "1.5rem",
            padding: "1.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <h3 className="text-purple-200 font-bold text-sm tracking-widest mb-4 text-center">
            ☽ 自然な性格
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["繊細で感受性が豊か", "優しく温かみがある", "謙虚で一途", "一人の時間も大切にする"].map((trait, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(109, 40, 217, 0.2)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <p className="text-purple-100 text-xs leading-relaxed">{trait}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ 2-column grid ━━━ */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Section title="強み" icon="⭐">
            <BulletList items={strengths} />
          </Section>
          <Section title="弱点・課題" icon="🌀">
            <BulletList items={challenges} />
          </Section>
          <Section title="恋愛傾向" icon="💜">
            <BulletList items={loveTendency} />
          </Section>
          <Section title="人間関係の特徴" icon="🤝">
            <BulletList items={relationships} />
          </Section>
          <Section title="仕事の向いている方向" icon="🌿">
            <BulletList items={workDirection} />
          </Section>
          <Section title="運気を高める習慣" icon="✨">
            <BulletList items={habits} />
          </Section>
        </div>

        {/* ━━━ Recommended items ━━━ */}
        <div
          style={{
            background: "rgba(91, 33, 182, 0.12)",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "1rem",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <h3 className="text-purple-200 font-bold text-sm mb-4 text-center">💎 おすすめのアイテム</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {items.map((item, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(109, 40, 217, 0.25)",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  borderRadius: "9999px",
                  padding: "0.4rem 1rem",
                  color: "#e9d5ff",
                  fontSize: "0.8rem",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ━━━ Life cycles ━━━ */}
        <div
          style={{
            background: "rgba(91, 33, 182, 0.12)",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h3 className="text-purple-200 font-bold text-sm mb-5 text-center">🌙 人生のサイクルとテーマ</h3>
          <div className="flex flex-col md:flex-row gap-3">
            {lifeCycles.map((cycle, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-purple-400 text-xs mb-1">{cycle.period}</p>
                <div
                  style={{
                    background: "rgba(109, 40, 217, 0.3)",
                    border: "1px solid rgba(167, 139, 250, 0.3)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem",
                  }}
                >
                  <p className="text-purple-200 font-bold text-xs mb-1">{cycle.label}</p>
                  <p className="text-purple-300 text-xs leading-relaxed">{cycle.desc}</p>
                </div>
                {i < lifeCycles.length - 1 && (
                  <span className="hidden md:block text-purple-400 text-xl mt-1">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ Message ━━━ */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(79, 70, 229, 0.25))",
            border: "1px solid rgba(167, 139, 250, 0.35)",
            borderRadius: "1.5rem",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <p className="text-purple-300 text-xs tracking-widest mb-4">✦ あなたへのメッセージ ✦</p>
          <p className="text-white text-base md:text-lg leading-relaxed font-bold mb-4">
            あなたのやさしさは、この世にとってかけがえのない光です。
          </p>
          <p className="text-purple-200 text-sm leading-relaxed max-w-xl mx-auto">
            比べるのは、過去の自分だけでいい。
            <br />
            あなたのペースで、あなたらしい道を歩んでください。
            <br />
            その先に、あなただけの豊かさと幸せが、きっと待っています。
          </p>
          <p className="text-purple-400 text-sm mt-6">— 運命より、あなたへ 🌙</p>
        </div>

        {/* ━━━ CTA ━━━ */}
        <div className="text-center">
          <p className="text-purple-300 text-sm mb-6">
            このレポートはサンプルです。
            <br />
            あなただけのパーソナル鑑定をご希望の方はこちら。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fortune">
              <button
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "9999px",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ✦ 本格鑑定を申し込む ✦
              </button>
            </Link>
            <Link href="/fortune/reading">
              <button
                style={{
                  background: "transparent",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "9999px",
                  color: "#c084fc",
                  fontWeight: "bold",
                  border: "1px solid rgba(167, 139, 250, 0.4)",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                もう一度診断する
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
