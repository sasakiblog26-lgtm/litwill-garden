import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AmbientMotifs } from "@/components/visual/ambient-motifs";
import { brand } from "@/config/brand";
import { JsonLd, websiteJsonLd, organizationJsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { FloatingDock } from "@/components/ux/floating-dock";
import { OnboardingGuide } from "@/components/ux/onboarding-guide";
import "./globals.css";

// 保存済みの表示設定（文字サイズ/コントラスト/動き軽減）を描画前に適用しちらつきを防ぐ
const displayBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem('litwill-display')||'{}');var c=document.documentElement.classList;if(s.font==='l')c.add('ux-font-l');if(s.font==='xl')c.add('ux-font-xl');if(s.contrast)c.add('ux-contrast');if(s.reduce)c.add('ux-reduce-motion');}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(brand.url),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: brand.url,
    siteName: brand.name,
    // og:image は app/opengraph-image.tsx（自動生成）が供給するため指定しない
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console「HTMLタグ」認証。環境変数 GOOGLE_SITE_VERIFICATION
  // にトークンを設定すると <meta name="google-site-verification"> が出力される。
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="theme-dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <GoogleAnalytics />
        <AdSenseScript />
        <script dangerouslySetInnerHTML={{ __html: displayBootScript }} />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <div className="ux-ambient-layer">
          <AmbientMotifs />
        </div>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <FloatingDock />
        <OnboardingGuide />
      </body>
    </html>
  );
}
