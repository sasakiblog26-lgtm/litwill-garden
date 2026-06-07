import { ImageResponse } from "next/og";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/markdown";
import { brand } from "@/config/brand";
import { OG_SIZE, OG_CONTENT_TYPE, OgCard, loadJpFont, sanitizeOgTitle } from "@/lib/og/og-shared";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${brand.name} の記事`;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title: string = brand.name;
  let category: string | undefined;
  try {
    const article = await getArticleBySlug(slug);
    title = article.title;
    category = article.category;
  } catch {
    // 記事が取れなければサイト名でフォールバック
  }

  const cleanTitle = sanitizeOgTitle(title);
  const subsetText = `${cleanTitle}${category ?? ""}${brand.name}${brand.tagline}${brand.domain}`;
  const font = await loadJpFont(subsetText);

  return new ImageResponse(<OgCard title={cleanTitle} category={category} fontReady={!!font} />, {
    ...size,
    fonts: font
      ? [{ name: "Shippori Mincho", data: font, style: "normal", weight: 700 }]
      : undefined,
  });
}
