"use client";

import { cn } from "@/lib/utils";
import type { Tier } from "@/config/game";
import { tiers } from "@/config/game";

/** Tier label background and text colours derived from the brand theme. */
const tierStyles: Record<Tier, { bg: string; text: string; glow: string }> = {
  S: {
    bg: "bg-[#F59E0B]",
    text: "text-[#18181B]",
    glow: "shadow-[0_0_16px_rgba(245,158,11,0.35)]",
  },
  A: {
    bg: "bg-[#EF4444]",
    text: "text-[#FAFAFA]",
    glow: "shadow-[0_0_16px_rgba(239,68,68,0.30)]",
  },
  B: {
    bg: "bg-[#8B5CF6]",
    text: "text-[#FAFAFA]",
    glow: "shadow-[0_0_16px_rgba(139,92,246,0.30)]",
  },
  C: {
    bg: "bg-[#3B82F6]",
    text: "text-[#FAFAFA]",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.30)]",
  },
  D: {
    bg: "bg-[#6B7280]",
    text: "text-[#FAFAFA]",
    glow: "shadow-[0_0_16px_rgba(107,114,128,0.20)]",
  },
};

/** Border accent colour for items in each tier row. */
const tierBorder: Record<Tier, string> = {
  S: "border-[#F59E0B]/40",
  A: "border-[#EF4444]/40",
  B: "border-[#8B5CF6]/40",
  C: "border-[#3B82F6]/40",
  D: "border-[#6B7280]/40",
};

/** A single entry in the tier list. */
export interface TierListItem {
  /** Display name of the legend or weapon. */
  name: string;
  /** Current tier ranking. */
  tier: Tier;
  /** Optional image URL (avatar or weapon icon). */
  imageUrl?: string;
}

/** Props for the {@link TierList} component. */
export interface TierListProps {
  /** Items to place in the tier list. */
  items: TierListItem[];
  /** Whether this tier list is for legends or weapons (used for labelling). */
  type: "legend" | "weapon";
}

/**
 * Interactive tier list that organises legends or weapons into S/A/B/C/D rows.
 *
 * Each row displays the tier letter on the left with its brand colour and a
 * gaming-style glow, followed by all items assigned to that tier. Empty tiers
 * are still shown to maintain the full ranking structure.
 *
 * Marked `"use client"` because it may be extended with drag-and-drop or
 * filter interactivity.
 *
 * @example
 * ```tsx
 * <TierList
 *   type="legend"
 *   items={[
 *     { name: "レイス", tier: "S" },
 *     { name: "パスファインダー", tier: "A" },
 *     { name: "ライフライン", tier: "B" },
 *   ]}
 * />
 * ```
 */
export function TierList({ items, type }: TierListProps) {
  /** Group items by tier. */
  const grouped = tiers.reduce<Record<Tier, TierListItem[]>>(
    (acc, t) => {
      acc[t] = items.filter((item) => item.tier === t);
      return acc;
    },
    { S: [], A: [], B: [], C: [], D: [] },
  );

  return (
    <div className="w-full space-y-1" role="list" aria-label={`${type} tier list`}>
      {tiers.map((tier) => {
        const style = tierStyles[tier];
        const rowItems = grouped[tier];

        return (
          <div
            key={tier}
            role="listitem"
            className={cn(
              "flex items-stretch gap-1 rounded-lg",
              "border border-bg-elevated bg-bg-card/50",
              "overflow-hidden",
            )}
          >
            {/* Tier label */}
            <div
              className={cn(
                "flex w-16 shrink-0 items-center justify-center",
                "font-heading text-2xl font-black",
                style.bg,
                style.text,
                style.glow,
              )}
            >
              {tier}
            </div>

            {/* Items row */}
            <div className="flex min-h-[3.5rem] flex-wrap items-center gap-2 px-3 py-2">
              {rowItems.length === 0 ? (
                <span className="text-xs text-text-dim">&mdash;</span>
              ) : (
                rowItems.map((item) => (
                  <div
                    key={item.name}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-3 py-1.5",
                      "bg-bg/80 transition-all duration-200",
                      "hover:scale-105 hover:bg-bg-elevated/60",
                      tierBorder[tier],
                    )}
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-7 w-7 rounded-md object-cover"
                      />
                    )}
                    <span className="text-sm font-semibold text-text">
                      {item.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
