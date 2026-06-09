import { brand } from "@/config/brand";

/** JSON-LD構造化データの共通型 */
type JsonLdProps = {
  data: Record<string, unknown>;
};

/** JSON-LD構造化データをページに埋め込むコンポーネント */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** エンティティ連結用の安定した @id */
const ORG_ID = `${brand.url}/#organization`;
const WEBSITE_ID = `${brand.url}/#website`;

/**
 * Organization（運営者）の構造化データ。
 * Googleの「エンティティ」認識（ナレッジグラフ／AIオーバービュー）を強化する。
 * sameAs・knowsAbout・logo を備え、WebSite/Article から @id で参照される。
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand.name,
    alternateName: "リトウィルガーデン",
    url: brand.url,
    description: brand.description,
    slogan: brand.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${brand.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${brand.url}/logo.png`,
    knowsAbout: brand.expertise,
    ...(brand.socials.length > 0 ? { sameAs: brand.socials } : {}),
  };
}

/** Webサイト構造化データ。Organization を publisher として @id 参照する。 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: brand.name,
    url: brand.url,
    description: brand.description,
    inLanguage: "ja-JP",
    publisher: { "@id": ORG_ID },
  };
}

/** 記事の構造化データ。author/publisher を Organization に連結し、画像・言語を付与する。 */
export function articleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  const url = `${brand.url}/articles/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ja-JP",
    // 代表画像。記事ごとの OG 画像ルートは Next がハッシュ接尾辞を付け URL が
    // 不安定なため、安定して配信されるサイト既定 OG（1200×630）を用いる。
    image: `${brand.url}/opengraph-image`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** 任意パスのパンくず構造化データ（BreadcrumbList）。診断ページなど /articles 以外でも使う。 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "ホーム", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${brand.url}${it.path}`,
    })),
  };
}

/** 記事以外のコンテンツページ（診断の深掘り等）用の Article 構造化データ。 */
export function pageArticleJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${brand.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ja-JP",
    image: `${brand.url}/opengraph-image`,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** FAQページの構造化データを生成 */
export function faqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
