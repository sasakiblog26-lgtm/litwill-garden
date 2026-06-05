import type { CSSProperties } from "react";

/**
 * カテゴリ＋seed（slug/タイトル）から決定論的に生成する記事サムネイル。
 * 画像アセット不要・SSR安全（純粋関数）。frontmatter に thumbnail がある場合は
 * ArticleCard 側でそちらを優先する。
 */

type Palette = { from: string; to: string; accent: string; icon: string };

const PALETTES: Record<string, Palette> = {
  占星術: { from: "#2D2448", to: "#5E4D8A", accent: "#D4C090", icon: "🌙" },
  タロット: { from: "#3D2A5E", to: "#7B6AA8", accent: "#E8D0E0", icon: "🔮" },
  数秘術: { from: "#27324F", to: "#5E6CA8", accent: "#C8D8F0", icon: "✦" },
  四柱推命: { from: "#43321F", to: "#9B7C5A", accent: "#D4C090", icon: "☯" },
  心理学: { from: "#1F3A38", to: "#3E7C76", accent: "#C8E0D8", icon: "🧠" },
  心理テスト: { from: "#4A2A3E", to: "#A85E7C", accent: "#E8D0E0", icon: "💗" },
  診断: { from: "#332A4E", to: "#7B5EA8", accent: "#D4C8F0", icon: "✧" },
  クリスタル: { from: "#2A3A4E", to: "#5E7CA8", accent: "#C8D8F0", icon: "💎" },
};

const DEFAULT_PALETTE: Palette = {
  from: "#2D2448",
  to: "#5E4D8A",
  accent: "#D4C090",
  icon: "✦",
};

/** 文字列 → 32bit ハッシュ（FNV-1a） */
function hashStr(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function ArticleThumb({
  category,
  seed,
  height = 200,
}: {
  category: string;
  seed: string;
  height?: number;
}) {
  const p = PALETTES[category] ?? DEFAULT_PALETTE;
  const base = hashStr(seed);
  const gid = `lg-thumb-${base.toString(36)}`;

  // 星を決定論的に配置
  const stars = Array.from({ length: 22 }, (_, i) => {
    const n = hashStr(`${seed}:${i}`);
    return {
      x: (n % 4000) / 10, // 0–400
      y: ((n >> 12) % 2000) / 10, // 0–200
      r: ((n >> 24) % 3) * 0.4 + 0.5,
    };
  });

  // オービット中心を seed で少し動かす
  const ox = 300 + (base % 50);
  const oy = 50 + ((base >> 8) % 40);

  const wrapStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height,
    overflow: "hidden",
  };

  return (
    <div style={wrapStyle} aria-hidden="true">
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.from} />
            <stop offset="1" stopColor={p.to} />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill={`url(#${gid})`} />

        {/* オービットリング */}
        <circle cx={ox} cy={oy} r="58" fill="none" stroke={p.accent} strokeOpacity="0.28" strokeWidth="1" />
        <circle cx={ox} cy={oy} r="88" fill="none" stroke={p.accent} strokeOpacity="0.16" strokeWidth="1" />
        <circle cx={ox} cy={oy} r="120" fill="none" stroke={p.accent} strokeOpacity="0.08" strokeWidth="1" />

        {/* 星 */}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={0.55} />
        ))}

        {/* カテゴリのアイコン */}
        <text
          x="200"
          y="118"
          textAnchor="middle"
          fontSize="58"
          opacity="0.92"
        >
          {p.icon}
        </text>
      </svg>
    </div>
  );
}
