import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { OG_SIZE, OG_CONTENT_TYPE, OgCard, loadJpFont } from "@/lib/og/og-shared";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = brand.name;

export default async function Image() {
  const subsetText = `${brand.name}${brand.tagline}${brand.domain}`;
  const font = await loadJpFont(subsetText);

  return new ImageResponse(<OgCard title={brand.tagline} fontReady={!!font} />, {
    ...size,
    fonts: font
      ? [{ name: "Shippori Mincho", data: font, style: "normal", weight: 700 }]
      : undefined,
  });
}
