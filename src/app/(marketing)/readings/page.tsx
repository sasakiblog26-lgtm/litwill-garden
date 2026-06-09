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
    eyebrow: "Light",
    title: "お試しプラン",
    description:
      "気になることをひとつ、気軽に。はじめての方におすすめのミニ鑑定レポートです。",
    tags: ["10分相当", "1テーマ"],
    price: "¥1,000",
    gold: false,
    href: "/readings/apply?plan=otameshi",
  },
  {
    eyebrow: "Standard",
    title: "スタンダードプラン",
    description:
      "ひとつのテーマをじっくり読み解く、いちばん人気のプラン。恋愛・仕事などの相談に。",
    tags: ["20分相当", "じっくり"],
    price: "¥2,500",
    gold: true,
    href: "/readings/apply?plan=standard",
  },
  {
    eyebrow: "Full",
    title: "しっかりプラン",
    description:
      "複数の悩みや人生全体まで、深く見つめ直したい方へ。読み応えのある詳細レポート。",
    tags: ["30分相当", "詳細"],
    price: "¥3,500",
    gold: false,
    href: "/readings/apply?plan=shikkari",
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
