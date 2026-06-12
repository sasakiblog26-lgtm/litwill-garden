import type { CSSProperties } from "react";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// お悩み共感（band1下・元「お客様の声」の構造を流用）
//   2×2の4枚。薄紫地・角丸・左上に小さな丸ラベル（テーマ名）。
//   本文は一人称の悩み文（証言の捏造はしない）。下に紫帯メッセージ。
// ---------------------------------------------------------------------------

const WORRIES = [
  { label: "恋愛", body: "彼の気持ちがわからなくて、このまま前に進んでいいのか迷ってしまう。" },
  { label: "仕事", body: "今の仕事を続けるべきか、それとも転職か——決め手が見つからない。" },
  { label: "人生", body: "毎日がんばっているのに、自分は何に向かっているんだろうと立ち止まる。" },
  { label: "漠然と", body: "理由はうまく言えないけれど、なんだか心がモヤモヤして晴れない。" },
];

export default function LpWorries() {
  const card: CSSProperties = {
    position: "relative",
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.14)",
    borderRadius: 20,
    padding: "32px 26px 26px",
    boxShadow: "0 8px 24px rgba(155,139,191,0.10)",
  };

  const label: CSSProperties = {
    position: "absolute",
    top: -14,
    left: 24,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
    height: 28,
    padding: "0 14px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #B9A7DC, #8B79B8)",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.04em",
    boxShadow: "0 4px 12px rgba(139,121,184,0.35)",
  };

  const band: CSSProperties = {
    marginTop: 44,
    background: "linear-gradient(135deg, #8B79B8 0%, #6E5C9C 100%)",
    borderRadius: 20,
    padding: "28px 32px",
    textAlign: "center",
    color: "#FFFFFF",
    boxShadow: "0 12px 32px rgba(110,92,156,0.30)",
  };

  return (
    <section style={{ background: "#F6F3FA", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <LpSectionHeader
          eyebrow="Worries"
          title="こんなお悩みありませんか？"
          sub="ひとつでも当てはまったら、それは立ち止まって心を見つめるサインかもしれません。"
        />

        <div
          className="lp-grid-2"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, marginTop: 56 }}
        >
          {WORRIES.map((w) => (
            <div key={w.label} style={card}>
              <span style={label}>{w.label}</span>
              <p
                style={{
                  fontFamily: "var(--lg-font-heading)",
                  fontSize: 16,
                  color: "#2D2448",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                「{w.body}」
              </p>
            </div>
          ))}
        </div>

        <div style={band}>
          <p style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: "clamp(16px, 3.4vw, 20px)", lineHeight: 1.7, margin: 0 }}>
            その悩み、星と心理学の両面から一緒にひも解いていきます。
          </p>
        </div>
      </div>
    </section>
  );
}
