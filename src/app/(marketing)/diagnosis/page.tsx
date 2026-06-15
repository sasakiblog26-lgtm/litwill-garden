"use client";

import { useState, type CSSProperties } from "react";
import { CornerFrame } from "@/components/visual/ornaments";
import NatalChart from "@/components/visual/natal-chart";
import { Button } from "@/components/ui/button";
import { useReadingRitual, RitualOverlay } from "@/components/ux/reading-ritual";

const RITUAL_MESSAGES = [
  "天体の位置を計算しています",
  "四柱を立て、五行を観ています",
  "3つの体系を照合しています",
  "あなたの運命を読み解いています",
];

// ---------------------------------------------------------------------------
// 型（/api/diagnosis のレスポンス）
// ---------------------------------------------------------------------------

interface ReadingSection {
  label: string;
  body: string;
}
interface BasicReading {
  headline: string;
  birthLabel: string;
  summary: string;
  sections: ReadingSection[];
  dashaPeriod: string;
  timeKnown: boolean;
  lockedTeaser: string[];
}

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外",
];

// ---------------------------------------------------------------------------
// Step 0 — 入力フォーム
// ---------------------------------------------------------------------------

interface InputFormProps {
  onSubmit: (birthdate: string, birthtime: string, birthplace: string) => void;
  loading: boolean;
  error: string;
}

