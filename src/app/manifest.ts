import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

// PWA マニフェスト。Next.js が自動で /manifest.webmanifest として配信し、
// <link rel="manifest"> を埋め込む。これにより「ホーム画面に追加」で
// 全画面アプリとして起動できる（start_url=診断ハブ /tools）。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} 占い診断`,
    short_name: "Litwill",
    description:
      "西洋占星術・四柱推命・タロットを融合した無料診断アプリ。16タイプ性格診断・今日のタロット・五行タイプ診断をいつでも。",
    lang: "ja",
    start_url: "/tools?utm_source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f0720",
    theme_color: "#0f0720",
    categories: ["lifestyle", "entertainment"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "16タイプ診断", short_name: "16タイプ", url: "/tools/16types?utm_source=pwa" },
      { name: "今日のタロット", short_name: "タロット", url: "/tools/tarot?utm_source=pwa" },
      { name: "五行タイプ診断", short_name: "五行", url: "/tools/gogyo?utm_source=pwa" },
    ],
  };
}
