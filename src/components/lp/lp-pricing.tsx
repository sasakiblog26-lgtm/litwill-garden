import type { CSSProperties } from "react";
import Link from "next/link";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// 料金プラン（band2下〜band3上）3カード
//   現行/readingsの実価格・実説明。中央カードは紫グラデ強調＋上部に「おすすめ」タブ。
//   時間表記（10分/20分コース）は使わない（文章レポート型）。
//   CTA: 左右=グラデpill / 中央=白抜きpill。
// ---------------------------------------------------------------------------

interface Plan {
  name: string;
  price: string;
  description: string;
  points: string[];
  href: string;
  highlight: boolean;
}

const PLANS: Plan[] = [
  {
    name: "お試しプラン",
    price: "¥1,000",
    description: "気になることをひとつ、気軽に。はじめての方におすすめのミニ鑑定レポートです。",
    points: ["はじめての方に", "ひとつの問いを気軽に"],
    href: "/readings/apply?plan=otameshi",
    highlight: false,
  },
  {
    name: "スタンダードプラン",
    price: "¥2,500",
    description: "ひとつのテーマをじっくり読み解く、いちばん選ばれやすい構成。恋愛・仕事などの相談に。",
    points: ["ひとつのテーマをじっくり", "恋愛・仕事の相談に"],
    href: "/readings/apply?plan=standard",
    highlight: true,
  },
  {
    name: "しっかりプラン",
    price: "¥3,500",
    description: "複数の悩みや人生全体まで、深く見つめ直したい方へ。読み応えのある詳細レポート。",
    points: ["複数の悩みも相談できる", "読み応えのある詳細レポート"],
    href: "/readings/apply?plan=shikkari",
    highlight: false,
  },
];

export default function LpPricing() {
  const baseCard: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    borderRadius: 22,
    padding: "34px 28px 30px",
  };

  const lightCard: CSSProperties = {
    ...baseCard,
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.16)",
    boxShadow: "0 10px 28px rgba(155,139,191,0.12)",
  };

  const highlightCard: CSSProperties = {
    ...baseCard,
    background: "linear-gradient(160deg, #8B79B8 0%, #6E5C9C 100%)",
    border: "1px solid rgba(212,192,144,0.5)",
    boxShadow: "0 18px 40px rgba(110,92,156,0.35)",
    transform: "translateY(-8px)",
  };

  const tab: CSSProperties = {
    position: "absolute",
    top: -14,
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #D4C090, #E8D8B0)",
    color: "#3A3015",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 18px",
    borderRadius: 999,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(212,192,144,0.4)",
  };

  const gradPill: CSSProperties = {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #B9A7DC, #8B79B8)",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 14.5,
    padding: "14px 20px",
    borderRadius: 999,
    boxShadow: "0 8px 22px rgba(139,121,184,0.3)",
  };

  const whitePill: CSSProperties = {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    color: "#6E5C9C",
    fontWeight: 700,
    fontSize: 14.5,
    padding: "14px 20px",
    borderRadius: 999,
    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
  };

  return (
    <section style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F3FA 100%)", padding: "84px 24px 80px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <LpSectionHeader
          eyebrow="Price"
          title="料金プラン"
          sub="すべて税込価格です。お試しから、じっくりまで。ご相談内容に合わせてお選びいただけます。"
        />

        <div
          className="lp-grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56, alignItems: "stretch" }}
        >
          {PLANS.map((p) => {
            const dark = p.highlight;
            const titleColor = dark ? "#FFFFFF" : "#2D2448";
            const priceColor = dark ? "#FFFFFF" : "#7B6AA8";
            const textColor = dark ? "rgba(255,255,255,0.92)" : "#5E4D8A";
            return (
              <div key={p.name} style={dark ? highlightCard : lightCard} className={dark ? "lp-pricing-highlight" : undefined}>
                {p.highlight && <span style={tab}>おすすめ</span>}
                <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 18, color: titleColor, margin: 0, textAlign: "center" }}>
                  {p.name}
                </h3>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 34, color: priceColor }}>{p.price}</span>
                  <span style={{ fontSize: 13, color: textColor, marginLeft: 4 }}>(税込)</span>
                </div>
                <p style={{ fontSize: 13.5, color: textColor, lineHeight: 1.85, margin: 0, textAlign: "center" }}>
                  {p.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.points.map((pt) => (
                    <li key={pt} style={{ fontSize: 13, color: textColor, lineHeight: 1.6, display: "flex", gap: 8, justifyContent: "center" }}>
                      <span style={{ color: dark ? "#E8D8B0" : "#B0A0CF" }} aria-hidden="true">✦</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} style={dark ? whitePill : gradPill}>
                  このプランで占う →
                </Link>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", fontSize: 12.5, color: "#9A95B4", marginTop: 28, lineHeight: 1.7 }}>
          ※鑑定レポートはメールにてお届けします（お申し込み後3〜5営業日以内）。
        </p>
      </div>
    </section>
  );
}
