import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "オフライン",
  robots: { index: false, follow: false },
};

// SW がネット接続不可時に表示するフォールバック。インストール時にプリキャッシュ。
export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1rem",
      }}
    >
      <div style={{ fontSize: "3rem" }}>🌙</div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>オフラインのようです</h1>
      <p style={{ opacity: 0.8, maxWidth: "28rem", lineHeight: 1.8 }}>
        電波の届く場所でもう一度お試しください。星はいつでもあなたを待っています。
      </p>
      <a
        href="/tools"
        style={{
          marginTop: "0.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          background: "rgba(212,192,144,0.18)",
          border: "1px solid rgba(212,192,144,0.5)",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        診断ホームへ戻る
      </a>
    </div>
  );
}
