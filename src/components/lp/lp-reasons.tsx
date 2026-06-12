import type { CSSProperties, ReactNode } from "react";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// 選ばれる理由（band2上）
//   4列・円形線画アイコン＋各3行の事実ベース説明。
// ---------------------------------------------------------------------------

function IconHeart() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <path d="M17 27 C 8 20 5 15 5 11.5 A 5.5 5.5 0 0 1 17 9 A 5.5 5.5 0 0 1 29 11.5 C 29 15 26 20 17 27 Z" />
    </svg>
  );
}
function IconStars() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#8B79B8" strokeWidth="1.3" aria-hidden="true">
      <path d="M17 6 l1.7 5.6 5.6 1.7 -5.6 1.7 -1.7 5.6 -1.7 -5.6 -5.6 -1.7 5.6 -1.7 z" />
      <circle cx="26" cy="24" r="2.4" />
      <circle cx="8" cy="22" r="1.8" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <path d="M17 5 L27 9 V16 C27 23 22 27 17 29 C12 27 7 23 7 16 V9 Z" />
      <path d="M13 16.5 l2.6 2.6 5-5.4" />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <circle cx="17" cy="17" r="11" />
      <path d="M20 9 A 9 9 0 1 0 20 25 A 7 7 0 1 1 20 9 Z" fill="#EDE6F6" stroke="none" />
      <text x="17" y="20" textAnchor="middle" fontSize="8" fill="#8B79B8" stroke="none">24</text>
    </svg>
  );
}

interface Reason {
  icon: ReactNode;
  title: string;
  body: string;
}

const REASONS: Reason[] = [
  {
    icon: <IconHeart />,
    title: "寄り添う鑑定スタイル",
    body: "当たる・外れるで終わらせず、いま心とどう向き合うかまで、やさしく言葉にしてお届けします。",
  },
  {
    icon: <IconStars />,
    title: "三占術×心理学の独自メソッド",
    body: "西洋占星術・インド占星術・四柱推命を組み合わせ、心理学の視点を添えて多角的に読み解きます。",
  },
  {
    icon: <IconShield />,
    title: "安心のプライバシー保護",
    body: "ご入力いただいた情報は鑑定目的にのみ使用し、第三者への提供は一切行いません。",
  },
  {
    icon: <IconMoon />,
    title: "24時間いつでも申込OK",
    body: "お申し込みから結果のお届けまでオンラインで完結。スマホひとつで全国どこからでもご利用いただけます。",
  },
];

export default function LpReasons() {
  const card: CSSProperties = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    padding: "8px 12px",
  };

  const iconCircle: CSSProperties = {
    width: 78,
    height: 78,
    borderRadius: "50%",
    background: "linear-gradient(160deg, #F8F5FC, #EDE6F6)",
    border: "1px solid rgba(155,139,191,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 18px rgba(155,139,191,0.14)",
  };

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <LpSectionHeader eyebrow="Reason" title="Litwill Garden が選ばれる理由" />

        <div
          className="lp-grid-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginTop: 48 }}
        >
          {REASONS.map((r) => (
            <div key={r.title} style={card}>
              <div style={iconCircle}>{r.icon}</div>
              <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 16, color: "#2D2448", margin: 0, lineHeight: 1.5 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 13, color: "#5E4D8A", lineHeight: 1.85, margin: 0 }}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
