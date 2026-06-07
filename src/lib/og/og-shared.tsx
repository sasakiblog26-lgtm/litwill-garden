import type { CSSProperties, ReactElement } from "react";
import { brand } from "@/config/brand";

/**
 * OGP画像（1200×630）の共通部品。
 * - フォントは Google Fonts から「使う文字だけ」を subset 取得（リポジトリに重い
 *   フォントをバンドルしない）。ビルド時にネットワークが無い等で失敗しても画像
 *   生成自体は止めない（フォント無しでフォールバック）。
 * - パレットは記事カードサムネ（ArticleThumb）と色を揃える。
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

type Palette = { from: string; to: string; accent: string };

const PALETTES: Record<string, Palette> = {
  占星術: { from: "#2D2448", to: "#5E4D8A", accent: "#D4C090" },
  タロット: { from: "#3D2A5E", to: "#7B6AA8", accent: "#E8D0E0" },
  数秘術: { from: "#27324F", to: "#5E6CA8", accent: "#C8D8F0" },
  四柱推命: { from: "#43321F", to: "#9B7C5A", accent: "#D4C090" },
  心理学: { from: "#1F3A38", to: "#3E7C76", accent: "#C8E0D8" },
  心理テスト: { from: "#4A2A3E", to: "#A85E7C", accent: "#E8D0E0" },
  診断: { from: "#332A4E", to: "#7B5EA8", accent: "#D4C8F0" },
  クリスタル: { from: "#2A3A4E", to: "#5E7CA8", accent: "#C8D8F0" },
};

const DEFAULT_PALETTE: Palette = { from: "#2D2448", to: "#5E4D8A", accent: "#D4C090" };

export function getPalette(category?: string): Palette {
  return (category && PALETTES[category]) || DEFAULT_PALETTE;
}

/**
 * OGタイトルの整形。Shippori Mincho に字形が無いセパレータ（全角/半角パイプ）を
 * スラッシュに置換して豆腐（□）を防ぐ。
 */
export function sanitizeOgTitle(title: string): string {
  return title.replace(/\s*[｜|]\s*/g, " / ");
}

/**
 * 指定テキストに含まれる文字だけを subset した Shippori Mincho（700）を取得する。
 * Google Fonts の css2 は UA を付けないと truetype/opentype を返すため Satori で使える。
 * 失敗時は null（呼び出し側はフォント指定なしで描画＝英数字のみになる）。
 */
export async function loadJpFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const family = "Shippori+Mincho:wght@700";
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(url);
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\((https:\/\/[^)]+?)\)\s*format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

/** OGカードのJSX。記事用・サイト既定で共通利用する。 */
export function OgCard({
  title,
  category,
  fontReady,
}: {
  title: string;
  category?: string;
  /** JPフォント取得に成功したか（失敗時はタイトルを小さめにして英数で見せる） */
  fontReady: boolean;
}): ReactElement {
  const p = getPalette(category);
  const titleSize = title.length > 30 ? 52 : title.length > 18 ? 64 : 76;

  const root: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "72px 80px",
    background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
    color: "#FFFFFF",
    fontFamily: fontReady ? "Shippori Mincho" : "sans-serif",
    position: "relative",
  };

  // 装飾の小さな光点（フォント非依存）
  const dots = [
    { x: 980, y: 90, r: 6, o: 0.5 },
    { x: 1080, y: 160, r: 4, o: 0.35 },
    { x: 900, y: 200, r: 3, o: 0.3 },
    { x: 1040, y: 470, r: 5, o: 0.4 },
    { x: 120, y: 480, r: 4, o: 0.3 },
  ];

  return (
    <div style={root}>
      {/* 装飾リング */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: 420,
          border: `2px solid ${p.accent}`,
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 260,
          height: 260,
          borderRadius: 260,
          border: `2px solid ${p.accent}`,
          opacity: 0.16,
        }}
      />
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.r * 2,
            height: d.r * 2,
            borderRadius: d.r * 2,
            background: "#FFFFFF",
            opacity: d.o,
          }}
        />
      ))}

      {/* 上段：ブランド */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 18,
            height: 18,
            background: p.accent,
            borderRadius: 4,
            marginRight: 16,
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ fontSize: 30, letterSpacing: 2 }}>{brand.name}</div>
      </div>

      {/* 中段：カテゴリ＋タイトル */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {category ? (
          <div style={{ display: "flex", marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                padding: "8px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.16)",
                border: `1px solid ${p.accent}`,
                color: "#FFFFFF",
              }}
            >
              {category}
            </div>
          </div>
        ) : null}
        <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.32 }}>
          {title}
        </div>
      </div>

      {/* 下段：ドメイン＋タグライン */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: 28, color: p.accent }}>{brand.domain}</div>
        <div style={{ display: "flex", fontSize: 24, opacity: 0.85 }}>{brand.tagline}</div>
      </div>
    </div>
  );
}
