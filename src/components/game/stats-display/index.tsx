import { cn } from "@/lib/utils";

/** A single stat entry to display. */
export interface StatItem {
  /** Human-readable label for the stat. */
  label: string;
  /** Formatted value (number or string). */
  value: string | number;
  /** Optional unit suffix (e.g. "%", "ms", "m/s"). */
  unit?: string;
  /** Optional change from previous period. Positive = up, negative = down. */
  change?: number;
}

/** Props for the {@link StatsDisplay} component. */
export interface StatsDisplayProps {
  /** Array of stats to render in a responsive grid. */
  stats: StatItem[];
}

/**
 * Renders an array of game statistics in a responsive grid of styled cards.
 *
 * Each stat card shows the label, value with optional unit, and an optional
 * change indicator (green up-arrow for positive, red down-arrow for negative).
 * Cards have a left accent border using the brand primary colour for a
 * gaming-styled appearance.
 *
 * @example
 * ```tsx
 * <StatsDisplay
 *   stats={[
 *     { label: "K/D比", value: "2.34", change: 0.12 },
 *     { label: "勝率", value: "8.5", unit: "%", change: -0.3 },
 *     { label: "平均ダメージ", value: 1247 },
 *     { label: "マッチ数", value: "1,203" },
 *   ]}
 * />
 * ```
 */
export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      role="list"
      aria-label="ゲーム統計"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          role="listitem"
          className={cn(
            "rounded-lg border border-bg-elevated bg-bg-card",
            "border-l-2 border-l-primary",
            "px-4 py-3 transition-all duration-200",
            "hover:border-primary/40 hover:shadow-[0_0_16px_rgba(132,204,22,0.12)]",
          )}
        >
          {/* Label */}
          <p className="text-[11px] uppercase tracking-wider text-text-muted">
            {stat.label}
          </p>

          {/* Value + unit */}
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold text-text">
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-sm font-medium text-text-dim">
                {stat.unit}
              </span>
            )}
          </div>

          {/* Change indicator */}
          {stat.change != null && stat.change !== 0 && (
            <div
              className={cn(
                "mt-1.5 flex items-center gap-1 text-xs font-semibold",
                stat.change > 0 ? "text-primary" : "text-[#EF4444]",
              )}
            >
              {stat.change > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3.5a.5.5 0 0 1 .354.146l4 4a.5.5 0 0 1-.708.708L8.5 5.207V12a.5.5 0 0 1-1 0V5.207L4.354 8.354a.5.5 0 1 1-.708-.708l4-4A.5.5 0 0 1 8 3.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 12.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L7.5 10.793V4a.5.5 0 0 1 1 0v6.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4A.5.5 0 0 1 8 12.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>
                {stat.change > 0 ? "+" : ""}
                {stat.change}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
