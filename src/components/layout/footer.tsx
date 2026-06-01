"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNavigation } from "@/config/navigation";
import { snsAccounts } from "@/config/sns";

export function Footer() {
  return (
<<<<<<< HEAD
    <footer
      style={{
        background: "#2D2448",
        color: "#F0EAF8",
        padding: "64px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* 上部スター装飾 */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            opacity: 0.45,
            letterSpacing: "16px",
            fontSize: "14px",
            color: "#C0B3DC",
          }}
        >
          ✦ ✦ ✦
        </div>

        {/* 上部: ブランドエリア */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* ブランド情報 */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "\"Cormorant Garamond\", serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#C0B3DC",
                  letterSpacing: "0.03em",
                }}
              >
                Litwill Garden
              </span>
            </Link>
            <p
              style={{
                fontFamily: "\"Noto Sans JP\", sans-serif",
                fontWeight: 300,
                fontSize: "12px",
                lineHeight: 1.8,
                color: "#9A95B4",
                margin: "0 0 20px 0",
              }}
            >
              {brand.description}
            </p>

            {/* SNSアイコン */}
            <div style={{ display: "flex", gap: "16px" }}>
              {/* X (Twitter) */}
              <a
                href={snsAccounts.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                style={{
                  color: "#9A95B4",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C0B3DC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#9A95B4";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={snsAccounts.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  color: "#9A95B4",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C0B3DC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#9A95B4";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path d="M9.545 15.568V8.432L15.818 12z" fill="#2D2448" />
                </svg>
              </a>

              {/* note */}
              <a
                href={snsAccounts.note.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="note"
                style={{
                  color: "#9A95B4",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C0B3DC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#9A95B4";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 13.5h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5zm0-3h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5zm0-3h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h4
              style={{
                fontFamily: "\"Shippori Mincho\", serif",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "#C0B3DC",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              サービス
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerNavigation.service.map((item) => (
                <li key={item.href} style={{ marginBottom: "10px" }}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "\"Noto Sans JP\", sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      color: "#9A95B4",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ブランドについて */}
          <div>
            <h4
              style={{
                fontFamily: "\"Shippori Mincho\", serif",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "#C0B3DC",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              ブランドについて
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerNavigation.about.map((item) => (
                <li key={item.href} style={{ marginBottom: "10px" }}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "\"Noto Sans JP\", sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      color: "#9A95B4",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h4
              style={{
                fontFamily: "\"Shippori Mincho\", serif",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "#C0B3DC",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              法的情報
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerNavigation.legal.map((item) => (
                <li key={item.href} style={{ marginBottom: "10px" }}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "\"Noto Sans JP\", sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      color: "#9A95B4",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div
          style={{
            borderTop: "1px solid rgba(155,139,191,0.2)",
            paddingTop: "28px",
            textAlign: "center",
          }}
        >
          {/* 下部スター装飾 */}
          <div
            style={{
              fontSize: "12px",
              color: "#9A95B4",
              letterSpacing: "8px",
              marginBottom: "16px",
              opacity: 0.5,
            }}
          >
            ✦
          </div>
          <p
            style={{
              fontFamily: "\"Noto Sans JP\", sans-serif",
              fontWeight: 300,
              fontSize: "12px",
              color: "#9A95B4",
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Litwill Garden. All rights reserved. ✦
=======
    <footer className="border-t border-primary/10 bg-bg-deep">
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex flex-col leading-none">
              <span
                className="text-[22px] font-semibold tracking-[0.06em] text-text-on-dark"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="text-primary-light">Litwill</span> Garden
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-text-dim">
                占いと心理学のメディア
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-7 text-text-dim">
              {brand.description}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                snsAccounts.twitter,
                snsAccounts.youtube,
                snsAccounts.note,
              ].map((account) => (
                <a
                  key={account.label}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold text-text-dim transition-colors hover:border-primary-light hover:text-primary-light"
                >
                  {account.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="コンテンツ" items={footerNavigation.content} />
          <FooterColumn title="診断ツール" items={footerNavigation.tools} />
          <FooterColumn title="サイト情報" items={footerNavigation.about} />
        </div>

        <div className="mt-10 border-t border-primary/10 pt-5 text-center">
          <p
            className="text-[12px] italic tracking-[0.04em] text-text-dim"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            (c) {new Date().getFullYear()} Litwill Garden. With Love & Light.
>>>>>>> origin/main
          </p>
        </div>
      </div>

      {/* レスポンシブ */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-[12px] font-bold tracking-[0.08em] text-primary-light">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[13px] text-text-dim transition-colors hover:text-primary-light"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
