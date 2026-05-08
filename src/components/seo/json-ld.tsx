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

/** Webサイト構造化データを生成 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.description,
    publisher: {
      "@type": "Organization",
      name: brand.operator,
    },
  };
}

/** 記事の構造化データを生成 */
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${brand.url}/articles/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Organization",
      name: brand.operator,
    },
    publisher: {
      "@type": "Organization",
      name: brand.operator,
      logo: {
        "@type": "ImageObject",
        url: `${brand.url}/logo.png`,
      },
    },
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