function InputForm({ onSubmit, loading, error }: InputFormProps) {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [birthplace, setBirthplace] = useState("");

  const wrapStyle: CSSProperties = { maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center" };
  const eyebrowStyle: CSSProperties = {
    display: "block", fontFamily: "var(--lg-font-display)", fontStyle: "italic",
    fontSize: "13px", color: "#9B8BBF", letterSpacing: "0.12em", marginBottom: "16px",
  };
  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: "32px",
    color: "var(--text-primary)", letterSpacing: "0.03em", margin: "0 0 12px", lineHeight: 1.3,
  };
  const descStyle: CSSProperties = { fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8, margin: "0 0 32px" };
  const cardStyle: CSSProperties = {
    background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)",
    padding: "32px", textAlign: "left",
  };
  const labelStyle: CSSProperties = {
    display: "block", fontFamily: "var(--lg-font-body)", fontSize: "14px",
    color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 600,
  };
  const inputStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)", fontSize: 16, border: "1.5px solid var(--border-card)",
    borderRadius: 12, padding: "12px 16px", outline: "none", color: "var(--text-primary)",
    background: "var(--bg-main)", width: "100%", boxSizing: "border-box", marginBottom: "20px",
  };
  const noteStyle: CSSProperties = { fontSize: 11, color: "#B8B4CC", marginTop: "8px", lineHeight: 1.6 };

  const handleSubmit = () => {
    if (birthdate && birthplace) onSubmit(birthdate, birthtime, birthplace);
  };

  return (
    <div style={wrapStyle}>
      <span style={eyebrowStyle}>FREE READING</span>
      <h1 style={titleStyle}>あなたの星と運命を、無料で読み解く</h1>
      <p style={descStyle}>
        西洋占星術・インド占星術・四柱推命の3つを統合した独自エンジンが、
        <br />
        あなたの生まれ持った素質と、今めぐる運気をその場で算出します。
      </p>

      <div style={cardStyle}>
        <label style={labelStyle}>生年月日</label>
        <input
          type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}
          style={{ ...inputStyle, colorScheme: "light dark" }} required
        />

        <label style={labelStyle}>出生時刻（わかる範囲で・任意）</label>
        <input
          type="time" value={birthtime} onChange={(e) => setBirthtime(e.target.value)}
          style={{ ...inputStyle, colorScheme: "light dark" }}
        />

        <label style={labelStyle}>出生地</label>
        <select
          value={birthplace} onChange={(e) => setBirthplace(e.target.value)}
          style={{ ...inputStyle, marginBottom: 0 }} required
        >
          <option value="" disabled>都道府県を選択</option>
          {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        {error && (
          <p style={{ color: "#d9534f", fontSize: 13, marginTop: 16, marginBottom: 0 }}>{error}</p>
        )}

        <Button
          variant="primary" size="lg" style={{ width: "100%", marginTop: 24 }}
          onClick={handleSubmit} disabled={!birthdate || !birthplace || loading}
        >
          {loading ? "✦ 星を読み解いています..." : "✦ 無料で診断する"}
        </Button>

        <p style={noteStyle}>
          ✦ 約3秒で結果が表示されます。実際の天体計算に基づいた、あなただけの結果です。
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — 診断結果（無料・基礎）＋ ペイウォール
// ---------------------------------------------------------------------------

interface ResultProps {
  reading: BasicReading;
  birthDate: string;
  onReset: () => void;
}

function Result({ reading, birthDate, onReset }: ResultProps) {
  const wrapStyle: CSSProperties = { maxWidth: 680, margin: "0 auto", padding: "64px 24px" };
  const eyebrowStyle: CSSProperties = {
    display: "block", fontFamily: "var(--lg-font-display)", fontStyle: "italic", fontSize: "13px",
    color: "#9B8BBF", letterSpacing: "0.12em", marginBottom: "16px", textAlign: "center",
  };
  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: "28px", color: "var(--text-primary)",
    letterSpacing: "0.03em", margin: "0 0 8px", lineHeight: 1.35, textAlign: "center",
  };
  const birthLabelStyle: CSSProperties = { fontSize: 13, color: "#9A95B4", marginBottom: "32px", textAlign: "center" };
  const chartCardStyle: CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)",
    borderRadius: 24, border: "1px solid var(--border-card)", padding: "32px", marginBottom: "32px",
  };
  const summaryStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.9,
    background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16,
    padding: "20px 24px", marginBottom: 28,
  };
  const sectionCardStyle: CSSProperties = {
    background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
    padding: "20px 24px", marginBottom: 14,
  };
  const sectionLabelStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)",
    marginBottom: "8px",
  };
  const sectionBodyStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.85, margin: 0,
  };

  return (
    <div style={wrapStyle}>
      <span style={eyebrowStyle}>YOUR READING — 基礎</span>
      <h1 style={titleStyle}>{reading.headline}</h1>
      <p style={birthLabelStyle}>{reading.birthLabel}</p>

      <div style={{ textAlign: "center" }}>
        <CornerFrame style={{ display: "inline-block" }}>
          <div style={chartCardStyle}>
            <NatalChart birthDate={birthDate} size={280} />
          </div>
        </CornerFrame>
      </div>

      <p style={summaryStyle}>{reading.summary}</p>

      {reading.sections.map((s) => (
        <div key={s.label} style={sectionCardStyle}>
          <p style={sectionLabelStyle}>{s.label}</p>
          <p style={sectionBodyStyle}>{s.body}</p>
        </div>
      ))}

      {!reading.timeKnown && (
        <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", margin: "8px 0 0" }}>
          ※ 出生時刻が未入力のため、アセンダント等の精密な項目は省略しています。
        </p>
      )}

      {/* ===== ペイウォール ===== */}
      <Paywall teaser={reading.lockedTeaser} />

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Button variant="outline" size="md" onClick={onReset}>もう一度診断する</Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ペイウォール（有料・応用＋特典への導線）
// ---------------------------------------------------------------------------

function Paywall({ teaser }: { teaser: string[] }) {
  const boxStyle: CSSProperties = {
    position: "relative", marginTop: 36, borderRadius: 20,
    border: "1.5px solid var(--color-gold)", background: "rgba(212,192,144,0.06)",
    padding: "32px 28px", overflow: "hidden",
  };
  const eyebrowStyle: CSSProperties = {
    fontFamily: "var(--lg-font-display)", fontStyle: "italic", fontSize: 13,
    color: "var(--color-gold)", letterSpacing: "0.1em", textAlign: "center", display: "block", marginBottom: 8,
  };
  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 22, color: "var(--text-primary)",
    textAlign: "center", margin: "0 0 6px",
  };
  const subStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)", fontSize: 13.5, color: "var(--text-secondary)",
    textAlign: "center", lineHeight: 1.8, margin: "0 0 24px",
  };
  const itemStyle: CSSProperties = {
    display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--lg-font-body)",
    fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7, marginBottom: 12,
  };

  return (
    <div style={boxStyle}>
      <span style={eyebrowStyle}>APPLIED READING — 応用</span>
      <h2 style={titleStyle}>ここから先は、あなたが「使える」鑑定へ</h2>
      <p style={subStyle}>
        基礎が「あなたを知る」なら、応用は<strong>「明日から動ける」</strong>鑑定です。<br />
        買った翌日から、実際にあなたの資産になる内容をお届けします。
      </p>

      <div style={{ maxWidth: 440, margin: "0 auto 28px" }}>
        {teaser.map((t) => (
          <div key={t} style={itemStyle}>
            <span style={{ color: "var(--color-gold)", flexShrink: 0 }}>🔒</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Button variant="gold" size="lg" href="/readings">
          ✦ 応用鑑定を見る
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DiagnosisPage() {
  const [reading, setReading] = useState<BasicReading | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const ritual = useReadingRitual();

  const handleSubmit = (birthdate: string, birthtime: string, birthplace: string) => {
    setError("");
    return ritual.run(async () => {
      try {
        const res = await fetch("/api/diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthdate, birthtime, birthplace }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "エラーが発生しました");
        setBirthDate(birthdate);
        setReading(data.reading as BasicReading);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    }, RITUAL_MESSAGES);
  };

  const handleReset = () => {
    setReading(null);
    setBirthDate("");
    setError("");
  };

  return (
    <>
      <RitualOverlay state={ritual} />
      {reading ? (
        <Result reading={reading} birthDate={birthDate} onReset={handleReset} />
      ) : (
        <InputForm onSubmit={handleSubmit} loading={ritual.running} error={error} />
      )}
    </>
  );
}
