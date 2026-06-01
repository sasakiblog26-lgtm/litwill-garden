"use client";

import { useState } from "react";
import Link from "next/link";

const lifePathDescriptions: Record<number, { title: string; desc: string; strengths: string[]; challenges: string[] }> = {
  1: {
    title: "開拓者・リーダー",
    desc: "独立心が強く、自分の道を切り開く力があります。創造性と行動力に満ち、リーダーシップを発揮する生まれながらのパイオニアです。",
    strengths: ["強いリーダーシップ", "独創的なアイデア", "決断力と行動力", "自立心と自信"],
    challenges: ["頑固になりやすい", "他者の意見を聞けないことも", "孤独を感じやすい"],
  },
  2: {
    title: "調和者・外交官",
    desc: "繊細な感受性を持ち、人と人をつなぐ調和の才能があります。協力と共感を大切にし、平和な環境を作り出すことが得意です。",
    strengths: ["高い共感力", "チームワーク力", "細部への注意力", "外交的センス"],
    challenges: ["自己主張が苦手", "依存しやすい", "傷つきやすい"],
  },
  3: {
    title: "表現者・クリエイター",
    desc: "豊かな創造性と表現力を持つ魅力的な存在です。コミュニケーション能力が高く、人を楽しませ、インスパイアする才能があります。",
    strengths: ["創造性と芸術性", "コミュニケーション力", "楽観的で明るい", "人を喜ばせる才能"],
    challenges: ["集中力が続かない", "散漫になりやすい", "感情の波が大きい"],
  },
  4: {
    title: "建設者・実務家",
    desc: "実直で忍耐強く、確実に物事を積み上げていく力があります。秩序と安定を重んじ、信頼される存在として周囲を支えます。",
    strengths: ["継続力と忍耐力", "実務能力の高さ", "信頼性と誠実さ", "秩序を作る力"],
    challenges: ["変化を嫌う傾向", "頑固になりやすい", "融通が利かないことも"],
  },
  5: {
    title: "冒険家・自由人",
    desc: "自由と変化を愛する探求者です。好奇心旺盛で適応力が高く、さまざまな経験を通じて人々に新しい視点をもたらします。",
    strengths: ["高い適応力", "多才で好奇心旺盛", "人を引きつける魅力", "新しいことへの挑戦力"],
    challenges: ["飽きっぽい傾向", "無責任に見られることも", "過度なリスクを取る"],
  },
  6: {
    title: "養育者・ハーモニスト",
    desc: "愛情深く、周囲を献身的にサポートする「癒し手」です。家族や仲間への深い愛と責任感を持ち、美しい調和を作り出します。",
    strengths: ["深い愛情と思いやり", "責任感の強さ", "美的センス", "人を助けるサポート力"],
    challenges: ["過度に干渉しやすい", "自己犠牲になりやすい", "完璧主義的"],
  },
  7: {
    title: "探求者・哲学者",
    desc: "深い洞察力と分析力を持つ知識の探求者です。内省的で霊的な感受性があり、物事の本質を見抜く独自の視点を持ちます。",
    strengths: ["深い分析力と洞察力", "霊的感受性", "独自の哲学", "真実を追求する力"],
    challenges: ["孤立しやすい", "批判的になりやすい", "現実的な行動が苦手"],
  },
  8: {
    title: "実力者・達成者",
    desc: "力強いリーダーシップと実行力を持つ、物質的・精神的豊かさを体現する存在です。大きなビジョンを現実に変える力があります。",
    strengths: ["ビジョンと実行力", "ビジネスセンス", "権威と影響力", "目標達成力"],
    challenges: ["支配的になりやすい", "お金への執着", "プレッシャーをかけすぎる"],
  },
  9: {
    title: "人道主義者・完成者",
    desc: "深い人類愛と普遍的な視野を持つ「完成の数」。献身的で寛大な心を持ち、世界をより良くしたいという強い願望があります。",
    strengths: ["広い視野と寛大さ", "芸術的・創造的才能", "強い共感力", "人道的な使命感"],
    challenges: ["自己犠牲になりやすい", "理想と現実のギャップ", "自分のことを後回しに"],
  },
  11: {
    title: "ビジョナリー・光の使者（マスターナンバー）",
    desc: "直感と霊的な洞察力に優れたマスターナンバー11。高い感受性と理想主義を持ち、他者にインスピレーションを与える使命があります。",
    strengths: ["卓越した直感力", "霊的な洞察力", "高い理想とビジョン", "インスピレーションを与える力"],
    challenges: ["過度な感受性", "緊張やストレスを感じやすい", "現実離れしやすい"],
  },
  22: {
    title: "マスタービルダー（マスターナンバー）",
    desc: "夢を現実に変える力を持つマスターナンバー22。大きなビジョンを実践的な行動で実現し、世界に永続的な影響を与える可能性を持ちます。",
    strengths: ["壮大なビジョン", "実践的な実行力", "深い洞察と理解力", "持続的な構築力"],
    challenges: ["重責を感じやすい", "プレッシャーに弱い面も", "完璧主義"],
  },
  33: {
    title: "マスターティーチャー（マスターナンバー）",
    desc: "最高位のマスターナンバー33。深い愛と知恵で世界を癒し、人々を導く使命を持ちます。無条件の愛と献身を体現する存在です。",
    strengths: ["無条件の愛", "深い知恵と理解力", "人を癒す力", "精神的なリーダーシップ"],
    challenges: ["自己犠牲が極端になる", "理想が高すぎる", "自分を後回しにしがち"],
  },
};

