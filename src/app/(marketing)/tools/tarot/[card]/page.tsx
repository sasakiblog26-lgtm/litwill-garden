import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { snsAccounts } from "@/config/sns";
import { CARDS, findCard } from "../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((c) => ({ card: String(c.no) }));
}

export async function generateMetadata({ params }: { params: Promise<{ card: string }> }): Promise<Metadata> {
  const { card } = await params;
  const c = findCard(Number(card));
  if (!c) return {};
  const title = `タロット「${c.name}」の意味｜正位置・逆位置・恋愛・仕事`;
  const description = `タロット大アルカナ「${c.name}（${c.reading}）」の意味を解説。${c.overview} 正位置・逆位置・恋愛・仕事での読み方をやさしく紹介します。`;
  return { title, description, openGraph: { title: `タロット「${c.name}」の意味`, description: c.overview } };
}

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

const sectionStyle: CSSProperties = { background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.4rem 1.5rem", textAlign: "left", marginBottom: "1rem" };
const h2Style: CSSProperties = { color: "#c084fc", fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" };
const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.92rem", lineHeight: 1.9, margin: 0 };
const subLabel: CSSProperties = { color: "#e9d5ff", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem" };

export default async function TarotCardPage({ params }: { params: Promise<{ card: string }> }) {
  const { card } = await params;
  const c = findCard(Number(card));
  if (!c) notFound();

  const prev = findCard(c.no - 1);
  const next = findCard(c.no + 1);

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/tools/tarot" className="text-purple-400 text-sm hover:text-purple-300">← タロット1枚引きにもどる</Link>
        </div>

        {/* header */}
        <div className="text-center mb-10">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-3">✦ {c.reading} ✦</p>
          <div className="text-6xl mb-3">{c.icon}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{c.name}</h1>
          <p className="text-purple-300 text-sm">大アルカナ No.{c.no}</p>
        </div>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🔮 このカードが象徴するもの</h2>
          <p style={bodyStyle}>{c.overview}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>☀️ 正位置の意味</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {c.upright.keywords.map((k) => (
              <span key={k} style={{ background: "rgba(109, 40, 217, 0.3)", border: "1px solid rgba(167, 139, 250, 0.35)", borderRadius: "9999px", padding: "0.25rem 0.75rem", color: "#e9d5ff", fontSize: "0.75rem" }}>{k}</span>
            ))}
          </div>
          <p style={bodyStyle}>{c.upright.message}</p>
          <p style={{ ...bodyStyle, marginTop: "0.6rem", color: "#c4b5fd" }}>アドバイス：{c.upright.advice}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌑 逆位置の意味</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {c.reversed.keywords.map((k) => (
              <span key={k} style={{ background: "rgba(109, 40, 217, 0.3)", border: "1px solid rgba(167, 139, 250, 0.35)", borderRadius: "9999px", padding: "0.25rem 0.75rem", color: "#e9d5ff", fontSize: "0.75rem" }}>{k}</span>
            ))}
          </div>
          <p style={bodyStyle}>{c.reversed.message}</p>
          <p style={{ ...bodyStyle, marginTop: "0.6rem", color: "#c4b5fd" }}>アドバイス：{c.reversed.advice}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>💜 恋愛での意味</h2>
          <p style={subLabel}>正位置</p>
          <p style={bodyStyle}>{c.loveUpright}</p>
          <p style={{ ...subLabel, marginTop: "0.8rem" }}>逆位置</p>
          <p style={bodyStyle}>{c.loveReversed}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌱 仕事での意味</h2>
          <p style={subLabel}>正位置</p>
          <p style={bodyStyle}>{c.workUpright}</p>
          <p style={{ ...subLabel, marginTop: "0.8rem" }}>逆位置</p>
          <p style={bodyStyle}>{c.workReversed}</p>
        </section>

        {/* prev / next */}
        <div className="flex justify-between gap-3 mt-8 mb-8">
          {prev ? (
            <Link href={`/tools/tarot/${prev.no}`} className="text-purple-300 text-sm hover:text-purple-200">← {prev.icon} {prev.name}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/tools/tarot/${next.no}`} className="text-purple-300 text-sm hover:text-purple-200">{next.icon} {next.name} →</Link>
          ) : <span />}
        </div>

        {/* draw CTA */}
        <Link href="/tools/tarot" className="block mb-6">
          <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.25rem 1.4rem", textAlign: "center" }}>
            <p className="text-white font-bold text-sm mb-1">今日のあなたへの1枚を引く</p>
            <p className="text-purple-300 text-xs">▶ タロット1枚引きでメッセージを受け取る</p>
          </div>
        </Link>

        {/* LINE */}
        <div style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" }} className="mb-6">
          <p className="text-white font-bold text-base mb-2">🎁 毎朝、あなたへの1枚をLINEでお届け</p>
          <p className="text-purple-100 text-sm leading-relaxed mb-5">
            LINE友だち追加で、<strong className="text-white">毎日のタロットメッセージ</strong>と占いコンテンツをお届けします。
          </p>
          <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
            <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              LINEで毎日受け取る
            </button>
          </a>
        </div>

        {/* all cards 内部リンク */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>大アルカナ一覧</h2>
          <div className="flex flex-wrap gap-2">
            {CARDS.filter((x) => x.no !== c.no).map((x) => (
              <Link
                key={x.no}
                href={`/tools/tarot/${x.no}`}
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.3rem 0.7rem", color: "#ddd6fe", fontSize: "0.78rem" }}
                className="hover:bg-purple-700/30"
              >
                {x.icon} {x.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-purple-400/70 text-xs leading-relaxed text-center mt-8">
          ※ この占いはエンターテインメントです。結果は前向きに過ごすヒントとしてお楽しみください。
        </p>
      </div>
    </div>
  );
}
