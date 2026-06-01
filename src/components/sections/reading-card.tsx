"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ReadingCardProps {
  /** "Soul Reading" など */
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  /** ゴールドカードスタイルを適用する */
  gold?: boolean;
  href?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReadingCard({
  eyebrow,
  title,
  description,
  tags,
  price,
  gold = false,
  href = "#",
}: ReadingCardProps) {
  const cardInnerStyle: CSSProperties = {
    background: "var(--bg-card)",
    border: gold
      ? "1px solid rgba(212,192,144,0.3)"
      : "1px solid var(--border-card)",
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    height: "100%",
  };

  const eyebrowStyle: CSSProperties = {
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontSize: "12px",
    color: "#9B8BBF",
    letterSpacing: "0.08em",
    margin: 0,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "18px",
    color: "var(--text-primary)",
    margin: 0,
    lineHeight: 1.4,
  };

  const descriptionStyle: CSSProperties = {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: 1.75,
    margin: 0,
    flex: "1 1 auto",
  };

  const tagsRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  };

  const priceStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "20px",
    color: gold ? "#D4C090" : "var(--text-primary)",
    margin: 0,
  };

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <TiltCard>
        <div style={cardInnerStyle}>
          <p style={eyebrowStyle}>{eyebrow}</p>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>

          <div style={tagsRowStyle}>
            {tags.map((tag) => (
              <Badge key={tag} variant={gold ? "gold" : "lavender"}>
                {tag}
              </Badge>
            ))}
          </div>

          <p style={priceStyle}>{price}</p>
        </div>
      </TiltCard>
    </Link>
  );
}
