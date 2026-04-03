import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { LegendClass, Tier, Difficulty } from "@/config/game";

/** Maps legend classes to their representative icon letter. */
const classIcons: Record<LegendClass, string> = {
  アサルト: "A",
  スカーミッシャー: "S",
  リコン: "R",
  コントローラー: "C",
  サポート: "H",
};

/** Maps tiers to hover glow shadow styles using brand tier colours. */
const tierGlow: Record<Tier, string> = {
  S: "hover:border-[#F59E0B]/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
  A: "hover:border-[#EF4444]/50 hover:shadow-[0_0_24px_rgba(239,68,68,0.25)]",
  B: "hover:border-[#8B5CF6]/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]",
  C: "hover:border-[#3B82F6]/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
  D: "hover:border-[#6B7280]/50 hover:shadow-[0_0_24px_rgba(107,114,128,0.20)]",
};

/** Maps tiers to badge variant keys. */
const tierVariant: Record<Tier, "tier-s" | "tier-a" | "tier-b" | "tier-c" | "tier-d"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
  D: "tier-d",
};

/** Props for the {@link CharacterCard} component. */
export interface CharacterCardProps {
  /** English display name used for the URL slug. */
  name: string;
  /** Japanese display name. */
  nameJa: string;
  /** Legend class (e.g. アサルト, リコン). */
  legendClass: LegendClass;
  /** Current meta tier ranking. */
  tier: Tier;
  /** Skill difficulty rating. */
  difficulty: Difficulty;
  /** Pick rate as a display string (e.g. "8.2%"). */
  pickRate: string;
  /** Win rate as a display string (e.g. "5.1%"). */
  winRate: string;
  /** Short description of the legend. */
  description: string;
}

/**
 * Displays an Apex Legends character (legend) as an interactive card.
 *
 * Features a legend-class icon, tier badge with tier-specific hover glow,
 * difficulty indicator, pick/win rate stats, and a short description.
 * The entire card links to the character detail page.
 *
 * @example
 * ```tsx
 * <CharacterCard
 *   name="Wraith"
 *   nameJa="レイス"
 *   legendClass="スカーミッシャー"
 *   tier="S"
 *   difficulty="上級"
 *   pickRate="9.8%"
 *   winRate="5.2%"
 *   description="虚空を操る次元間スカーミッシャー"
 * />
 * ```
 */
export function CharacterCard({
  name,
  nameJa,
  legendClass,
  tier,
  difficulty,
  pickRate,
  winRate,
  description,
}: CharacterCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/characters/${slug}`} className="group block">
      <Card
        className={cn(
          "h-full transition-all duration-300",
          tierGlow[tier],
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            {/* Legend class icon */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center",
                "rounded-lg border border-bg-elevated bg-bg/80",
                "font-heading text-lg font-black text-primary",
              )}
            >
              {classIcons[legendClass]}
            </div>
            <Badge variant={tierVariant[tier]}>{tier}</Badge>
          </div>

          <CardTitle className="mt-2 group-hover:text-primary transition-colors">
            {nameJa}
          </CardTitle>
          <CardDescription>{name}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Class & difficulty */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{legendClass}</Badge>
            <Badge variant="outline">{difficulty}</Badge>
          </div>

          {/* Pick / Win rates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-bg-elevated bg-bg/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted">
                Pick Rate
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {pickRate}
              </p>
            </div>
            <div className="rounded-lg border border-bg-elevated bg-bg/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted">
                Win Rate
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {winRate}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
            {description}
          </p>
        </CardContent>

        <CardFooter>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
            詳細を見る &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
