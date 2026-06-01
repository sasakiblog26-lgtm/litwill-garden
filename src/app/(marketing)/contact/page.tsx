"use client";

<<<<<<< HEAD
// metadataはServer Componentのみ使用できるため、layout.tsxのデフォルトを使用

import { useState, type CSSProperties, type FormEvent } from "react";
import SectionHeader from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "560px",
    margin: "0 auto",
    padding: "80px 24px",
  };

  // ── Form card ────────────────────────────────────────────────────────────
  const cardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: "24px",
    border: "1px solid var(--border-card)",
    padding: "32px",
    marginTop: "40px",
  };

  const fieldsetStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    border: "none",
    padding: 0,
    margin: 0,
  };

  const labelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontFamily: "var(--lg-font-body)",
    fontSize: "14px",
    color: "var(--text-secondary)",
  };

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

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const noteStyle: CSSProperties = {
    marginTop: "16px",
    fontSize: "13px",
    color: "var(--text-muted)",
    textAlign: "center",
  };

  // ── Thank-you ────────────────────────────────────────────────────────────
  const thankYouStyle: CSSProperties = {
    textAlign: "center",
    padding: "40px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  };

  const thankYouTitleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "22px",
    color: "var(--text-primary)",
    margin: 0,
  };

  const thankYouSubStyle: CSSProperties = {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    margin: 0,
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={outerStyle}>
      <SectionHeader
        eyebrow="Contact"
        title="お問い合わせ"
        sub="ご質問・ご相談はこちらからお気軽にどうぞ。"
      />

      <div style={cardStyle}>
        {submitted ? (
          <div style={thankYouStyle}>
            <p style={{ fontSize: "36px", margin: 0 }}>✦</p>
            <h2 style={thankYouTitleStyle}>送信が完了しました</h2>
            <p style={thankYouSubStyle}>
              お問い合わせありがとうございます。<br />
              通常2〜3営業日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={fieldsetStyle}>
              <label style={labelStyle}>
                お名前
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="山田 花子"
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                メールアドレス
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                件名
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="鑑定についてのご相談"
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                お問い合わせ内容
                <textarea
                  name="message"
                  required
                  placeholder="ご質問・ご相談の内容をお書きください。"
                  style={textareaStyle}
                />
              </label>
            </div>

            <div style={{ marginTop: "28px" }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                style={{ width: "100%" }}
              >
                ✦ 送信する
              </Button>
            </div>

            <p style={noteStyle}>通常2〜3営業日以内にご返信いたします。</p>
=======
import { useState } from "react";

const categories = [
  "鑑定・診断に関するお問い合わせ",
  "コンテンツに関するご意見・ご要望",
  "サービスの不具合・エラー報告",
  "お仕事・コラボレーションのご相談",
  "その他",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const isValid = form.name && form.email && form.category && form.message;

  const inputStyle: React.CSSProperties = {
    background: "rgba(91, 33, 182, 0.15)",
    border: "1px solid rgba(167, 139, 250, 0.3)",
    borderRadius: "0.75rem",
    color: "white",
    padding: "0.875rem 1rem",
    width: "100%",
    outline: "none",
    fontSize: "1rem",
  };

  const labelStyle: React.CSSProperties = {
    color: "#c084fc",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ CONTACT ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">お問い合わせ</h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            ご質問・ご意見・ご要望はこちらからお送りください。
            <br />
            通常3営業日以内にご返信いたします。
          </p>
        </div>

        {sent ? (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(79,70,229,0.3))",
              border: "1px solid rgba(167,139,250,0.4)",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              textAlign: "center",
            }}
          >
            <p className="text-5xl mb-6">🌙</p>
            <h2 className="text-white text-xl font-black mb-4">お問い合わせを受け付けました</h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              ありがとうございます。
              <br />
              3営業日以内にご入力いただいたメールアドレスへご返信いたします。
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(91, 33, 182, 0.1)",
              border: "1px solid rgba(167, 139, 250, 0.2)",
              borderRadius: "1.5rem",
              padding: "2.5rem",
            }}
          >
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>✦ お名前</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="例：さくら" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>✦ メールアドレス</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="例：example@email.com" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>✦ お問い合わせ種別</label>
                <select name="category" value={form.category} onChange={handleChange} style={inputStyle} required>
                  <option value="" disabled style={{ background: "#1a0a3d" }}>選択してください</option>
                  {categories.map((c) => (
                    <option key={c} value={c} style={{ background: "#1a0a3d" }}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>✦ お問い合わせ内容</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="お問い合わせ内容をご記入ください"
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              style={{
                width: "100%",
                marginTop: "2rem",
                padding: "1rem",
                borderRadius: "9999px",
                background: isValid ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(91,33,182,0.3)",
                color: isValid ? "white" : "rgba(167,139,250,0.5)",
                fontWeight: "bold",
                fontSize: "1.05rem",
                cursor: isValid ? "pointer" : "not-allowed",
                border: "none",
              }}
            >
              ✦ 送信する ✦
            </button>
>>>>>>> origin/main
          </form>
        )}
      </div>
    </div>
  );
}
