import type { CSSProperties } from "react";
import { snsAccounts } from "@/config/sns";

const boxStyle: CSSProperties = {
  margin: "48px 0 0",
  padding: "24px",
  background: "#FAF8FD",
  border: "1px solid var(--border-card)",
  borderRadius: "16px",
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--lg-font-heading)",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  margin: "0 0 16px",
};

const rowStyle: CSSProperties = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
};

const avatarStyle: CSSProperties = {
  flexShrink: 0,
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #C0B3DC 0%, #9B8BBF 60%, #C8A0C0 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  boxShadow: "0 2px 12px rgba(155,139,191,0.35)",
};

const nameStyle: CSSProperties = {
  fontFamily: "var(--lg-font-heading)",
  fontWeight: 700,
  fontSize: "16px",
  color: "#1A1A1A",
  margin: "0 0 6px",
};

const bioStyle: CSSProperties = {
  fontSize: "13.5px",
  lineHeight: 1.85,
  color: "#2A2A2A",
  margin: "0 0 12px",
};

const xLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#fff",
  background: "#1A1A1A",
  padding: "7px 14px",
  borderRadius: "999px",
  textDecoration: "none",
};

/** 記事末尾の「この記事を書いた人」プロフィール（E-E-A-T・信頼性向上） */
export function AuthorBox() {
  return (
    <section style={boxStyle} aria-label="この記事を書いた人">
      <p style={labelStyle}>✦ この記事を書いた人</p>
      <div style={rowStyle}>
        <div style={avatarStyle} aria-hidden="true">
          🌙
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={nameStyle}>Litwill Garden 編集部</p>
          <p style={bioStyle}>
            西洋占星術・インド占星術・四柱推命の3つの占術と心理学を掛け合わせ、
            自己理解・恋愛・人間関係の悩みに寄り添うメディアです。占術歴のある
            鑑定者の知見をもとに、初心者にもわかりやすく、誇張のない情報を
            お届けしています。
          </p>
          <a
            href={snsAccounts.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            style={xLinkStyle}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {snsAccounts.twitter.handle} をフォロー
          </a>
        </div>
      </div>
    </section>
  );
}
