"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { snsAccounts } from "@/config/sns";
import { ELEMENTS, TYPES, type Pole } from "./data";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "回答を集計しています",
  "4つのエレメントを照合しています",
  "あなたのタイプを導いています",
];

// ---------------------------------------------------------------------------
// 設問（4軸 × 3問 = 12問）
// ---------------------------------------------------------------------------

interface Question {
  axis: 0 | 1 | 2 | 3;
  text: string;
  a: { label: string; pole: Pole };
  b: { label: string; pole: Pole };
}

const QUESTIONS: Question[] = [
  // Axis 0 — 火 / 水
  { axis: 0, text: "新しいことを始めるとき、あなたは？", a: { label: "ワクワクして、まず動きたくなる", pole: "F" }, b: { label: "周りの気持ちや空気をまず確かめる", pole: "W" } },
  { axis: 0, text: "落ち込んでいる友人に、あなたは？", a: { label: "「こうすれば大丈夫」と背中を押す", pole: "F" }, b: { label: "ただ隣で気持ちを聴いて寄り添う", pole: "W" } },
  { axis: 0, text: "あなたを突き動かすのは？", a: { label: "「やってみたい！」という情熱", pole: "F" }, b: { label: "「分かってあげたい」という共感", pole: "W" } },
  // Axis 1 — 風 / 地
  { axis: 1, text: "物事を考えるとき、頭に浮かぶのは？", a: { label: "アイデアや「もしも」の可能性", pole: "A" }, b: { label: "「現実的にできるか」という視点", pole: "E" } },
  { axis: 1, text: "心が惹かれるのは？", a: { label: "新しい概念や抽象的な話", pole: "A" }, b: { label: "手で触れられる具体的な成果", pole: "E" } },
  { axis: 1, text: "計画を立てるなら？", a: { label: "方向性だけ決めて、柔軟に進める", pole: "A" }, b: { label: "手順を固めて、着実に積み上げる", pole: "E" } },
  // Axis 2 — 陽 / 陰
  { axis: 2, text: "エネルギーが満ちるのは？", a: { label: "人と話したり、外に出かけたとき", pole: "Y" }, b: { label: "一人で静かに過ごしているとき", pole: "N" } },
  { axis: 2, text: "考えごとをするとき、あなたは？", a: { label: "口に出しながら整理していく", pole: "Y" }, b: { label: "頭の中でじっくり練ってから話す", pole: "N" } },
  { axis: 2, text: "理想の休日は？", a: { label: "予定を入れてアクティブに動く", pole: "Y" }, b: { label: "家でゆっくり心を充電する", pole: "N" } },
  // Axis 3 — 太陽 / 月
  { axis: 3, text: "あなたが大切にしているのは？", a: { label: "周囲の期待に応え、役割を果たすこと", pole: "S" }, b: { label: "自分の本音や、内なる感覚", pole: "M" } },
  { axis: 3, text: "迷ったときの決断基準は？", a: { label: "「世の中的に正しいか」", pole: "S" }, b: { label: "「自分が心から納得できるか」", pole: "M" } },
  { axis: 3, text: "ふだん人に見せているのは？", a: { label: "しっかり者の、社会的な顔", pole: "S" }, b: { label: "できるだけ素のままの自分", pole: "M" } },
];

// ---------------------------------------------------------------------------
// スコアリング
// ---------------------------------------------------------------------------

function buildCode(answers: Pole[]): string {
  const count = (a: Pole, b: Pole) => {
    const na = answers.filter((p) => p === a).length;
    const nb = answers.filter((p) => p === b).length;
    return na >= nb ? a : b;
  };
  return [count("F", "W"), count("A", "E"), count("Y", "N"), count("S", "M")].join("");
}

// ---------------------------------------------------------------------------
// スタイル
// ---------------------------------------------------------------------------

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

