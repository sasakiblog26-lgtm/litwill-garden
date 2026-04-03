import type { Metadata } from "next";
import { brand } from "@/config/brand";

/** ページ用メタデータを生成するヘルパー */
export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${brand.url}${path}`;
  const image = ogImage ?? `${brand.url}/og-default.png`;

  return {
    title: `${title} | ${brand.name}`,
    description,
    openGraph: {
      title: `${title} | ${brand.name}`,
      description,
      url,
      siteName: brand.name,
      locale: "ja_JP",
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand.name}`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
