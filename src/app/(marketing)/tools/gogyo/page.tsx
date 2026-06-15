"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { snsAccounts } from "@/config/sns";
import { ELEMENT_DATA, yearToElement } from "./data";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "十干をひもといています",
  "五行のバランスを観ています",
  "あなたのタイプを読み解いています",
];

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

// ---------------------------------------------------------------------------
// 入力
// ---------------------------------------------------------------------------

function InputView({ onSubmit }: { onSubmit: (year: number) => void }) {
  const [year, setYear] = useState("");

  const inputStyle: CSSProperties = {
    fontSize: 18,
    border: "1.5px solid rgba(167,139,250,0.4)",
    borderRadius: 12,
    padding: "12px 16px",
    textAlign: "center",
    outline: "none",
    color: "#fff",
    background: "rgba(124,58,237,0.12)",
    width: "140px",
  };

  const submit = () => {
    const y = parseInt(year, 10);
    if (y >= 1900 && y <= 2026) onSubmit(y);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ FIVE ELEMENTS ✦</p>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">五行タイプ診断</h1>
      <p className="text-purple-200 text-sm leading-relaxed mb-8">
        東洋の占い「四柱推命」の考え方をもとに、あなたの生まれ持った
        <strong className="text-white">五行（木・火・土・金・水）</strong>のタイプを診断します。
        生まれ年を入力するだけ。
      </p>
      <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-8">
        <label className="block text-purple-200 text-sm mb-4 font-semibold">生まれ年（西暦）を入力してください</label>
        <div className="flex items-center justify-center gap-2 mb-6">
          <input type="text" inputMode="numeric" placeholder="1990" maxLength={4} value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} aria-label="生まれ年" />
          <span className="text-purple-300">年</span>
        </div>
        <button
          onClick={submit}
          disabled={!year}
          style={{ background: year ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(124,58,237,0.3)", padding: "0.85rem 3rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: year ? "pointer" : "default", fontSize: "1rem" }}
        >
          ✦ 診断する ✦
        </button>
      </div>
      <p className="text-purple-400/70 text-xs leading-relaxed">
        ※ 生まれ年の十干から五行を判定します。この診断はエンターテインメントとしてお楽しみください。
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 結果
// ---------------------------------------------------------------------------

function ResultView({ year, onReset }: { year: number; onReset: () => void }) {
  const element = yearToElement(year);
  const d = ELEMENT_DATA[element];

  const share = (platform: "x" | "line") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `私の五行タイプは「${element}」${d.icon}でした！\n${d.catch}\n\nあなたの五行は？`;
    const link =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        : `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const sectionStyle: CSSProperties = { background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.25rem 1.4rem", textAlign: "left", marginBottom: "1rem" };
  const labelStyle: CSSProperties = { color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "0.5rem" };
  const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 };

  return (
    <div className="max-w-xl mx-auto text-center">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-3">✦ YOUR ELEMENT ✦</p>
      <div className="text-6xl mb-3">{d.icon}</div>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{element}タイプ</h1>
      <p className="text-purple-200 text-sm italic mb-2">{d.catch}</p>
      <p className="text-purple-400 text-xs mb-8">{year}年生まれ</p>

      <div style={sectionStyle}>
        <p style={labelStyle}>🌿 あなたの性格</p>
        <p style={bodyStyle}>{d.desc}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>✨ 強み</p>
        <p style={bodyStyle}>{d.strengths.join(" ／ ")}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>💜 恋愛傾向</p>
        <p style={bodyStyle}>{d.love}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🌱 向いている仕事</p>
        <p style={bodyStyle}>{d.work}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🤝 相性のいいタイプ</p>
        <p style={bodyStyle}>{d.match}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🎨 開運カラー</p>
        <p style={bodyStyle}>{d.color}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🔮 ラッキークリスタル</p>
        <p style={bodyStyle}>{d.crystal}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🌟 2026年の運気</p>
        <p style={bodyStyle}>{d.fortune2026}</p>
      </div>

      {/* deep dive */}
      <Link href={`/tools/gogyo/${d.slug}`} className="block mb-10">
        <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.1rem 1.4rem", textAlign: "left" }} className="hover:bg-purple-700/30 transition-colors">
          <p className="text-white font-bold text-sm mb-1">▶ 「{element}タイプ」をもっと詳しく読む</p>
          <p className="text-purple-300 text-xs">詳しい性格・弱み・恋愛・適職・相生相剋の相性・開運アドバイスをチェック</p>
        </div>
      </Link>

      <p className="text-purple-300 text-sm mt-8 mb-3">結果をシェアする</p>
      <div className="flex justify-center gap-3 mb-10">
        <button onClick={() => share("x")} style={{ background: "#000", color: "#fff", border: "1px solid #444", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>𝕏 でシェア</button>
        <button onClick={() => share("line")} style={{ background: "#06C755", color: "#fff", border: "none", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>LINE</button>
      </div>

      {/* LINE lead magnet */}
      <div style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-6">
        <p className="text-white font-bold text-base mb-2">🎁 あなたの五行の【開運ガイド】を無料プレゼント</p>
        <p className="text-purple-100 text-sm leading-relaxed mb-5">
          LINE友だち追加で、<strong className="text-white">五行別の運気の活かし方・月別の開運アドバイス</strong>をお届けします。
        </p>
        <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
          <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            LINEで開運ガイドを受け取る
          </button>
        </a>
      </div>

      {/* CTA */}
      <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-6">
        <p className="text-white font-bold text-base mb-2">本格的に占ってほしい方へ</p>
        <p className="text-purple-200 text-sm leading-relaxed mb-5">
          四柱推命を含むパーソナル鑑定で、あなたの運命をより深く読み解きます。
        </p>
        <Link href="/readings">
          <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            ✦ フル鑑定を申し込む ✦
          </button>
        </Link>
      </div>

      <button onClick={onReset} className="text-purple-400 text-sm hover:text-purple-300 underline">
        もう一度診断する
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ページ
// ---------------------------------------------------------------------------

export default function GogyoPage() {
  const [year, setYear] = useState<number | null>(null);
  const ritual = useReadingRitual();

  const handleSubmit = (y: number) => {
    ritual.run(() => setYear(y), RITUAL_MESSAGES);
  };

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <RitualOverlay state={ritual} />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>
        {year === null ? <InputView onSubmit={handleSubmit} /> : <ResultView year={year} onReset={() => setYear(null)} />}
      </div>
    </div>
  );
}
