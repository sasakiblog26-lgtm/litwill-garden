import Script from "next/script";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Google AdSense ローダースクリプト。サイト全体で1回だけ読み込む。
 * 環境変数 NEXT_PUBLIC_ADSENSE_CLIENT（ca-pub-XXXXXXXXXXXXXXXX）が
 * 設定されている時だけ出力する。
 */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      id="adsense-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
