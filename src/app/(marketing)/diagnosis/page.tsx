"use client";

import { useState, type CSSProperties } from "react";
import NatalChart from "@/components/visual/natal-chart";
import { CornerFrame } from "@/components/visual/ornaments";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Result data
// ---------------------------------------------------------------------------

const RESULT_SECTIONS = [
  {
    label: "魂のテーマ",
    content:
      "あなたの魂は「調和と癒し」を今世のテーマとして選んでいます。人々の心をつなぎ、傷ついたものを癒す力が宿っています。",
  },
  {
    label: "自然な性格",
    content:
      "感受性が豊かで、場の空気を敏感に読み取る力があります。直感と論理の両方を活かすことができる、バランス型の内省者です。",
  },
  {
    label: "強み",
    content:
      "共感力・創造性・洞察力。あなたの言葉には温かさと深みがあり、周囲の人を自然と引きつけます。",
  },
  {
    label: "おすすめクリスタル",
    content:
      "アメジスト（直感を高める）、ローズクォーツ（愛を引き寄せる）、ムーンストーン（感情を安定させる）。",
  },
];

// ---------------------------------------------------------------------------
// Step 0 — 入力フォーム
// ---------------------------------------------------------------------------

interface InputFormProps {
  onSubmit: (year: string, month: string, day: string) => void;
}

function InputForm({ onSubmit }: InputFormProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const wrapStyle: CSSProperties = {
    maxWidth: 560,
    margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
  };

  const eyebrowStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontSize: "13px",
    color: "#9B8BBF",
    letterSpacing: "0.12em",
    marginBottom: "16px",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "32px",
    color: "var(--text-primary)",
    letterSpacing: "0.03em",
    margin: "0 0 12px",
    lineHeight: 1.3,
  };

  const descStyle: CSSProperties = {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    margin: "0 0 32px",
  };

  const cardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: 24,
    border: "1px solid var(--border-card)",
    padding: "32px",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-body)",
    fontSize: "14px",
    color: "var(--text-secondary)",
    marginBottom: "16px",
    fontWeight: 600,
  };

  const inputRowStyle: CSSProperties = {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "24px",
  };

  const inputStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)",
    fontSize: 16,
    border: "1.5px solid var(--border-card)",
    borderRadius: 12,
    padding: "12px 16px",
    textAlign: "center",
    outline: "none",
    color: "var(--text-primary)",
    background: "var(--bg-main)",
    width: "80px",
  };

  const noteStyle: CSSProperties = {
    fontSize: 11,
    color: "#B8B4CC",
    marginTop: "16px",
    lineHeight: 1.6,
  };

  const handleSubmit = () => {
    if (year && month && day) {
      onSubmit(year, month, day);
    }
  };

  return (
    <div style={wrapStyle}>
      <span style={eyebrowStyle}>FREE READING</span>
      <h1 style={titleStyle}>あなたの魂のテーマを知る</h1>
      <p style={descStyle}>
        生年月日を入力するだけで、西洋占星術・数秘術に基づいたリーディングが届きます。
      </p>

      <div style={cardStyle}>
        <label style={labelStyle}>生年月日を入力してください</label>

        <div style={inputRowStyle}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="1990"
            maxLength={4}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ ...inputStyle, width: "90px" }}
            aria-label="年"
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="03"
            maxLength={2}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={inputStyle}
            aria-label="月"
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="25"
            maxLength={2}
            value={day}
            onChange={(e) => setDay(e.target.value)}
            style={inputStyle}
            aria-label="日"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          style={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={!year || !month || !day}
        >
          ✦ 診断する
        </Button>

        <p style={noteStyle}>
          個人情報は保存されません。占星術・数秘術に基づいた結果を表示します。
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — 診断結果
// ---------------------------------------------------------------------------

interface ResultProps {
  year: string;
  month: string;
  day: string;
  onReset: () => void;
}

function Result({ year, month, day, onReset }: ResultProps) {
  const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const birthLabel = `${year}年${month}月${day}日`;

  const wrapStyle: CSSProperties = {
    maxWidth: 640,
    margin: "0 auto",
    padding: "64px 24px",
    textAlign: "center",
  };

  const eyebrowStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontSize: "13px",
    color: "#9B8BBF",
    letterSpacing: "0.12em",
    marginBottom: "16px",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    color: "var(--text-primary)",
    letterSpacing: "0.03em",
    margin: "0 0 8px",
    lineHeight: 1.35,
  };

  const birthLabelStyle: CSSProperties = {
    fontSize: 13,
    color: "#9A95B4",
    marginBottom: "40px",
  };

  const chartCardStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-card)",
    borderRadius: 24,
    border: "1px solid var(--border-card)",
    padding: "32px",
    marginBottom: "40px",
  };

  const resultGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 40,
    textAlign: "left",
  };

  const resultCardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: 16,
    border: "1px solid var(--border-card)",
    padding: "20px",
  };

  const resultLabelStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "13px",
    color: "#9B8BBF",
    marginBottom: "8px",
    letterSpacing: "0.05em",
  };

  const resultTextStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)",
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: 1.75,
    margin: 0,
  };

  const quoteStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.9,
    fontStyle: "italic",
    borderLeft: "3px solid #C8B8E0",
    paddingLeft: "20px",
    textAlign: "left",
    marginBottom: 40,
  };

  const buttonRowStyle: CSSProperties = {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  return (
    <div style={wrapStyle}>
      <span style={eyebrowStyle}>YOUR READING</span>
      <h1 style={titleStyle}>光をやさしく届ける癒しの調和者</h1>
      <p style={birthLabelStyle}>{birthLabel}生まれ</p>

      <CornerFrame style={{ display: "inline-block" }}>
        <div style={chartCardStyle}>
          <NatalChart birthDate={birthDate} size={300} />
        </div>
      </CornerFrame>

      <div style={resultGridStyle}>
        {RESULT_SECTIONS.map((section) => (
          <div key={section.label} style={resultCardStyle}>
            <p style={resultLabelStyle}>{section.label}</p>
            <p style={resultTextStyle}>{section.content}</p>
          </div>
        ))}
      </div>

      <blockquote style={quoteStyle}>
        「すべての経験は、あなたをより深く、美しく成長させるためのもの。自分を信じて、心の声に従って進んでください。」
      </blockquote>

      <div style={buttonRowStyle}>
        <Button variant="primary" size="lg" href="/readings">
          ✦ フル鑑定を申し込む
        </Button>
        <Button variant="outline" size="lg" onClick={onReset}>
          もう一度診断する
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DiagnosisPage() {
  const [step, setStep] = useState(0);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const handleSubmit = (year: string, month: string, day: string) => {
    setBirthYear(year);
    setBirthMonth(month);
    setBirthDay(day);
    setStep(1);
  };

  const handleReset = () => {
    setStep(0);
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
  };

  if (step === 1) {
    return (
      <Result
        year={birthYear}
        month={birthMonth}
        day={birthDay}
        onReset={handleReset}
      />
    );
  }

  return <InputForm onSubmit={handleSubmit} />;
}
