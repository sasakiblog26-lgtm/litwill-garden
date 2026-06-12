import type { CSSProperties } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// ヒーロー（band0）
//   左: 明朝大見出し2行（1行目黒系・2行目に紫グラデ文字）＋サブ＋白バッジ3つ＋CTA
//   右: 夜空×月×星座の幻想ビジュアル（SVG）＋円形バッジ（金縁・紺地）
//   白→薄紫の斜めグラデ背景・右上に紺の星座circle装飾
// ---------------------------------------------------------------------------

const BADGES = [
  { icon: "✶", label: "三占術×心理学の独自メソッド" },
  { icon: "♡", label: "恋愛・仕事・人生の悩みに対応" },
  { icon: "☾", label: "24時間オンライン申込OK" },
];

function HeroVisual() {
  // 夜空の円盤＋三日月＋星座線の幻想ビジュアル（人物写真の代替）
  return (
    <svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="夜空と月と星座の幻想ビジュアル"
      style={{ maxWidth: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <radialGradient id="lp-hero-sky" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#3A2F66" />
          <stop offset="55%" stopColor="#241B47" />
          <stop offset="100%" stopColor="#160F30" />
        </radialGradient>
        <linearGradient id="lp-hero-moon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3ECFb" />
          <stop offset="100%" stopColor="#C9BBE8" />
        </linearGradient>
        <radialGradient id="lp-hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212,192,144,0.45)" />
          <stop offset="100%" stopColor="rgba(212,192,144,0)" />
        </radialGradient>
      </defs>

      {/* 夜空の円盤 */}
      <circle cx="160" cy="160" r="150" fill="url(#lp-hero-sky)" />
      <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(212,192,144,0.35)" strokeWidth="1.5" />
      <circle cx="160" cy="160" r="138" fill="none" stroke="rgba(200,184,224,0.25)" strokeWidth="0.8" strokeDasharray="2 6" />

      {/* 黄道帯リング */}
      <g stroke="rgba(200,184,224,0.4)" strokeWidth="0.6" fill="none">
        <circle cx="160" cy="160" r="104" strokeDasharray="3 5" />
        <circle cx="160" cy="160" r="78" />
      </g>

      {/* 星座線（おおぐま座風の線画） */}
      <g stroke="rgba(243,236,251,0.6)" strokeWidth="0.8" fill="none">
        <path d="M96 96 L120 110 L140 100 L168 118 L150 140 L132 130 L120 110" />
      </g>
      <g fill="#F3ECFb">
        {[
          [96, 96], [120, 110], [140, 100], [168, 118], [150, 140], [132, 130],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 2.4 : 1.6} />
        ))}
      </g>

      {/* 散らばる星 */}
      <g fill="#E8DEF7">
        {[
          [70, 200, 1.4], [110, 230, 1], [210, 90, 1.2], [232, 150, 1.6],
          [200, 210, 1], [250, 200, 1.3], [90, 150, 1], [180, 60, 1.1],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.85} />
        ))}
      </g>
      {/* 金色のきらめき（✦） */}
      <g fill="#D4C090">
        <path d="M214 168 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2 z" />
        <path d="M104 188 l1.4 5 5 1.4 -5 1.4 -1.4 5 -1.4 -5 -5 -1.4 5 -1.4 z" />
      </g>

      {/* 三日月（中央やや下） */}
      <g transform="translate(160, 188)">
        <circle cx="0" cy="0" r="46" fill="url(#lp-hero-glow)" />
        <path
          d="M 8 -34 A 34 34 0 1 0 8 34 A 26 26 0 1 1 8 -34 Z"
          fill="url(#lp-hero-moon)"
        />
      </g>
    </svg>
  );
}

export default function LpHero() {
  const section: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #FFFFFF 0%, #F8F5FC 45%, #EDE6F6 100%)",
    padding: "96px 24px 72px",
  };

  const inner: CSSProperties = {
    position: "relative",
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 48,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "clamp(30px, 5.6vw, 46px)",
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    margin: "0 0 20px",
    color: "#2D2448",
  };

  const gradientText: CSSProperties = {
    background: "linear-gradient(100deg, #B9A7DC 0%, #8B79B8 60%, #7B6AA8 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "#8B79B8",
  };

  const sub: CSSProperties = {
    fontSize: 16,
    color: "#5E4D8A",
    lineHeight: 1.95,
    margin: "0 0 28px",
    maxWidth: 460,
  };

  const badgeRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 32,
  };

  const badge: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.18)",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 12.5,
    color: "#5E4D8A",
    boxShadow: "0 4px 16px rgba(155,139,191,0.10)",
  };

  const cta: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg, #B9A7DC 0%, #8B79B8 100%)",
    color: "#FFFFFF",
    fontFamily: "var(--lg-font-body)",
    fontWeight: 600,
    fontSize: 16,
    padding: "16px 34px",
    borderRadius: 999,
    boxShadow: "0 10px 28px rgba(139,121,184,0.38)",
  };

  const visualWrap: CSSProperties = {
    position: "relative",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const circleBadge: CSSProperties = {
    position: "absolute",
    right: -8,
    bottom: 8,
    width: 116,
    height: 116,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 30%, #3A2F66, #1E1B3A)",
    border: "2px solid rgba(212,192,144,0.75)",
    boxShadow: "0 8px 24px rgba(30,27,58,0.35)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#F3ECFb",
    padding: 10,
  };

  return (
    <section style={section} className="lp-hero">
      {/* 右上の紺の星座circle装飾 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          border: "1px solid rgba(120,106,168,0.22)",
          background:
            "radial-gradient(circle at 60% 40%, rgba(155,139,191,0.10), transparent 70%)",
        }}
      />

      <div style={inner} className="lp-hero-inner">
        {/* 左: テキスト */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <h1 style={titleStyle} className="lp-hero-title">
            迷いが晴れて、
            <br />
            <span style={gradientText}>明日の私が輝き出す</span>
          </h1>

          <p style={sub}>
            あなたの心に寄り添う、西洋占星術×心理学の本格鑑定。
          </p>

          <div style={badgeRow}>
            {BADGES.map((b) => (
              <span key={b.label} style={badge}>
                <span style={{ color: "#B0A0CF" }} aria-hidden="true">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <Link href="/readings" style={cta} className="lp-hero-cta">
              今すぐ占いを受けてみる →
            </Link>
            <span style={{ fontSize: 12.5, color: "#9A95B4" }}>
              ※まずは¥1,000のお試しプランから
            </span>
          </div>
        </div>

        {/* 右: ビジュアル */}
        <div style={visualWrap} className="lp-hero-visual">
          <HeroVisual />
          <div style={circleBadge} aria-hidden="false">
            <span style={{ fontSize: 11, color: "#D4C090", letterSpacing: "0.08em" }}>無料診断</span>
            <span style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.2 }}>3種</span>
            <span style={{ fontSize: 10, color: "#C9BBE8", marginTop: 2, lineHeight: 1.4 }}>登録不要・3分</span>
          </div>
        </div>
      </div>
    </section>
  );
}
