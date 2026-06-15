"use client";

import { useState } from "react";
import Link from "next/link";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "2人の数を導いています",
  "運命のリズムを重ねています",
  "相性を読み解いています",
];

function calcLifePath(birthdate: string): number {
  const digits = birthdate.replace(/-/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

const compatibilityData: Record<string, { score: number; romance: string; friendship: string; work: string }> = {
  "1-1": { score: 72, romance: "互いの独立心を尊重し合えれば強いパートナーシップに。ぶつかりやすいが情熱的な関係。", friendship: "競い合いながら高め合える刺激的な友情。", work: "リーダー同士で意見が衝突することも。役割分担が鍵。" },
  "1-2": { score: 85, romance: "行動力のある1と優しい2が補い合う理想的な組み合わせ。バランスが良い。", friendship: "2が1をしっかりサポートする安定した関係。", work: "リーダーとサポーターとして最高のチームに。" },
  "1-3": { score: 78, romance: "互いの個性を活かし合える明るい関係。刺激と楽しさがある。", friendship: "一緒にいると楽しく盛り上がる仲良しコンビ。", work: "アイデアと行動力が組み合わさり、強力なチームに。" },
  "1-4": { score: 68, romance: "価値観の違いが大きい。理解し合うには時間がかかる。", friendship: "安定と変化の違いを尊重できれば長続きする友情。", work: "4の安定感と1の行動力が補い合えば強力。" },
  "1-5": { score: 80, romance: "自由と冒険を共有できる刺激的な関係。束縛は禁物。", friendship: "一緒にいると楽しく、お互いを高め合える。", work: "エネルギッシュなコンビ。新規事業に向いている。" },
  "1-6": { score: 75, romance: "6の温かさが1を癒し、1の行動力が6を助ける。", friendship: "頼りになる友人関係。お互いに支え合える。", work: "リーダーと調和者として理想的な組み合わせ。" },
  "1-7": { score: 65, romance: "深い理解が必要。コミュニケーションを大切に。", friendship: "刺激的だが価値観のすり合わせが必要。", work: "7の分析力と1の行動力が組み合わされば最強。" },
  "1-8": { score: 82, romance: "力強い者同士の強烈な引き合い。対等な関係が大切。", friendship: "互いを高め合える刺激的な友情。", work: "大きな目標を共有できる強力なビジネスパートナー。" },
  "1-9": { score: 70, romance: "9の大きな愛が1を包む。価値観の違いを超えて深まる。", friendship: "1のエネルギーと9の広い視野で世界を広げる友情。", work: "ビジョンと行動力の組み合わせで大きな成果を生む。" },
};

function getCompatibility(a: number, b: number) {
  const key1 = `${Math.min(a, b)}-${Math.max(a, b)}`;
  const key2 = `${a}-${b}`;
  return compatibilityData[key1] || compatibilityData[key2] || {
    score: 70 + Math.floor(Math.random() * 20),
    romance: "互いの違いを認め合うことで、深い絆が生まれます。コミュニケーションを大切にしましょう。",
    friendship: "お互いの良さを引き出し合える友人関係です。一緒に成長できます。",
    work: "補い合いながら成果を出せるペアです。役割分担を明確にすることが大切。",
  };
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "#a78bfa" : score >= 70 ? "#818cf8" : "#6366f1";
  return (
    <div style={{ background: "rgba(91,33,182,0.2)", borderRadius: "9999px", height: "0.625rem", width: "100%", overflow: "hidden" }}>
      <div style={{ background: color, width: `${score}%`, height: "100%", borderRadius: "9999px", transition: "width 0.8s ease" }} />
    </div>
  );
}

export default function CompatibilityPage() {
  const [birthdate1, setBirthdate1] = useState("");
  const [birthdate2, setBirthdate2] = useState("");
  const [result, setResult] = useState<{ a: number; b: number; data: ReturnType<typeof getCompatibility> } | null>(null);
  const ritual = useReadingRitual();

  const calculate = () => {
    if (!birthdate1 || !birthdate2) return;
    ritual.run(() => {
      const a = calcLifePath(birthdate1);
      const b = calcLifePath(birthdate2);
      setResult({ a, b, data: getCompatibility(a, b) });
    }, RITUAL_MESSAGES);
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(91, 33, 182, 0.15)",
    border: "1px solid rgba(167, 139, 250, 0.25)",
    borderRadius: "1rem",
    padding: "1.25rem",
  };

  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <RitualOverlay state={ritual} />
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>

        <div className="text-center mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ COMPATIBILITY ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">相性診断ツール</h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            2人の生年月日から数秘術で相性を診断します。
            <br />
            恋愛・友人・仕事の3つの視点から読み解きます。
          </p>
        </div>

        <div style={cardStyle} className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-purple-300 text-xs tracking-widest block mb-2">✦ あなたの生年月日</label>
              <input
                type="date"
                value={birthdate1}
                onChange={(e) => setBirthdate1(e.target.value)}
                style={{ background: "rgba(91,33,182,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "0.75rem", color: "white", padding: "0.75rem 0.875rem", width: "100%", colorScheme: "dark", fontSize: "0.9rem" }}
              />
            </div>
            <div>
              <label className="text-purple-300 text-xs tracking-widest block mb-2">✦ 相手の生年月日</label>
              <input
                type="date"
                value={birthdate2}
                onChange={(e) => setBirthdate2(e.target.value)}
                style={{ background: "rgba(91,33,182,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "0.75rem", color: "white", padding: "0.75rem 0.875rem", width: "100%", colorScheme: "dark", fontSize: "0.9rem" }}
              />
            </div>
          </div>
          <button
            onClick={calculate}
            disabled={!birthdate1 || !birthdate2 || ritual.running}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "9999px",
              background: birthdate1 && birthdate2 ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(91,33,182,0.3)",
              color: birthdate1 && birthdate2 ? "white" : "rgba(167,139,250,0.5)",
              fontWeight: "bold",
              border: "none",
              cursor: birthdate1 && birthdate2 ? "pointer" : "not-allowed",
              fontSize: "1rem",
            }}
          >
            ✦ 相性を診断する ✦
          </button>
        </div>

        {result && (
          <div>
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
              <p className="text-purple-300 text-xs tracking-widest mb-3">総合相性スコア</p>
              <div className="flex items-center justify-center gap-6 mb-4">
                <div>
                  <p className="text-purple-400 text-xs mb-1">あなた</p>
                  <p style={{ fontSize: "2.5rem", fontWeight: "900", background: "linear-gradient(135deg, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{result.a}</p>
                </div>
                <span className="text-purple-400 text-2xl">×</span>
                <div>
                  <p className="text-purple-400 text-xs mb-1">相手</p>
                  <p style={{ fontSize: "2.5rem", fontWeight: "900", background: "linear-gradient(135deg, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{result.b}</p>
                </div>
              </div>
              <p style={{ fontSize: "4rem", fontWeight: "900", background: "linear-gradient(135deg, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: "0.5rem" }}>
                {result.data.score}
                <span style={{ fontSize: "1.5rem" }}>点</span>
              </p>
              <ScoreBar score={result.data.score} />
              <p className="text-purple-300 text-xs mt-2">/ 100点</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: "💜", label: "恋愛相性", text: result.data.romance },
                { icon: "✨", label: "友人相性", text: result.data.friendship },
                { icon: "🌿", label: "仕事相性", text: result.data.work },
              ].map((item) => (
                <div key={item.label} style={cardStyle}>
                  <h3 className="text-purple-200 font-bold text-sm mb-2">{item.icon} {item.label}</h3>
                  <p className="text-purple-100 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/fortune/reading">
                <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.875rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
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
