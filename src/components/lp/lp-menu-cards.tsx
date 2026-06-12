import type { CSSProperties } from "react";
import Link from "next/link";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// 鑑定メニュー（band1上）
//   上端が半円アーチ型の画像カード4枚。画像はカテゴリ色の幻想グラデ＋星モチーフ。
//   テーマ名（明朝）＋2行説明（現行/readingsの流儀の実説明）＋アウトラインpill。
// ---------------------------------------------------------------------------

interface ThemeCard {
  title: string;
  description: string;
  href: string;
  arch: { from: string; to: string };
}

const THEMES: ThemeCard[] = [
  {
    title: "恋愛・結婚",
    description: "片思い・復縁・結婚のタイミング、相手の気持ちなど、恋の悩みをていねいに読み解きます。",
    href: "/readings/apply?theme=love",
    arch: { from: "#E8C9DE", to: "#B98FC4" },
  },
  {
    title: "仕事・転職",
    description: "転職の時期、適職、職場の人間関係、これからの働き方を見つめ直すお手伝いをします。",
    href: "/readings/apply?theme=work",
    arch: { from: "#C9D6F0", to: "#8B9FD4" },
  },
  {
    title: "人生・運勢",
    description: "今の運気の流れ、これからのテーマ、人生の転機を3つの占術で読み解きます。",
    href: "/readings/apply?theme=life",
    arch: { from: "#D8CBEF", to: "#9B8BBF" },
  },
  {
    title: "タロット占い",
    description: "今いちばん知りたいひとつの問いに、タロットからのメッセージをお届けします。",
    href: "/readings/apply?theme=tarot",
    arch: { from: "#EAD9C2", to: "#C2A86E" },
  },
];

/** アーチ天面の幻想ビジュアル（CSSグラデ＋星モチーフ） */
function ArchVisual({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        height: 132,
        borderRadius: "108px 108px 0 0",
        background: `linear-gradient(160deg, ${from}, ${to})`,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 200 132"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* 月 */}
        <circle cx="138" cy="48" r="20" fill="rgba(255,255,255,0.55)" />
        <circle cx="146" cy="44" r="20" fill={to} opacity="0.55" />
        {/* 星 */}
        <g fill="rgba(255,255,255,0.9)">
          {[
            [40, 40, 1.6], [64, 70, 1.1], [30, 86, 1.2], [96, 36, 1.3],
            [110, 78, 1], [168, 92, 1.2], [80, 100, 1],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>
        {/* ✦ */}
        <path d="M58 46 l1.6 5.4 5.4 1.6 -5.4 1.6 -1.6 5.4 -1.6 -5.4 -5.4 -1.6 5.4 -1.6 z" fill="rgba(255,255,255,0.95)" />
      </svg>
    </div>
  );
}

export default function LpMenuCards() {
  const card: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.14)",
    borderRadius: "108px 108px 20px 20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(155,139,191,0.12)",
    textDecoration: "none",
  };

  const pill: CSSProperties = {
    alignSelf: "center",
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid rgba(155,139,191,0.45)",
    borderRadius: 999,
    padding: "8px 20px",
    fontSize: 13,
    color: "#7B6AA8",
    fontWeight: 600,
  };

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <LpSectionHeader
          eyebrow="Menu"
          title="鑑定メニュー"
          sub="気になるテーマからご相談ください。3つの占術と心理学の視点で、あなたの悩みに寄り添います。"
        />

        <div
          className="lp-grid-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 48 }}
        >
          {THEMES.map((t) => (
            <Link key={t.title} href={t.href} style={card} className="lp-menu-card">
              <ArchVisual from={t.arch.from} to={t.arch.to} />
              <div style={{ padding: "22px 22px 26px", display: "flex", flexDirection: "column", gap: 12, flex: "1 1 auto" }}>
                <h3
                  style={{
                    fontFamily: "var(--lg-font-heading)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#2D2448",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {t.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "#5E4D8A", lineHeight: 1.8, margin: 0, textAlign: "center", flex: "1 1 auto" }}>
                  {t.description}
                </p>
                <span style={pill}>詳しく見る →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
