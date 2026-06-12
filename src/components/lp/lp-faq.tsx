"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import LpSectionHeader from "./lp-section-header";

// ---------------------------------------------------------------------------
// よくあるご質問（band3中）2列のアコーディオン（＋/− 開閉アニメ）
//   現行FAQ/実態に基づく6問。
// ---------------------------------------------------------------------------

const FAQS = [
  {
    q: "占いが初めてでも大丈夫ですか？",
    a: "はい、初めての方も安心してご利用いただけます。まずは¥1,000のお試しプランから、気になることをひとつ気軽にご相談ください。",
  },
  {
    q: "どの鑑定プランを選べばいいかわかりません。",
    a: "ひとつの問いを気軽にならお試しプラン、テーマをじっくり読み解くならスタンダード、複数の悩みや人生全体まで見つめ直すならしっかりプランがおすすめです。",
  },
  {
    q: "鑑定方法（占術）は何を使いますか？",
    a: "西洋占星術・インド占星術・四柱推命の3つを融合した独自メソッドに、心理学の視点を添えて読み解きます。出生時刻がわからなくても鑑定は可能です。",
  },
  {
    q: "鑑定結果はいつ・どのように届きますか？",
    a: "鑑定レポートをメールでお届けします。お申し込み後3〜5営業日が目安です。今後、PDFダウンロードにも順次対応予定です。",
  },
  {
    q: "支払い方法を教えてください。",
    a: "クレジットカード決済に対応しています。お申し込みフォームから安全にお手続きいただけます。",
  },
  {
    q: "個人情報の扱いは大丈夫ですか？",
    a: "ご入力いただいた情報は鑑定目的にのみ使用し、第三者への提供は一切行いません。詳しくはプライバシーポリシーをご確認ください。",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  const item: CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(155,139,191,0.16)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: open ? "0 8px 22px rgba(155,139,191,0.14)" : "0 4px 14px rgba(155,139,191,0.08)",
    transition: "box-shadow 0.25s ease",
  };

  const button: CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "18px 20px",
    textAlign: "left",
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: 14.5,
    color: "#2D2448",
    lineHeight: 1.6,
  };

  const sign: CSSProperties = {
    flexShrink: 0,
    marginLeft: "auto",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "#8B79B8",
    transition: "transform 0.25s ease",
    transform: open ? "rotate(45deg)" : "rotate(0deg)",
  };

  const body: CSSProperties = {
    display: "grid",
    gridTemplateRows: open ? "1fr" : "0fr",
    transition: "grid-template-rows 0.3s ease",
  };

  return (
    <div style={item}>
      <button type="button" style={button} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span style={{ color: "#B0A0CF", fontFamily: "var(--lg-font-display)", fontStyle: "italic", fontWeight: 700 }} aria-hidden="true">Q.</span>
        <span style={{ flex: "1 1 auto" }}>{q}</span>
        <span style={sign} aria-hidden="true">＋</span>
      </button>
      <div style={body}>
        <div style={{ overflow: "hidden" }}>
          <p style={{ margin: 0, padding: "0 20px 20px 50px", fontSize: 13.5, color: "#5E4D8A", lineHeight: 1.9 }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LpFaq() {
  return (
    <section style={{ background: "#F6F3FA", padding: "80px 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <LpSectionHeader eyebrow="FAQ" title="よくあるご質問" />

        <div
          className="lp-grid-2"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 48 }}
        >
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/faq" style={{ color: "#7B6AA8", fontSize: 14, fontWeight: 600 }}>
            すべての質問を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
