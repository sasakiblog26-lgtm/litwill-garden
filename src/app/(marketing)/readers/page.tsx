import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import SectionHeader from "@/components/sections/section-header";
import { MirrorFrame } from "@/components/visual/ornaments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "占い師紹介" };

const SPECIALTIES = ["西洋占星術", "インド占星術", "四柱推命", "タロット"] as const;

export default function ReadersPage() {
  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "80px 24px",
  };

  // ── Profile card ─────────────────────────────────────────────────────────
  const cardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: "24px",
    padding: "32px",
    marginTop: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    textAlign: "center",
  };

  const nameStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "24px",
    color: "var(--text-primary)",
    margin: "0 0 4px",
  };

  const titleStyle: CSSProperties = {
    fontSize: "14px",
    color: "#9B8BBF",
    margin: "0 0 12px",
  };

  const bioStyle: CSSProperties = {
    fontSize: "15px",
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    maxWidth: "520px",
    margin: 0,
  };

  const badgeRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    marginTop: "4px",
  };

  return (
    <div style={outerStyle}>
      <SectionHeader
        eyebrow="Readers"
        title="占い師紹介"
        sub="西洋占星術・インド占星術・四柱推命の専門家が、あなたの悩みを丁寧に読み解きます。"
      />

      {/* Profile card */}
      <div style={cardStyle}>
        <MirrorFrame size={120}>
          <Image
            src="/images/reader.jpg"
            alt="佐々木（ペンネーム）"
            width={120}
            height={120}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </MirrorFrame>

        <div>
          <h2 style={nameStyle}>佐々木（ペンネーム）</h2>
          <p style={titleStyle}>西洋占星術師・インド占星術師・四柱推命鑑定士</p>
          <p style={bioStyle}>
            10年以上の鑑定歴。延べ1,000人以上の鑑定実績。西洋・インド・四柱推命の3軸から、お客様の魂のテーマを深く読み解きます。
          </p>
        </div>

        {/* Specialty badges */}
        <div style={badgeRowStyle}>
          {SPECIALTIES.map((s) => (
            <Badge key={s} variant="lavender">{s}</Badge>
          ))}
        </div>

        <Button variant="primary" href="/readings">
          ✦ 鑑定を申し込む
        </Button>
      </div>
    </div>
  );
}
