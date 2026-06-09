"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { snsAccounts } from "@/config/sns";

// ---------------------------------------------------------------------------
// エレメント定義（占星術 × 心理学 の4軸）
//   Axis1: 火 F / 水 W   — 情熱 vs 共感
//   Axis2: 風 A / 地 E   — 思考 vs 現実
//   Axis3: 陽 Y / 陰 N   — 発信 vs 内省
//   Axis4: 太陽 S / 月 M — 社会的自己 vs 本音
// ---------------------------------------------------------------------------

type Pole = "F" | "W" | "A" | "E" | "Y" | "N" | "S" | "M";

const ELEMENTS: Record<Pole, { label: string; emoji: string; word: string }> = {
  F: { label: "火", emoji: "🔥", word: "情熱" },
  W: { label: "水", emoji: "🌊", word: "共感" },
  A: { label: "風", emoji: "🌬️", word: "思考" },
  E: { label: "地", emoji: "🌿", word: "現実" },
  Y: { label: "陽", emoji: "☀️", word: "発信" },
  N: { label: "陰", emoji: "🌑", word: "内省" },
  S: { label: "太陽", emoji: "👑", word: "社会的自己" },
  M: { label: "月", emoji: "🌙", word: "本音" },
};

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
// 16タイプ
// ---------------------------------------------------------------------------

interface TypeResult {
  name: string;
  icon: string;
  catch: string;
  desc: string;
  strengths: string[];
  love: string;
  work: string;
  match: string; // 相性のいいタイプ名
  crystal: string;
}

