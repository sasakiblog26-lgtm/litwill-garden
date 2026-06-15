"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "生年月日を干支に変換しています",
  "四柱（年・月・日・時）を立てています",
  "五行のバランスを観ています",
];

interface Pillar {
  label: string;
  value: string | null;
}
interface MeishikiResult {
  birthLabel: string;
  pillars: Pillar[];
  dayMaster: { gan: string; yomi: string; element: string; body: string };
  gogyo: { counts: Record<string, number>; strongest: string; weakest: string; note: string };
  timeKnown: boolean;
}

const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

const ELEMENT_COLOR: Record<string, string> = {
  木: "#86efac",
  火: "#fb7185",
  土: "#fbbf24",
  金: "#e5e7eb",
  水: "#818cf8",
};

export default function MeishikiTool() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [result, setResult] = useState<MeishikiResult | null>(null);
  const [error, setError] = useState("");
  const ritual = useReadingRitual();

  const calculate = () => {
    if (!birthdate) return;
    setError("");
    ritual.run(async () => {
      try {
        const res = await fetch("/api/meishiki", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthdate, birthtime }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "エラーが発生しました");
        setResult(data.meishiki as MeishikiResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    }, RITUAL_MESSAGES);
  };

  const inputStyle: CSSProperties = {
    background: "rgba(91,33,182,0.15)",
    border: "1px solid rgba(167,139,250,0.3)",
    borderRadius: "0.75rem",
    color: "white",
    padding: "0.875rem 1rem",
    width: "100%",
    colorScheme: "dark",
    fontSize: "1rem",
    marginBottom: "1rem",
  };

  return (
    <>
      <RitualOverlay state={ritual} />

      {/* 入力 */}
      <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }}>
        <label className="text-purple-300 text-xs tracking-widest block mb-2">✦ 生年月日</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} style={inputStyle} />

        <label className="text-purple-300 text-xs tracking-widest block mb-2">✦ 出生時刻（わかる範囲で・任意）</label>
        <input type="time" value={birthtime} onChange={(e) => setBirthtime(e.target.value)} style={inputStyle} />
        <p className="text-purple-400/70 text-xs mb-4">不明な場合は空欄でOK（時柱を除いて算出します）</p>

        {error && <p className="text-red-300 text-sm mb-3">{error}</p>}

        <button
          onClick={calculate}
          disabled={!birthdate || ritual.running}
          style={{
            width: "100%",
            padding: "0.95rem",
            borderRadius: "9999px",
            background: birthdate ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(91,33,182,0.3)",
            color: birthdate ? "white" : "rgba(167,139,250,0.5)",
            fontWeight: "bold",
            border: "none",
            cursor: birthdate && !ritual.running ? "pointer" : "not-allowed",
            fontSize: "1rem",
          }}
        >
          ✦ 無料で命式を出す ✦
        </button>
      </div>

      {/* 結果 */}
      {result && (
        <div style={{ marginTop: "2rem" }}>
          <p className="text-purple-300 text-xs tracking-[0.3em] uppercase text-center mb-2">✦ YOUR 命式 ✦</p>
          <p className="text-purple-400 text-xs text-center mb-6">{result.birthLabel}</p>

          {/* 四柱 */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {result.pillars.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "linear-gradient(160deg, rgba(46,16,101,0.6), rgba(76,29,149,0.4))",
                  border: CARD_BORDER,
                  borderRadius: "0.9rem",
                  padding: "1rem 0.5rem",
                  textAlign: "center",
                }}
              >
                <p className="text-purple-300 text-xs mb-2">{p.label}</p>
                <p className="text-white font-black" style={{ fontSize: "1.6rem", lineHeight: 1.2 }}>
                  {p.value ?? "—"}
                </p>
                {p.value === null && <p className="text-purple-400/60 text-[10px] mt-1">時刻不明</p>}
              </div>
            ))}
          </div>

          {/* 日主 */}
          <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.25rem 1.4rem", marginBottom: "1rem" }}>
            <p className="text-purple-400 text-xs tracking-widest mb-2 font-bold">🀄 あなたを表す「日主（日干）」</p>
            <p className="text-white mb-1">
              <span style={{ fontSize: "1.8rem", fontWeight: 900 }}>{result.dayMaster.gan}</span>
              <span className="text-purple-300 text-sm ml-2">（{result.dayMaster.yomi}）</span>
            </p>
            <p className="text-purple-100 text-sm leading-relaxed">{result.dayMaster.body}</p>
          </div>

          {/* 五行バランス */}
          <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.25rem 1.4rem", marginBottom: "1rem" }}>
            <p className="text-purple-400 text-xs tracking-widest mb-3 font-bold">⚖ 五行バランス</p>
            <div className="space-y-2 mb-3">
              {(["木", "火", "土", "金", "水"] as const).map((el) => {
                const n = result.gogyo.counts[el] ?? 0;
                const max = Math.max(1, ...Object.values(result.gogyo.counts));
                return (
                  <div key={el} className="flex items-center gap-3">
                    <span className="text-purple-200 text-sm w-5">{el}</span>
                    <div style={{ flex: 1, background: "rgba(91,33,182,0.2)", borderRadius: 9999, height: 10, overflow: "hidden" }}>
                      <div style={{ width: `${(n / max) * 100}%`, height: "100%", background: ELEMENT_COLOR[el], borderRadius: 9999, transition: "width .6s ease" }} />
                    </div>
                    <span className="text-purple-300 text-xs w-4 text-right">{n}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">{result.gogyo.note}</p>
          </div>

          {/* 統合鑑定への導線（無料診断） */}
          <Link href="/diagnosis" className="block mb-3">
            <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.1rem 1.4rem" }} className="hover:bg-purple-700/30 transition-colors">
              <p className="text-white font-bold text-sm mb-1">▶ この命式を、西洋占星術・インド占星術と統合して読む（無料）</p>
              <p className="text-purple-300 text-xs">四柱推命だけでなく3つの体系を重ねた「あなたの基礎鑑定」を無料で見る →</p>
            </div>
          </Link>

          {/* 有料CTA */}
          <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.5rem", textAlign: "center" }}>
            <p className="text-white font-bold text-base mb-2">命式を深く読み解いてほしい方へ</p>
            <p className="text-purple-200 text-sm leading-relaxed mb-4">
              あなたの命式をもとに、恋愛・仕事・運気の流れまで読み解くパーソナル鑑定をご用意しています。
            </p>
            <Link href="/readings">
              <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
                ✦ 鑑定メニューを見る ✦
              </button>
            </Link>
          </div>

          <p className="text-purple-400/60 text-xs text-center mt-6">
            ※ 命式は二十四節気に基づき算出しています。鑑定結果は自己理解のヒントとしてお楽しみください。
          </p>
        </div>
      )}
    </>
  );
}
