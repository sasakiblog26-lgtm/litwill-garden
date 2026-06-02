"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import SectionHeader from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const outerStyle: CSSProperties = { maxWidth: "560px", margin: "0 auto", padding: "80px 24px" };
  const cardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: "24px",
    border: "1px solid var(--border-card)",
    padding: "32px",
    marginTop: "40px",
  };
  const fieldsetStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "20px", border: "none", padding: 0, margin: 0 };
  const labelStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--lg-font-body)", fontSize: "14px", color: "var(--text-secondary)" };
  const inputStyle: CSSProperties = {
    border: "1.5px solid var(--border-card)",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontFamily: "Noto Sans JP, sans-serif",
    fontSize: "15px",
    color: "var(--text-primary)",
    background: "transparent",
    outline: "none",
    boxSizing: "border-box",
  };
  const textareaStyle: CSSProperties = { ...inputStyle, minHeight: "120px", resize: "vertical" };
  const thankYouStyle: CSSProperties = { textAlign: "center", padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={outerStyle}>
      <SectionHeader eyebrow="Contact" title="お問い合わせ" sub="ご質問・ご相談はこちらからお気軽にどうぞ。" />
      <div style={cardStyle}>
        {submitted ? (
          <div style={thankYouStyle}>
            <p style={{ fontSize: "36px", margin: 0 }}>✦</p>
            <h2 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: "22px", color: "var(--text-primary)", margin: 0 }}>送信が完了しました</h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
              お問い合わせありがとうございます。<br />
              通常2〜3営業日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={fieldsetStyle}>
              <label style={labelStyle}>
                お名前
                <input type="text" name="name" required placeholder="山田 花子" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                メールアドレス
                <input type="email" name="email" required placeholder="example@email.com" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                件名
                <input type="text" name="subject" required placeholder="鑑定についてのご相談" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                お問い合わせ内容
                <textarea name="message" required placeholder="ご質問・ご相談の内容をお書きください。" style={textareaStyle} />
              </label>
            </div>
            <div style={{ marginTop: "28px" }}>
              <Button type="submit" variant="primary" size="lg" style={{ width: "100%" }}>✦ 送信する</Button>
            </div>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>通常2〜3営業日以内にご返信いたします。</p>
          </form>
        )}
      </div>
    </div>
  );
}