function calcLifePath(birthdate: string): number {
  const digits = birthdate.replace(/-/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

const s: React.CSSProperties = {
  background: "rgba(91, 33, 182, 0.15)",
  border: "1px solid rgba(167, 139, 250, 0.25)",
  borderRadius: "1rem",
  padding: "1.25rem",
};

export default function NumerologyPage() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!birthdate) return;
    setResult(calcLifePath(birthdate));
  };

  const data = result !== null ? lifePathDescriptions[result] : null;

  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">
            ← ツール一覧
          </Link>
        </div>

        <div className="text-center mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ NUMEROLOGY ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">数秘術計算機</h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            生年月日から「ライフパスナンバー」を計算します。
            <br />
            あなたの本質と人生テーマを数字で読み解きましょう。
          </p>
        </div>

        {/* Input */}
        <div style={s} className="mb-8">
          <label className="text-purple-300 text-xs tracking-widest block mb-3">✦ 生年月日を入力</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            style={{
              background: "rgba(91, 33, 182, 0.15)",
              border: "1px solid rgba(167, 139, 250, 0.3)",
              borderRadius: "0.75rem",
              color: "white",
              padding: "0.875rem 1rem",
              width: "100%",
              colorScheme: "dark",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          />
          <button
            onClick={calculate}
            disabled={!birthdate}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "9999px",
              background: birthdate ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(91,33,182,0.3)",
              color: birthdate ? "white" : "rgba(167,139,250,0.5)",
              fontWeight: "bold",
              border: "none",
              cursor: birthdate ? "pointer" : "not-allowed",
              fontSize: "1rem",
            }}
          >
            ✦ 計算する ✦
          </button>
        </div>

        {/* Result */}
        {data && result !== null && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(79,70,229,0.3))",
                border: "1px solid rgba(167,139,250,0.4)",
                borderRadius: "1.5rem",
                padding: "2rem",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              <p className="text-purple-300 text-xs tracking-widest mb-2">ライフパスナンバー</p>
              <p
                style={{
                  fontSize: "5rem",
                  fontWeight: "900",
                  background: "linear-gradient(135deg, #c084fc, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {result}
              </p>
              <h2 className="text-white text-xl font-black">{data.title}</h2>
            </div>

            <div style={s} className="mb-4">
              <p className="text-purple-100 text-sm leading-relaxed">{data.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div style={s}>
                <h3 className="text-purple-200 font-bold text-sm mb-3">⭐ 強み</h3>
                <ul className="space-y-1.5">
                  {data.strengths.map((s, i) => (
                    <li key={i} className="text-purple-100 text-xs flex items-start gap-2">
                      <span className="text-purple-400 flex-shrink-0">✦</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={s}>
                <h3 className="text-purple-200 font-bold text-sm mb-3">🌀 課題</h3>
                <ul className="space-y-1.5">
                  {data.challenges.map((c, i) => (
                    <li key={i} className="text-purple-100 text-xs flex items-start gap-2">
                      <span className="text-purple-400 flex-shrink-0">✦</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link href="/fortune/reading">
                <button
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    padding: "0.875rem 2.5rem",
                    borderRadius: "9999px",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                  }}
                >
                  ✦ 詳しい運命鑑定を受ける ✦
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
