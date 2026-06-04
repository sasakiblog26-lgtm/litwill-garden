"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PLANS = {
  soul: { label: "魂のテーマリーディング", price: "¥3,300" },
  love: { label: "恋愛リーディング", price: "¥3,300" },
  premium: { label: "人生の星図 フル鑑定", price: "¥11,000" },
} as const;

type PlanKey = keyof typeof PLANS;

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外",
];

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") as PlanKey | null;
  const validPlan = planParam && planParam in PLANS ? planParam : "soul";

  const [form, setForm] = useState({
    plan: validPlan,
    name: "",
    email: "",
    birthdate: "",
    birthtime: "",
    birthplace: "",
    concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "エラーが発生しました");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setLoading(false);
    }
  };

  const isValid = form.name && form.email && form.birthdate && form.birthplace;
  const plan = PLANS[form.plan as PlanKey];

  const inputCss: React.CSSProperties = {
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
  const labelCss: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontFamily: "var(--lg-font-body)",
    fontSize: "14px",
    color: "var(--text-secondary)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Plan selector */}
      <div>
        <p style={{ ...labelCss, marginBottom: "8px" } as React.CSSProperties}>鑑定メニュー</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {(Object.entries(PLANS) as [PlanKey, (typeof PLANS)[PlanKey]][]).map(([key, val]) => (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1.5px solid ${form.plan === key ? "var(--color-gold)" : "var(--border-card)"}`,
                background: form.plan === key ? "rgba(212,192,144,0.06)" : "transparent",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="plan"
                value={key}
                checked={form.plan === key}
                onChange={handleChange}
                style={{ accentColor: "var(--color-gold)" }}
              />
              <span style={{ flex: 1, fontFamily: "var(--lg-font-body)", fontSize: "15px", color: "var(--text-primary)" }}>
                {val.label}
              </span>
              <span style={{ fontFamily: "var(--lg-font-body)", fontSize: "15px", color: "var(--color-gold)", fontWeight: 600 }}>
                {val.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <label style={labelCss}>
        お名前（ニックネーム可）
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="例：さくら" style={inputCss} required />
      </label>

      {/* Email */}
      <label style={labelCss}>
        メールアドレス <span style={{ color: "var(--color-gold)", fontSize: "12px" }}>※鑑定結果をお届けします</span>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" style={inputCss} required />
      </label>

      {/* Birthdate */}
      <label style={labelCss}>
        生年月日
        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} style={{ ...inputCss, colorScheme: "light dark" }} required />
      </label>

      {/* Birthtime */}
      <label style={labelCss}>
        出生時刻（わかる範囲で）
        <input type="time" name="birthtime" value={form.birthtime} onChange={handleChange} style={{ ...inputCss, colorScheme: "light dark" }} />
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>不明な場合は空欄でも鑑定できます</span>
      </label>

      {/* Birthplace */}
      <label style={labelCss}>
        出生地
        <select name="birthplace" value={form.birthplace} onChange={handleChange} style={inputCss} required>
          <option value="" disabled>都道府県を選択</option>
          {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      {/* Concern */}
      <label style={labelCss}>
        特に知りたいこと・お悩み（任意）
        <textarea
          name="concern"
          value={form.concern}
          onChange={handleChange}
          placeholder="例：仕事の転機について、恋愛のパターンについて..."
          style={{ ...inputCss, minHeight: "100px", resize: "vertical" }}
        />
      </label>

      {error && (
        <p style={{ color: "#e57373", fontSize: "14px", textAlign: "center" }}>{error}</p>
      )}

      {/* Summary + submit */}
      <div
        style={{
          borderTop: "1px solid var(--border-card)",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--lg-font-body)", fontSize: "14px", color: "var(--text-secondary)" }}>
            {plan.label}
          </span>
          <span style={{ fontFamily: "var(--lg-font-body)", fontSize: "20px", color: "var(--color-gold)", fontWeight: 700 }}>
            {plan.price}（税込）
          </span>
        </div>
        <Button type="submit" variant="gold" size="lg" style={{ width: "100%" }} disabled={!isValid || loading}>
          {loading ? "決済ページへ移動中..." : "✦ 決済に進む"}
        </Button>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
          Stripe の安全な決済ページに移動します
        </p>
      </div>
    </form>
  );
}
