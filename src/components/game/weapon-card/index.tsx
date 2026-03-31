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
import type { WeaponCategory, AmmoType, Tier } from "@/config/game";

/** Maps tiers to badge variant keys. */
const tierVariant: Record<Tier, "tier-s" | "tier-a" | "tier-b" | "tier-c" | "tier-d"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
  D: "tier-d",
};

/** Maps ammo types to badge variants for visual distinction. */
const ammoVariant: Record<AmmoType, "default" | "secondary" | "accent" | "outline"> = {
  ライト: "default",
  ヘビー: "accent",
  エネルギー: "secondary",
  ショットガン: "outline",
  スナイパー: "outline",
  専用: "accent",
};

/** Props for the {@link WeaponCard} component. */
export interface WeaponCardProps {
  /** English display name used for the URL slug. */
  name: string;
  /** Japanese display name. */
  nameJa: string;
  /** Weapon category (e.g. アサルトライフル). */
  category: WeaponCategory;
  /** Ammo type consumed by this weapon. */
  ammoType: AmmoType;
  /** Base damage per shot. */
  damage: number;
  /** Damage per second. */
  dps: number;
  /** Current meta tier ranking. */
  tier: Tier;
  /** Default magazine size. */
  magazine: number;
}

/**
 * Displays an Apex Legends weapon as an interactive card.
 *
 * Shows the weapon name (EN/JP), category, ammo type badge, core damage
 * statistics, magazine size, and tier ranking. The card links to the
 * weapon detail page at `/weapons/[slug]`.
 *
 * @example
 * ```tsx
 * <WeaponCard
 *   name="R-301"
 *   nameJa="R-301 カービン"
 *   category="アサルトライフル"
 *   ammoType="ライト"
 *   damage={14}
 *   dps={189}
 *   tier="A"
 *   magazine={18}
 * />
 * ```
 */
export function WeaponCard({
  name,
  nameJa,
  category,
  ammoType,
  damage,
  dps,
  tier,
  magazine,
}: WeaponCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/weapons/${slug}`} className="group block">
      <Card className="h-full transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle className="truncate group-hover:text-primary transition-colors">
                {nameJa}
              </CardTitle>
              <CardDescription>{name}</CardDescription>
            </div>
            <Badge variant={tierVariant[tier]}>{tier}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Category & ammo type */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            <Badge variant={ammoVariant[ammoType]}>{ammoType}</Badge>
          </div>

          {/* Damage stats grid */}
          <div className="grid grid-cols-3 gap-2">
            <div
              className={cn(
                "rounded-lg border border-bg-elevated bg-bg/60 px-3 py-2",
                "border-l-2 border-l-primary",
              )}
            >
              <p className="text-[10px] uppercase tracking-wider text-text-muted">
                DMG
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {damage}
              </p>
            </div>
            <div
              className={cn(
                "rounded-lg border border-bg-elevated bg-bg/60 px-3 py-2",
                "border-l-2 border-l-accent",
              )}
            >
              <p className="text-[10px] uppercase tracking-wider text-text-muted">
                DPS
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {dps}
              </p>
            </div>
            <div
              className={cn(
                "rounded-lg border border-bg-elevated bg-bg/60 px-3 py-2",
                "border-l-2 border-l-secondary",
              )}
            >
              <p className="text-[10px] uppercase tracking-wider text-text-muted">
                MAG
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {magazine}
              </p>
            </div>
          </div>
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
