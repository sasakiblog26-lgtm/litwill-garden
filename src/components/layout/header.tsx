"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";

/** サイトヘッダー（ナビゲーション付き） */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-header)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ロゴ */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "\"Cormorant Garamond\", serif",
                fontWeight: 600,
                fontSize: "22px",
                color: "#9B8BBF",
                letterSpacing: "0.02em",
              }}
            >
              Litwill
            </span>
            <span
              style={{
                fontFamily: "\"Cormorant Garamond\", serif",
                fontWeight: 600,
                fontSize: "22px",
                color: "var(--text-primary)",
                letterSpacing: "0.02em",
              }}
            >
              {" "}Garden
            </span>
          </div>
          <div
            style={{
              fontFamily: "\"Noto Sans JP\", sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              color: "#9A95B4",
              letterSpacing: "0.05em",
            }}
          >
            占い × 心理学メディア
          </div>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="resp-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "\"Noto Sans JP\", sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "var(--text-secondary)",
                padding: "8px 14px",
                borderRadius: "20px",
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(155,139,191,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* モバイルハンバーガーボタン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            color: "var(--text-secondary)",
          }}
          className="resp-hamburger"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* モバイルドロワー */}
      {isOpen && (
        <nav
          style={{
            borderTop: "1px solid var(--border-light)",
            background: "var(--bg-header)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "12px 24px 20px",
          }}
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                fontFamily: "\"Noto Sans JP\", sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "var(--text-secondary)",
                padding: "12px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                marginBottom: "2px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(155,139,191,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      {/* レスポンシブ用スタイル（JSX内インライン） */}
      <style>{`
        @media (max-width: 900px) {
          .resp-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
