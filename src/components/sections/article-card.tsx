import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ArticleCardProps {
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  /** CSS object-position value for thumbnail cropping. @default "center" */
  thumbPosition?: string;
  href?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArticleCard({
  title,
  category,
  publishedAt,
  excerpt,
  thumbPosition = "center",
  href = "#",
}: ArticleCardProps) {
  const cardStyle: CSSProperties = {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid var(--border-card)",
    background: "var(--bg-card)",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 250ms ease, transform 250ms ease",
  };

  const thumbWrapStyle: CSSProperties = {
    position: "relative",
    height: "200px",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    flexShrink: 0,
  };

  const bodyStyle: CSSProperties = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "0 0 16px 16px",
  };

  const metaRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const dateStyle: CSSProperties = {
    fontSize: "11px",
    color: "var(--text-muted)",
    fontFamily: "var(--lg-font-body)",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "16px",
    color: "var(--text-primary)",
    lineHeight: 1.5,
    margin: 0,
    // 2行クランプ
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as CSSProperties;

  const excerptStyle: CSSProperties = {
    fontSize: "13px",
    color: "var(--text-muted)",
    lineHeight: 1.7,
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as CSSProperties;

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <article style={cardStyle}>
        {/* サムネイル */}
        <div style={thumbWrapStyle}>
          <Image
            src="/images/backgrounds.jpg"
            alt={title}
            fill
            style={{ objectFit: "cover", objectPosition: thumbPosition }}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </div>

        {/* カード本体 */}
        <div style={bodyStyle}>
          <div style={metaRowStyle}>
            <Badge variant="lavender">{category}</Badge>
            <time dateTime={publishedAt} style={dateStyle}>
              {publishedAt}
            </time>
          </div>

          <h3 style={titleStyle}>{title}</h3>
          <p style={excerptStyle}>{excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
