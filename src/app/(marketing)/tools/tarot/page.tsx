"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { snsAccounts } from "@/config/sns";

// ---------------------------------------------------------------------------
// 大アルカナ22枚（正位置 / 逆位置）
// ---------------------------------------------------------------------------

interface Meaning {
  keywords: string[];
  message: string;
  advice: string;
}

interface Card {
  no: number;
  name: string;
  icon: string;
  upright: Meaning;
  reversed: Meaning;
}

const CARDS: Card[] = [
  { no: 0, name: "愚者", icon: "🃏",
    upright: { keywords: ["自由", "始まり", "可能性"], message: "新しい一歩を踏み出すのに最高のタイミング。常識にとらわれず、心の声に従ってみて。", advice: "怖がらず、まず動いてみましょう。" },
    reversed: { keywords: ["無計画", "迷い", "軽率"], message: "勢いだけで進むと足元をすくわれそう。一度立ち止まって計画を見直す時。", advice: "決断の前に、現実的な準備を。" } },
  { no: 1, name: "魔術師", icon: "🎩",
    upright: { keywords: ["創造", "意志", "実現力"], message: "あなたには願いを形にする力が揃っています。アイデアを行動に移す好機。", advice: "「できる」と信じて一歩を。" },
    reversed: { keywords: ["準備不足", "迷走", "口だけ"], message: "やる気はあるのに空回り気味。基礎やスキルを整え直す時期です。", advice: "焦らず実力を磨き直して。" } },
  { no: 2, name: "女教皇", icon: "🌙",
    upright: { keywords: ["直感", "知性", "冷静"], message: "今は静かに内側の声を聴くとき。直感が正しい答えを知っています。", advice: "焦らず、心を澄ませて。" },
    reversed: { keywords: ["感情的", "見落とし", "不安"], message: "感情に流されて本質を見失いがち。一度冷静になりましょう。", advice: "事実と気持ちを切り分けて。" } },
  { no: 3, name: "女帝", icon: "👑",
    upright: { keywords: ["豊かさ", "愛情", "実り"], message: "愛や豊かさに恵まれる時。あなたの優しさが周囲を満たします。", advice: "自分にも惜しみなく愛を。" },
    reversed: { keywords: ["停滞", "依存", "浪費"], message: "与えすぎ・甘えすぎでバランスが崩れ気味。自立を意識して。", advice: "自分の機嫌は自分で取って。" } },
  { no: 4, name: "皇帝", icon: "🏛️",
    upright: { keywords: ["安定", "責任", "リーダー"], message: "意志を貫き、主導権を握れる時。築いてきたものが力になります。", advice: "信念を持って前へ。" },
    reversed: { keywords: ["頑固", "支配的", "弱気"], message: "力みすぎ、または自信喪失のサイン。柔軟さを取り戻して。", advice: "肩の力を抜いてみて。" } },
  { no: 5, name: "教皇", icon: "⛪",
    upright: { keywords: ["信頼", "導き", "誠実"], message: "良き助言者や仲間に恵まれる時。伝統や基本に立ち返ると吉。", advice: "信頼できる人に相談を。" },
    reversed: { keywords: ["独断", "形式的", "不信"], message: "ルールや建前に縛られて窮屈に。自分の価値観を見直して。", advice: "形より本質を大切に。" } },
  { no: 6, name: "恋人", icon: "💕",
    upright: { keywords: ["愛", "選択", "調和"], message: "心ときめく出会いや、良い選択のとき。直感を信じて。", advice: "心が喜ぶ方を選んで。" },
    reversed: { keywords: ["迷い", "すれ違い", "誘惑"], message: "気持ちの行き違いや優柔不断に注意。本心と向き合う時。", advice: "正直なコミュニケーションを。" } },
  { no: 7, name: "戦車", icon: "🏇",
    upright: { keywords: ["前進", "勝利", "行動力"], message: "勢いに乗って突き進めば道は開けます。目標に一直線。", advice: "迷わず突き進んで。" },
    reversed: { keywords: ["空回り", "暴走", "停滞"], message: "焦りや感情の暴走でブレーキが必要かも。方向を確認して。", advice: "一度ペースを落として。" } },
  { no: 8, name: "力", icon: "🦁",
    upright: { keywords: ["勇気", "忍耐", "やさしさ"], message: "強さとは、しなやかな心のこと。穏やかな勇気で困難を越えられます。", advice: "あわてず、ねばり強く。" },
    reversed: { keywords: ["弱気", "自信喪失", "感情的"], message: "自信を失い気味。小さな成功を積んで自分を取り戻して。", advice: "できることから一つずつ。" } },
  { no: 9, name: "隠者", icon: "🏮",
    upright: { keywords: ["内省", "探求", "賢明"], message: "一人の時間が答えをくれる時。じっくり自分と向き合って。", advice: "静けさの中に答えがあります。" },
    reversed: { keywords: ["孤立", "頑固", "閉鎖的"], message: "閉じこもりすぎているサイン。少し外に目を向けてみて。", advice: "信頼できる人に心を開いて。" } },
  { no: 10, name: "運命の輪", icon: "🎡",
    upright: { keywords: ["転機", "幸運", "流れ"], message: "幸運の流れが巡ってくる時。チャンスを掴む準備を。", advice: "波が来たら、迷わず乗って。" },
    reversed: { keywords: ["停滞", "悪循環", "タイミング"], message: "今は流れの変わり目で足踏み中。時を待つのも戦略です。", advice: "焦らず流れの変化を待って。" } },
  { no: 11, name: "正義", icon: "⚖️",
    upright: { keywords: ["公正", "バランス", "決断"], message: "フェアな判断が良い結果を生む時。誠実さが報われます。", advice: "冷静に、公平に選んで。" },
    reversed: { keywords: ["不公平", "偏り", "優柔不断"], message: "判断にバイアスがかかりがち。客観的な視点を取り戻して。", advice: "感情を脇に置いて見直して。" } },
  { no: 12, name: "吊られた男", icon: "🙃",
    upright: { keywords: ["忍耐", "視点転換", "受容"], message: "今は動かず待つ時。視点を変えれば新しい意味が見えてきます。", advice: "あえて立ち止まる勇気を。" },
    reversed: { keywords: ["徒労", "停滞", "犠牲"], message: "報われない努力に疲れているかも。手放す選択も大切。", advice: "頑張る方向を見直して。" } },
  { no: 13, name: "死神", icon: "🦋",
    upright: { keywords: ["終わりと再生", "変化", "手放し"], message: "ひとつの区切りが、新しい始まりへ。変化を恐れないで。", advice: "終わりを受け入れて前へ。" },
    reversed: { keywords: ["執着", "停滞", "未練"], message: "手放せずに足踏み中。過去への執着が次を妨げています。", advice: "思い切って区切りをつけて。" } },
  { no: 14, name: "節制", icon: "🍵",
    upright: { keywords: ["調和", "中庸", "癒し"], message: "心穏やかにバランスが取れる時。無理のない自然体が吉。", advice: "ほどよく、しなやかに。" },
    reversed: { keywords: ["過剰", "不均衡", "浪費"], message: "どこかで無理やアンバランスが生じています。整え直して。", advice: "やりすぎに気をつけて。" } },
  { no: 15, name: "悪魔", icon: "😈",
    upright: { keywords: ["執着", "誘惑", "依存"], message: "断ち切れない習慣や関係に縛られていませんか。気づきが第一歩。", advice: "本当に大切なものを見極めて。" },
    reversed: { keywords: ["解放", "決別", "回復"], message: "縛りから抜け出せる時。悪い流れを断ち切るチャンスです。", advice: "勇気を出して手放して。" } },
  { no: 16, name: "塔", icon: "🗼",
    upright: { keywords: ["衝撃", "崩壊と再構築", "気づき"], message: "予想外の出来事が、古い枠を壊すかも。実は再出発のサイン。", advice: "変化を恐れず受け止めて。" },
    reversed: { keywords: ["回避", "余波", "立て直し"], message: "危機を最小限に抑えられる時。ダメージから立ち直る力があります。", advice: "落ち着いて立て直しを。" } },
  { no: 17, name: "星", icon: "⭐",
    upright: { keywords: ["希望", "癒し", "願い"], message: "未来は明るい——そう信じていい時。願いが叶う兆しです。", advice: "希望を胸に進んで。" },
    reversed: { keywords: ["不安", "理想と現実", "失望"], message: "理想と現実のギャップに少し疲れ気味。等身大の自分を大切に。", advice: "完璧でなくて大丈夫。" } },
  { no: 18, name: "月", icon: "🌙",
    upright: { keywords: ["不安", "直感", "曖昧さ"], message: "見えないことへの不安が募る時。直感を信じつつ慎重に。", advice: "焦って結論を出さないで。" },
    reversed: { keywords: ["霧が晴れる", "真実", "回復"], message: "迷いが晴れ、真実が見えてくる時。不安が和らいでいきます。", advice: "見えてきた光に従って。" } },
  { no: 19, name: "太陽", icon: "☀️",
    upright: { keywords: ["成功", "喜び", "活力"], message: "明るいエネルギーに満ちた最高潮の時。素直に喜びを味わって。", advice: "笑顔で堂々と進んで。" },
    reversed: { keywords: ["停滞", "空元気", "遅れ"], message: "本来の輝きが少し曇り気味。無理せず充電する時間も大切。", advice: "焦らず、自分を労って。" } },
  { no: 20, name: "審判", icon: "📯",
    upright: { keywords: ["復活", "決断", "再評価"], message: "過去が報われ、再スタートを切れる時。大きな決断の好機。", advice: "心の呼び声に応えて。" },
    reversed: { keywords: ["後悔", "停滞", "やり直し"], message: "過去への後悔や踏ん切りのつかなさが残っています。許しが鍵。", advice: "過去を手放して前へ。" } },
  { no: 21, name: "世界", icon: "🌍",
    upright: { keywords: ["完成", "達成", "統合"], message: "ひとつの物語が美しく完結する時。努力が実を結びます。", advice: "達成を祝い、次のステージへ。" },
    reversed: { keywords: ["未完", "あと一歩", "区切り"], message: "ゴール目前で停滞気味。やり残しに向き合えば完成します。", advice: "最後の一歩をていねいに。" } },
];

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
