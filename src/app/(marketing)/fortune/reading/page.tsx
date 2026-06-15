"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "天体の位置を計算しています",
  "四柱を立て、五行を観ています",
  "3つの体系を照合しています",
  "あなたの運命を読み解いています",
];

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外",
];

export default function ReadingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    birthtime: "",
    birthplace: "",
    gender: "",
  });
  const ritual = useReadingRitual();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ritual.run(() => {}, RITUAL_MESSAGES, 2200).then(() => router.push("/fortune/result"));
  };

  const isValid = form.name && form.birthdate && form.birthplace && form.gender;

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
      <RitualOverlay state={ritual} />
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        <span className="absolute top-16 left-1/4 text-purple-300/15 text-4xl">✦</span>
        <span className="absolute top-1/3 right-12 text-indigo-200/10 text-3xl">⋆</span>
        <span className="absolute bottom-1/3 left-10 text-purple-400/10 text-4xl">✧</span>
        <span className="absolute bottom-20 right-1/3 text-purple-300/15 text-2xl">✦</span>
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ リーディング開始 ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            鑑定情報の入力
          </h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            あなたの情報をご入力ください。
            <br />
            すべての情報は鑑定のためだけに使用します。
          </p>
        </div>

        {/* Form */}
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
            {/* Name */}
            <div>
              <label style={labelStyle}>✦ お名前（ニックネーム可）</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="例：さくら"
                style={inputStyle}
                required
              />
            </div>

            {/* Birthdate */}
            <div>
              <label style={labelStyle}>✦ 生年月日</label>
              <input
                type="date"
                name="birthdate"
                value={form.birthdate}
                onChange={handleChange}
                style={{ ...inputStyle, colorScheme: "dark" }}
                required
              />
            </div>

            {/* Birthtime */}
            <div>
              <label style={labelStyle}>✦ 出生時刻（わかる範囲で）</label>
              <input
                type="time"
                name="birthtime"
                value={form.birthtime}
                onChange={handleChange}
                style={{ ...inputStyle, colorScheme: "dark" }}
              />
              <p className="text-purple-400 text-xs mt-1">不明な場合は空欄でも鑑定できます</p>
            </div>

            {/* Birthplace */}
            <div>
              <label style={labelStyle}>✦ 出生地</label>
              <select
                name="birthplace"
                value={form.birthplace}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="" disabled style={{ background: "#1a0a3d" }}>都道府県を選択</option>
                {prefectures.map((p) => (
                  <option key={p} value={p} style={{ background: "#1a0a3d" }}>{p}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label style={labelStyle}>✦ 性別</label>
              <div className="flex gap-3">
                {["女性", "男性", "その他"].map((g) => (
                  <label
                    key={g}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      border: `1px solid ${form.gender === g ? "rgba(167, 139, 250, 0.7)" : "rgba(167, 139, 250, 0.25)"}`,
                      background: form.gender === g ? "rgba(109, 40, 217, 0.4)" : "rgba(91, 33, 182, 0.1)",
                      color: form.gender === g ? "white" : "#c084fc",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || ritual.running}
            style={{
              width: "100%",
              marginTop: "2rem",
              padding: "1rem",
              borderRadius: "9999px",
              background: isValid && !ritual.running
                ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                : "rgba(91, 33, 182, 0.3)",
              color: isValid && !ritual.running ? "white" : "rgba(167, 139, 250, 0.5)",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: isValid && !ritual.running ? "pointer" : "not-allowed",
              border: "none",
              transition: "all 0.2s",
            }}
          >
            {ritual.running ? "✦ 鑑定中... ✦" : "✦ 鑑定結果を見る ✦"}
          </button>
          <p className="text-purple-400 text-xs text-center mt-4">
            ✦ 無料 ✦ 約3分で完了
          </p>
        </form>
      </div>
    </div>
  );
}
