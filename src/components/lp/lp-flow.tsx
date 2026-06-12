import type { CSSProperties } from "react";
import { Fragment } from "react";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// 鑑定までの流れ（band2中）4ステップ＋点線矢印接続
//   現行の実フローに沿う（テーマ/プラン選択→申込・決済→読み解き→文章レポート）。
// ---------------------------------------------------------------------------

function IconCalendar() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <rect x="5" y="7" width="20" height="18" rx="3" />
      <path d="M5 12 H25 M10 4 V8 M20 4 V8" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <rect x="4" y="8" width="22" height="15" rx="3" />
      <path d="M4 13 H26 M8 19 H14" />
    </svg>
  );
}
function IconReading() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <path d="M15 7 C 11 4 7 5 5 7 V22 C 7 20 11 19 15 22 C 19 19 23 20 25 22 V7 C 23 5 19 4 15 7 Z" />
      <path d="M15 7 V22" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#8B79B8" strokeWidth="1.4" aria-hidden="true">
      <rect x="4" y="7" width="22" height="16" rx="3" />
      <path d="M5 9 L15 17 L25 9" />
    </svg>
  );
}

const STEPS = [
  { no: "01", icon: <IconCalendar />, title: "テーマとプランを選ぶ", body: "気になるテーマと、お試し〜しっかりまでのプランをお選びいただきます。" },
  { no: "02", icon: <IconCard />, title: "フォームから申込・決済", body: "生年月日などをご入力。クレジットカード決済で安全にお手続きいただけます。" },
  { no: "03", icon: <IconReading />, title: "鑑定師が丁寧に読み解き", body: "3つの占術と心理学の視点で、あなたのために一通ずつ読み解きます。" },
  { no: "04", icon: <IconMail />, title: "文章レポートをお届け", body: "鑑定レポートをメールでお届けします（3〜5営業日が目安です）。" },
];

export default function LpFlow() {
  const stepCard: CSSProperties = {
    flex: "1 1 0",
    minWidth: 0,
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.14)",
    borderRadius: 18,
    padding: "26px 18px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 8px 22px rgba(155,139,191,0.10)",
  };

  const iconCircle: CSSProperties = {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(160deg, #F8F5FC, #EDE6F6)",
    border: "1px solid rgba(155,139,191,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const arrow: CSSProperties = {
    flexShrink: 0,
    alignSelf: "center",
    color: "#C0B3DC",
    fontSize: 22,
    letterSpacing: "0.1em",
  };

  return (
    <section style={{ background: "#F6F3FA", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <LpSectionHeader eyebrow="Flow" title="鑑定までの流れ" />

        <div className="lp-flow-row" style={{ display: "flex", alignItems: "stretch", gap: 12, marginTop: 48 }}>
          {STEPS.map((s, i) => (
            <Fragment key={s.no}>
              <div style={stepCard}>
                <div style={iconCircle}>{s.icon}</div>
                <span style={{ fontFamily: "var(--lg-font-display)", fontStyle: "italic", fontWeight: 700, fontSize: 18, color: "#B0A0CF" }}>
                  {s.no}
                </span>
                <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 15, color: "#2D2448", margin: 0, lineHeight: 1.5 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "#5E4D8A", lineHeight: 1.8, margin: 0 }}>{s.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span style={arrow} className="lp-flow-arrow" aria-hidden="true">⋯▸</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