// ---------------------------------------------------------------------------
// イントロ
// ---------------------------------------------------------------------------

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ 16 ELEMENT TYPES ✦</p>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
        16タイプ占い性格診断
      </h1>
      <p className="text-purple-200 text-sm leading-relaxed mb-8">
        西洋占星術の4つのエレメント（火・水・風・地）と心理学を融合した、
        オリジナルの性格診断。12の質問に答えるだけで、あなたの本質を映す
        <strong className="text-white">16タイプ</strong>のいずれかが分かります。
      </p>
      <div
        style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }}
        className="mb-8"
      >
        <p className="text-purple-100 text-sm leading-relaxed mb-4">
          ☀️ 所要時間 約2分 ／ 全12問<br />
          🔒 生年月日や個人情報の入力は不要です
        </p>
        <button
          onClick={onStart}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #6366f1)",
            padding: "0.95rem 3rem",
            borderRadius: "9999px",
            color: "white",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ✦ 診断をはじめる ✦
        </button>
      </div>
      <p className="text-purple-400/70 text-xs leading-relaxed">
        ※ この診断はエンターテインメントです。結果は自己理解のヒントとしてお楽しみください。
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 設問
// ---------------------------------------------------------------------------

function Quiz({ onComplete }: { onComplete: (answers: Pole[]) => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Pole[]>([]);
  const q = QUESTIONS[index];
  const progress = Math.round((index / QUESTIONS.length) * 100);

  const choose = (pole: Pole) => {
    const next = [...answers, pole];
    if (index + 1 < QUESTIONS.length) {
      setAnswers(next);
      setIndex(index + 1);
    } else {
      onComplete(next);
    }
  };

  const optionStyle: CSSProperties = {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "rgba(124, 58, 237, 0.15)",
    border: "1px solid rgba(167, 139, 250, 0.3)",
    borderRadius: "1rem",
    padding: "1.1rem 1.4rem",
    color: "#ede9fe",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "all 0.15s",
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* progress */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-purple-300 text-xs">質問 {index + 1} / {QUESTIONS.length}</span>
        <span className="text-purple-300 text-xs">{ELEMENTS[q.a.pole].emoji} vs {ELEMENTS[q.b.pole].emoji}</span>
      </div>
      <div style={{ height: 6, background: "rgba(167,139,250,0.15)", borderRadius: 9999 }} className="mb-8">
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius: 9999, transition: "width 0.3s" }} />
      </div>

      <h2 className="text-white font-bold text-xl md:text-2xl mb-8 leading-relaxed text-center">
        {q.text}
      </h2>

      <button
        style={optionStyle}
        className="hover:border-purple-400 hover:bg-purple-700/30"
        onClick={() => choose(q.a.pole)}
      >
        {q.a.label}
      </button>
      <button
        style={optionStyle}
        className="hover:border-purple-400 hover:bg-purple-700/30"
        onClick={() => choose(q.b.pole)}
      >
        {q.b.label}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 結果
// ---------------------------------------------------------------------------

function ResultView({ code, onReset }: { code: string; onReset: () => void }) {
  const t = TYPES[code];
  const poles = code.split("") as Pole[];

  const share = (platform: "x" | "line") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `私の16タイプ占い性格診断は「${t.name}」${t.icon}でした！\n${t.catch}\n\nあなたのタイプは？`;
    const link =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        : `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `私の16タイプ占い性格診断は「${t.name}」${t.icon}でした！ ${typeof window !== "undefined" ? window.location.href : ""}`
      );
      alert("結果をコピーしました ✦");
    } catch {
      /* noop */
    }
  };

  const sectionStyle: CSSProperties = {
    background: CARD_BG,
    border: CARD_BORDER,
    borderRadius: "1rem",
    padding: "1.25rem 1.4rem",
    textAlign: "left",
    marginBottom: "1rem",
  };
  const labelStyle: CSSProperties = { color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "0.5rem" };
  const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 };

  return (
    <div className="max-w-xl mx-auto text-center">
      <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-3">✦ YOUR TYPE ✦</p>
      <div className="text-6xl mb-3">{t.icon}</div>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{t.name}</h1>
      <p className="text-purple-200 text-sm italic mb-6">{t.catch}</p>

      {/* element badges */}
      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {poles.map((p) => (
          <span
            key={p}
            style={{
              background: "rgba(109, 40, 217, 0.3)",
              border: "1px solid rgba(167, 139, 250, 0.35)",
              borderRadius: "9999px",
              padding: "0.35rem 0.9rem",
              color: "#e9d5ff",
              fontSize: "0.78rem",
            }}
          >
            {ELEMENTS[p].emoji} {ELEMENTS[p].label}・{ELEMENTS[p].word}
          </span>
        ))}
      </div>

      <div style={sectionStyle}>
        <p style={labelStyle}>🌿 あなたの性格</p>
        <p style={bodyStyle}>{t.desc}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>✨ 強み</p>
        <p style={bodyStyle}>{t.strengths.join(" ／ ")}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>💜 恋愛傾向</p>
        <p style={bodyStyle}>{t.love}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🌱 向いている仕事</p>
        <p style={bodyStyle}>{t.work}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🤝 相性のいいタイプ</p>
        <p style={bodyStyle}>{t.match}</p>
      </div>
      <div style={sectionStyle}>
        <p style={labelStyle}>🔮 ラッキークリスタル</p>
        <p style={bodyStyle}>{t.crystal}</p>
      </div>

      {/* deep dive */}
      <Link href={`/tools/16types/${code}`} className="block mb-10">
        <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.1rem 1.4rem" }} className="hover:bg-purple-700/30 transition-colors">
          <p className="text-white font-bold text-sm mb-1">▶ 「{t.name}」をもっと詳しく読む</p>
          <p className="text-purple-300 text-xs">詳しい性格・弱み・恋愛・適職・相性・開運アドバイスをチェック</p>
        </div>
      </Link>

      {/* share */}
      <p className="text-purple-300 text-sm mt-8 mb-3">結果をシェアする</p>
      <div className="flex justify-center gap-3 mb-10">
        <button onClick={() => share("x")} style={{ background: "#000", color: "#fff", border: "1px solid #444", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>𝕏 でシェア</button>
        <button onClick={() => share("line")} style={{ background: "#06C755", color: "#fff", border: "none", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>LINE</button>
        <button onClick={copy} style={{ background: "transparent", color: "#c084fc", border: "1px solid rgba(167,139,250,0.4)", borderRadius: "9999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem", cursor: "pointer" }}>コピー</button>
      </div>

      {/* LINE lead magnet */}
      <div
        style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem" }}
        className="mb-6"
      >
        <p className="text-white font-bold text-base mb-2">🎁 あなた専用の運勢をLINEでお届け</p>
        <p className="text-purple-100 text-sm leading-relaxed mb-5">
          LINE友だち追加で、<strong className="text-white">「{t.name}」の毎月の運勢・恋愛運・相性のいい人</strong>をお届け。
          新しい診断や占いコンテンツも先行配信します。
        </p>
        <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
          <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            LINEで運勢を受け取る
          </button>
        </a>
      </div>

      {/* CTA */}
      <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem" }} className="mb-6">
        <p className="text-white font-bold text-base mb-2">もっと深く、あなたを知りたい方へ</p>
        <p className="text-purple-200 text-sm leading-relaxed mb-5">
          生年月日から読み解くパーソナル鑑定で、あなただけの運命の地図をお届けします。
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

export default function SixteenTypesPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [code, setCode] = useState("");
  const ritual = useReadingRitual();

  const handleComplete = (answers: Pole[]) => {
    ritual.run(() => {
      setCode(buildCode(answers));
      setStep("result");
    }, RITUAL_MESSAGES);
  };

  const reset = () => {
    setCode("");
    setStep("intro");
  };

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <RitualOverlay state={ritual} />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>
        {step === "intro" && <Intro onStart={() => setStep("quiz")} />}
        {step === "quiz" && <Quiz onComplete={handleComplete} />}
        {step === "result" && <ResultView code={code} onReset={reset} />}
      </div>
    </div>
  );
}
