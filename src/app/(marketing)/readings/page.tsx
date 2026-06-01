import type { Metadata } from "next";
import SectionHeader from "@/components/sections/section-header";
import ReadingCard from "@/components/sections/reading-card";
import ConstellationField from "@/components/visual/constellation-field";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = { title: "鑑定メニュー" };

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const READINGS = [
  {
    eyebrow: "Soul Reading",
    title: "魂のテーマリーディング",
    description:
      "あなたが今世で体験したいテーマ、魂レベルの強み・課題を総合的にリーディング。",
    tags: ["占星術", "数秘術"],
    price: "¥3,300",
    gold: false,
    href: "/readings",
  },
  {
    eyebrow: "Love Reading",
    title: "恋愛リーディング",
    description:
      "恋愛パターン、理想のパートナー像、今の恋の流れを読み解きます。",
    tags: ["タロット", "恋愛"],
    price: "¥3,300",
    gold: false,
    href: "/readings",
  },
  {
    eyebrow: "Premium Reading",
    title: "✦ 人生の星図 フル鑑定",
    description:
      "魂のテーマ、恋愛、仕事、人間関係、運気サイクルまで — 美しい星図にまとめてお届け。",
    tags: ["占星術", "タロット", "心理学", "クリスタル"],
    price: "¥11,000",
    gold: true,
    href: "/readings",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ReadingsPage() {
  return (
    <ConstellationField density="sparse">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader
          eyebrow="Menu"
          title="鑑定メニュー"
          sub="すべてのリーディングは、西洋占星術・インド占星術・四柱推命を融合した独自メソッドで行います。"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 48,
          }}
        >
          {READINGS.map((reading) => (
            <div
              key={reading.eyebrow}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 20,
                alignItems: "center",
              }}
            >
              <ReadingCard {...reading} />
              <Button
                variant={reading.gold ? "gold" : "primary"}
                size="md"
                href={reading.href}
              >
                申し込む
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ConstellationField>
  );
}
