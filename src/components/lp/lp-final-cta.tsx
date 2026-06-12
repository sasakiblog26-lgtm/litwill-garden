import type { CSSProperties } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// 最終CTA帯（band3下）
//   夜空調の全幅帯（紺グラデ＋星・水晶の隅装飾はCSS/SVG）。
//   中央白文字（明朝）＋金系グラデpill。右に円形バッジ。
// ---------------------------------------------------------------------------

function StarField() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    >
      <g fill="#E8DEF7">
        {[
          [80, 60, 1.4], [200, 120, 1], [320, 50, 1.2], [460, 90, 1.6], [560, 40, 1],
          [700, 110, 1.2], [840, 60, 1], [960, 130, 1.4], [1080, 70, 1.1], [1140, 160, 1],
          [120, 280, 1], [380, 300, 1.3], [620, 270, 1], [900, 300, 1.2], [1060, 250, 1],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.8} />
        ))}
      </g>
      <g fill="#D4C090">
        <path d="M260 200 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2 z" />
        <path d="M980 90 l1.8 6 6 1.8 -6 1.8 -1.8 6 -1.8 -6 -6 -1.8 6 -1.8 z" />
      </g>
    </svg>
  );
}

/** 隅の水晶（簡易ファセット） */
function Crystal({ style }: { style: CSSProperties }) {
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" style={style} aria-hidden="true">
      <g stroke="rgba(200,184,224,0.5)" strokeWidth="1">
        <path d="M40 150 L34 70 L52 40 L70 70 L62 150 Z" fill="rgba(155,139,191,0.18)" />
        <path d="M52 40 L52 150 M34 70 L70 70" />
        <path d="M70 70 L84 95 L78 150 L62 150" fill="rgba(155,139,191,0.12)" />
      </g>
    </svg>
  );
}

export default function LpFinalCta() {
  const section: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #1E1B3A 0%, #2A2150 50%, #1a1033 100%)",
    padding: "84px 24px",
  };

  const inner: CSSProperties = {
    position: "relative",
    maxWidth: 1000,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  };

  const pill: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg, #E8D8B0, #D4C090)",
    color: "#3A3015",
    fontWeight: 700,
    fontSize: 16,
    padding: "16px 38px",
    borderRadius: 999,
    boxShadow: "0 12px 30px rgba(212,192,144,0.35)",
  };

  const circleBadge: CSSProperties = {
    flexShrink: 0,
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "2px solid rgba(212,192,144,0.75)",
    background: "radial-gradient(circle at 35% 30%, rgba(212,192,144,0.18), rgba(30,27,58,0.2))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#F3ECFb",
  };

  return (
    <section style={section}>
      <StarField />
      <Crystal style={{ position: "absolute", left: -10, bottom: 0 }} />
      <Crystal style={{ position: "absolute", right: -10, bottom: 0, transform: "scaleX(-1)" }} />

      <div style={inner} className="lp-cta-inner">
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--lg-font-heading)",
              fontWeight: 700,
              fontSize: "clamp(24px, 5vw, 36px)",
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              lineHeight: 1.4,
              margin: "0 0 16px",
            }}
          >
            あなたの未来は、もっと輝ける。
          </h2>
          <p style={{ fontSize: 15, color: "#C9BBE8", lineHeight: 1.9, margin: "0 0 32px" }}>
            一人で悩まず、まずは3分の無料診断から始めてみませんか？
          </p>
          <Link href="/diagnosis" style={pill}>
            無料診断をうけてみる →
          </Link>
        </div>

        <div style={circleBadge} className="lp-cta-badge">
          <span style={{ fontSize: 11, color: "#D4C090", letterSpacing: "0.06em" }}>無料診断</span>
          <span style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 17, lineHeight: 1.3, marginTop: 2 }}>登録不要</span>
          <span style={{ fontSize: 12, color: "#C9BBE8", marginTop: 2 }}>3分</span>
        </div>
      </div>
    </section>
  );
}
