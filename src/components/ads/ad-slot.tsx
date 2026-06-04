"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

type AdSlotProps = {
  /** AdSense 管理画面で発行される広告ユニットのスロットID */
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: CSSProperties;
};

/**
 * AdSense 広告ユニット。client/slot が未設定なら何も描画しない（＝ビルドや
 * 表示を壊さず、ID を入れた時点で自動的に有効化される）。
 */
export function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  style,
}: AdSlotProps) {
  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* AdSense スクリプト未ロード時は無視 */
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
