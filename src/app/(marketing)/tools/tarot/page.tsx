"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { snsAccounts } from "@/config/sns";
import { CARDS, type Card } from "./data";

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

interface Draw {
  card: Card;
  reversed: boolean;
}

// ---------------------------------------------------------------------------
// イントロ（カードを引く）
// ---------------------------------------------------------------------------

function DrawView({ onDraw }: { onDraw: () => void }) {
  const backStyle: CSSProperties = {
    width: 110,
    height: 180,
    borderRadius: 14,
    background: "linear-gradient(160deg, #2e1065, #4c1d95)",
    border: "1.5px solid rgba(167,139,250,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    cursor: "pointer",
    boxShadow: "0 8px 30px rgba(124,58,237,0.35)",
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ DAILY TAROT ✦</p>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">タロット1枚引き</h1>
      <p className="text-purple-200 text-sm leading-relaxed mb-10">
        心を静かにして、今日のあなたへのメッセージを受け取りましょう。<br />
        知りたいことを思い浮かべながら、カードを1枚選んでください。
      </p>
      <div className="flex justify-center gap-4 mb-10">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ ...backStyle, transform: `rotate(${(i - 1) * 6}deg)` }} className="hover:-translate-y-2 transition-transform" onClick={onDraw}>
            <span style={{ color: "#c4b5fd" }}>✦</span>
          </div>
        ))}
      </div>
      <button
        onClick={onDraw}
        style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.95rem 3rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "1rem" }}
      >
        ✦ カードを引く ✦
      </button>
      <p className="text-purple-400/70 text-xs leading-relaxed mt-8">
        ※ この診断はエンターテインメントです。結果は今日を前向きに過ごすヒントとしてお楽しみください。
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 結果
// ---------------------------------------------------------------------------

function ResultView({ draw, onReset }: { draw: Draw; onReset: () => void }) {
  const { card, reversed } = draw;
  const m = reversed ? card.reversed : card.upright;
  const position = reversed ? "逆位置" : "正位置";

  const share = (platform: "x" | "line") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `今日のタロットは「${card.name}（${position}）」${card.icon}\n${m.keywords.join("・")}\n\nあなたの1枚は？`;
    const link =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        : `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const cardFaceStyle: CSSProperties = {
    width: 160,
    height: 250,
    borderRadius: 16,
    background: "linear-gradient(160deg, #1e1b4b, #3b0764)",
    border: "1.5px solid rgba(167,139,250,0.5)",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
    transform: reversed ? "rotate(180deg)" : "none",
  };

  const sectionStyle: CSSProperties = { background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.25rem 1.4rem", textAlign: "left", marginBottom: "1rem" };
  const labelStyle: CSSProperties = { color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "0.5rem" };
  const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 };

  return (
    <div className="max-w-xl mx-auto text-center">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ YOUR CARD ✦</p>

      <div style={cardFaceStyle}>
        <span style={{ fontSize: "3.5rem" }}>{card.icon}</span>
        <span style={{ color: "#e9d5ff", fontSize: "0.7rem", marginTop: 8, letterSpacing: "0.1em" }}>{card.no}</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{card.name}</h1>
      <p className="text-purple-300 text-sm mb-6">{position}</p>

      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {m.keywords.map((k) => (
          <span key={k} style={{ background: "rgba(109, 40, 217, 0.3)", border: "1px solid rgba(167, 139, 250, 0.35)", borderRadius: "9999px", padding: "0.35rem 0.9rem", color: "#e9d5ff", fontSize: "0.78rem" }}>
            {k}
          </span>
        ))}
      </div>

      <div style={sectionStyle}>
        <p style={labelStyle}>🔮 カードからのメッセージ</p>
        <p style={bodyStyle}>{m.message}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>✨ 今日のアドバイス</p>
        <p style={bodyStyle}>{m.advice}</p>
      </div>

      {/* deep dive */}
      <Link href={`/tools/tarot/${card.no}`} className="block mt-2 mb-10">
        <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.1rem 1.4rem", textAlign: "left" }} className="hover:bg-purple-700/30 transition-colors">
          <p className="text-white font-bold text-sm mb-1">▶ 「{card.name}」の意味をもっと詳しく</p>
          <p className="text-purple-300 text-xs">カードの象徴・正逆の意味・恋愛・仕事での読み方をチェック</p>
        </div>
      </Link>

      <p className="text-purple-300 text-sm mt-8 mb-3">結果をシェアする</p>
      <div className="flex justify-center gap-3 mb-10">
        <button onClick={() => share("x")} style={{ background: "#000", color: "#fff", border: "1px solid #444", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>𝕏 でシェア</button>
        <button onClick={() => share("line")} style={{ background: "#06C755", color: "#fff", border: "none", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>LINE</button>
      </div>

      {/* LINE lead magnet */}
      <div style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-6">
        <p className="text-white font-bold text-base mb-2">🎁 毎朝、あなたへの1枚をLINEでお届け</p>
        <p className="text-purple-100 text-sm leading-relaxed mb-5">
          LINE友だち追加で、<strong className="text-white">毎日のタロットメッセージ</strong>と占いコンテンツをお届けします。
        </p>
        <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
          <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            LINEで毎日受け取る
          </button>
        </a>
      </div>

      {/* CTA */}
      <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-6">
        <p className="text-white font-bold text-base mb-2">じっくり占ってほしい方へ</p>
        <p className="text-purple-200 text-sm leading-relaxed mb-5">
          あなたの悩みに寄り添う、パーソナル鑑定レポートをご用意しています。
        </p>
        <Link href="/readings">
          <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            ✦ フル鑑定を申し込む ✦
          </button>
        </Link>
      </div>

      <button onClick={onReset} className="text-purple-400 text-sm hover:text-purple-300 underline">
        もう一度引く
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ページ
// ---------------------------------------------------------------------------

export default function TarotPage() {
  const [draw, setDraw] = useState<Draw | null>(null);

  const handleDraw = () => {
    const card = CARDS[Math.floor(Math.random() * CARDS.length)];
    const reversed = Math.random() < 0.5;
    setDraw({ card, reversed });
  };

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>
        {draw ? <ResultView draw={draw} onReset={() => setDraw(null)} /> : <DrawView onDraw={handleDraw} />}
      </div>
    </div>
  );
}