const TYPES: Record<string, TypeResult> = {
  FAYS: { name: "開拓者", icon: "🔥", catch: "道なき道に、最初の一歩をしるす人", desc: "情熱とひらめきを行動力に変え、人を巻き込みながら前へ進むナチュラルリーダー。停滞より挑戦を選びます。", strengths: ["推進力", "発想力", "人を巻き込む力", "決断の速さ"], love: "情熱的でストレート。一緒に成長できる相手に強く惹かれます。", work: "起業・企画・プロジェクトリーダー・マーケティング", match: "洞察者（WANS）", crystal: "カーネリアン（勇気と行動力を後押し）" },
  FAYM: { name: "革命家", icon: "⚡", catch: "「当たり前」を軽やかに塗り替える人", desc: "自由な発想と熱量で、既存の枠を壊して新しい風を吹き込む人。本音に正直で、退屈を何より嫌います。", strengths: ["独創性", "瞬発力", "切り替えの早さ", "本音で動く強さ"], love: "刺激と自由を尊重し合える関係を求めます。束縛は苦手。", work: "クリエイター・新規事業・発信業・フリーランス", match: "縁の下の守り人（WENS）", crystal: "ターコイズ（自由と自己表現を守る）" },
  FANS: { name: "戦略家", icon: "♟️", catch: "熱い理想を、緻密な一手で形にする人", desc: "内に静かな情熱を秘め、長期ビジョンから逆算して動く参謀型。感情より結果で語ります。", strengths: ["戦略的思考", "ビジョン構築", "冷静な判断", "粘り強さ"], love: "言葉数は少なくても一途。信頼を時間をかけて育てます。", work: "経営戦略・コンサル・研究・エンジニア", match: "癒し手（WEYM）", crystal: "ラピスラズリ（洞察と知性を高める）" },
  FANM: { name: "夢の設計者", icon: "🌌", catch: "胸の奥の理想を、静かに描き続ける人", desc: "豊かな内面と熱い理想を併せ持つ理想主義者。自分の世界観を大切に、独自の道を究めます。", strengths: ["創造性", "探究心", "美意識", "信念の強さ"], love: "深く精神的なつながりを求める一途な愛。理解されると花開きます。", work: "アーティスト・作家・研究者・デザイナー", match: "共感のリーダー（WAYS）", crystal: "アメジスト（直感と創造性を高める）" },
  FEYS: { name: "実現者", icon: "🏆", catch: "決めたことを、必ず形にして見せる人", desc: "情熱を現実の成果に落とし込む実行のプロ。目標に向かって人と組織を着実に動かします。", strengths: ["実行力", "責任感", "リーダーシップ", "目標達成力"], love: "誠実で頼れる存在。約束を守り、関係を堅実に育てます。", work: "管理職・営業・経営・スポーツ", match: "神秘家（WANM）", crystal: "タイガーアイ（目標達成と金運を支える）" },
  FEYM: { name: "情熱の職人", icon: "🛠️", catch: "好きを極め、手で価値を生み出す人", desc: "自分の感覚を信じ、こだわりを形にしていく行動派。理屈より体験、結果より納得を大切にします。", strengths: ["集中力", "実践力", "美的感覚", "自分軸の強さ"], love: "言葉より行動で愛を示すタイプ。自由を尊重し合える相手が◎。", work: "職人・クリエイター・技術職・飲食/ものづくり", match: "洞察者（WANS）", crystal: "ガーネット（情熱と継続力を高める）" },
  FENS: { name: "静かな実力者", icon: "⚔️", catch: "多くを語らず、結果で信頼を勝ち取る人", desc: "内なる炎を秘め、着実に実力を積み上げる縁の下のエース。派手さより確かさで評価されます。", strengths: ["実務能力", "忍耐力", "信頼性", "冷静さ"], love: "不器用でも一途。安心できる安定した関係を築きます。", work: "専門職・技術・財務・オペレーション", match: "夢想家（WAYM）", crystal: "オニキス（意志を強くし、自分を守る）" },
  FENM: { name: "内なる炎", icon: "🕯️", catch: "静けさの奥に、消えない熱を抱く人", desc: "穏やかに見えて、譲れない信念と情熱を秘めた人。自分のペースで深く一つのことを究めます。", strengths: ["探究心", "粘り強さ", "誠実さ", "芯の強さ"], love: "心を開くまで時間がかかるが、開けば深く一途に愛します。", work: "研究・職人・専門職・クリエイター", match: "共感のリーダー（WAYS）", crystal: "ガーネット（内なる情熱を灯し続ける）" },
  WAYS: { name: "共感のリーダー", icon: "🤝", catch: "人の心をつなぎ、場をあたためる人", desc: "高い共感力とアイデアで人を導くムードメーカー型リーダー。みんなの可能性を信じて引き出します。", strengths: ["共感力", "人を動かす力", "発想力", "調整力"], love: "相手に尽くす愛情家。深いつながりと信頼を大切にします。", work: "教育・人事・コミュニティ運営・プロデュース", match: "夢の設計者（FANM）", crystal: "ローズクォーツ（愛と信頼を引き寄せる）" },
  WAYM: { name: "夢想家", icon: "🎈", catch: "自由な感性で、世界に色をそえる人", desc: "豊かな感受性と好奇心で、人と可能性を結ぶ自由な精神の持ち主。型にはまらず、心のままに生きます。", strengths: ["想像力", "共感力", "柔軟性", "人をつなぐ力"], love: "ロマンチストで一途。心が通い合う関係を求めます。", work: "クリエイティブ・企画・カウンセラー・発信業", match: "静かな実力者（FENS）", crystal: "ムーンストーン（感性と直感を育む）" },
  WANS: { name: "洞察者", icon: "🔭", catch: "言葉の奥にある本質を、静かに見抜く人", desc: "深い共感力と分析力を併せ持つ観察者。人や物事の本質を見抜き、的確に支える参謀型です。", strengths: ["洞察力", "分析力", "傾聴力", "誠実さ"], love: "相手をよく理解し、静かに深く愛します。信頼が土台。", work: "カウンセラー・研究・編集・分析職", match: "開拓者（FAYS）", crystal: "ソーダライト（直感と冷静さを両立）" },
  WANM: { name: "神秘家", icon: "🔮", catch: "目に見えないものを、感じ取れる人", desc: "繊細な感受性と豊かな内面世界を持つ稀有な人。直感に従い、深い意味を求めて生きます。", strengths: ["直感力", "深い共感力", "創造性", "精神的な強さ"], love: "魂で結ばれるような深い愛を求める理想主義者。", work: "ヒーラー・作家・アーティスト・心理職", match: "実現者（FEYS）", crystal: "ラブラドライト（直感と神秘性を高める）" },
  WEYS: { name: "育む人", icon: "🌻", catch: "周りの幸せを、自分の喜びにできる人", desc: "温かい思いやりと面倒見のよさで、人とコミュニティを支える人。安心できる居場所を作る名手です。", strengths: ["思いやり", "サポート力", "社交性", "信頼性"], love: "献身的で家庭的。相手を大切に包み込む愛情を注ぎます。", work: "医療・教育・接客・人事/総務", match: "夢の設計者（FANM）", crystal: "アベンチュリン（安心と癒しをもたらす）" },
  WEYM: { name: "癒し手", icon: "🌷", catch: "そっと寄り添い、心をほどく人", desc: "やさしい感性と現実的な気配りで、人の心を癒す人。控えめでも、いると安心する存在です。", strengths: ["共感力", "細やかさ", "柔軟性", "献身性"], love: "穏やかで深い愛情家。安心できる関係でこそ輝きます。", work: "看護/介護・カウンセラー・保育・ホスピタリティ", match: "戦略家（FANS）", crystal: "ローズクォーツ（やさしさと自己愛を育む）" },
  WENS: { name: "縁の下の守り人", icon: "🛡️", catch: "見えないところで、みんなを支える人", desc: "誠実さと責任感で、組織や人を陰から支える守護者。地道な献身が、まわりの信頼を集めます。", strengths: ["信頼性", "責任感", "実務能力", "忍耐力"], love: "尽くすタイプの安定志向。長く穏やかな関係を築きます。", work: "事務/管理・経理・サポート職・公務", match: "革命家（FAYM）", crystal: "スモーキークォーツ（安定と安心感を支える）" },
  WENM: { name: "静寂の調和者", icon: "🕊️", catch: "波風を立てず、やさしく世界をととのえる人", desc: "穏やかで思慮深く、調和を何より大切にする癒しの人。静かな佇まいの奥に、深い愛と芯を秘めています。", strengths: ["調和力", "共感力", "内省力", "やさしさ"], love: "深く静かに愛するタイプ。心が安らぐ相手と長く続きます。", work: "クリエイティブ・ヒーリング・研究・専門職", match: "開拓者（FAYS）", crystal: "セレナイト（心を浄化し、平穏をもたらす）" },
};

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
        <p className="text-white font-bold text-base mb-2">🎁 「{t.name}」の完全版を無料プレゼント</p>
        <p className="text-purple-100 text-sm leading-relaxed mb-5">
          LINE友だち追加で、あなたのタイプの<strong className="text-white">詳しい性格分析・相性ランキング・開運アドバイス</strong>をお届け。
          今後の占いコンテンツも先行配信します。
        </p>
        <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
          <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            LINEで完全版を受け取る
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

  const handleComplete = (answers: Pole[]) => {
    setCode(buildCode(answers));
    setStep("result");
  };

  const reset = () => {
    setCode("");
    setStep("intro");
  };

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
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
