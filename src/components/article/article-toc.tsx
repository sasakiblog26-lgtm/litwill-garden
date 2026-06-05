import type { CSSProperties } from "react";
import type { TocItem } from "@/lib/markdown";

const wrapStyle: CSSProperties = {
  margin: "28px 0 36px",
  padding: "20px 24px",
  background: "#FAF8FD",
  border: "1px solid var(--border-card)",
  borderRadius: "12px",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--lg-font-heading)",
  fontWeight: 700,
  fontSize: "14px",
  letterSpacing: "0.08em",
  color: "#1A1A1A",
  margin: "0 0 12px",
};

const listStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  counterReset: "toc",
};

/** 記事の目次（h2/h3から自動生成）。全記事で表示 */
export function ArticleToc({ toc }: { toc: TocItem[] }) {
  if (toc.length === 0) return null;

  return (
    <nav style={wrapStyle} aria-label="目次">
      <p style={headingStyle}>📖 目次</p>
      <ul style={listStyle}>
        {toc.map((item) => (
          <li
            key={item.id}
            style={{
              margin: "6px 0",
              paddingLeft: item.level === 3 ? 18 : 0,
            }}
          >
            <a
              href={`#${item.id}`}
              style={{
                fontSize: item.level === 3 ? "13px" : "14px",
                color: item.level === 3 ? "#5E4D8A" : "#2A2A2A",
                fontWeight: item.level === 3 ? 400 : 600,
                textDecoration: "none",
                lineHeight: 1.6,
              }}
            >
              {item.level === 3 ? "– " : ""}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
