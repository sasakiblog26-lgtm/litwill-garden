import type { Metadata } from "next";
import Link from "next/link";
import ConstellationField from "@/components/visual/constellation-field";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "お申し込み完了" };

export default function SuccessPage() {
  return (
    <ConstellationField density="sparse">
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "56px", marginBottom: "24px" }}>✦</p>
        <h1
          style={{
            fontFamily: "var(--lg-font-heading)",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          お申し込みありがとうございます
        </h1>
        <p
          style={{
            fontFamily: "var(--lg-font-body)",
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.9,
            marginBottom: "32px",
          }}
        >
          ご入力いただいたメールアドレスに確認メールをお送りしました。
          <br />
          鑑定レポートは通常3〜5営業日以内にお届けします。
          <br />
          <br />
          鑑定中のご連絡はすべてメールにて行います。
          <br />
          迷惑メールフォルダもご確認ください。
        </p>
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "16px",
            border: "1px solid var(--border-card)",
            padding: "24px",
            marginBottom: "40px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "var(--lg-font-body)",
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: 1.8,
            }}
          >
            ✦ キャンセル・ご変更はお申し込みから24時間以内にメールにてご連絡ください。
            <br />
            ✦ ご不明な点は <Link href="/contact" style={{ color: "var(--color-gold)" }}>お問い合わせフォーム</Link> からご連絡ください。
          </p>
        </div>
        <Button variant="primary" size="lg" href="/">
          トップページへ戻る
        </Button>
      </div>
    </ConstellationField>
  );
}
