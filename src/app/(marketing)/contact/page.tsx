"use client";

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
          </form>
        )}
      </div>
    </div>
  );
}
