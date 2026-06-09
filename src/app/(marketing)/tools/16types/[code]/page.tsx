import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { snsAccounts } from "@/config/sns";
import { ELEMENTS, TYPES, TYPE_CODES, type Pole } from "../data";
import RelatedArticles from "@/components/diagnosis/related-articles";
import { JsonLd, breadcrumbJsonLd, pageArticleJsonLd } from "@/components/seo/json-ld";

// 既知の16コードのみ静的生成。それ以外は404。
export const dynamicParams = false;

export function generateStaticParams() {
  return TYPE_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const t = TYPES[code];
  if (!t) return {};
  const title = `${t.name}タイプとは？性格・恋愛・仕事・相性｜16タイプ占い性格診断`;
  const description = `「${t.name}」${t.catch}。${t.desc} 詳しい性格・弱み・恋愛傾向・向いている仕事・相性・開運アドバイスを占星術×心理学で解説します。`;
  return {
    title,
    description,
    openGraph: { title: `${t.name}タイプの性格・恋愛・仕事・相性`, description: t.catch },
  };
}

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

const sectionStyle: CSSProperties = {
  background: CARD_BG,
  border: CARD_BORDER,
  borderRadius: "1rem",
  padding: "1.4rem 1.5rem",
  textAlign: "left",
  marginBottom: "1rem",
};
const h2Style: CSSProperties = { color: "#c084fc", fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" };
const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.92rem", lineHeight: 1.9, margin: 0 };

// 文中の （XXXX） タイプコードを、そのタイプの詳細ページへのリンクに変換する
function LinkifyCodes({ text }: { text: string }) {
  const parts = text.split(/（([A-Z]{4})）/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return TYPES[part] ? (
            <Link key={i} href={`/tools/16types/${part}`} className="text-purple-300 underline underline-offset-2 hover:text-purple-200">（{part}）</Link>
          ) : (
            <span key={i}>（{part}）</span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default async function TypeDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = TYPES[code];
  if (!t) notFound();

  const poles = code.split("") as Pole[];
  const others = TYPE_CODES.filter((c) => c !== code);

  const path = `/tools/16types/${code}`;

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <JsonLd data={breadcrumbJsonLd([
        { name: "診断ツール", path: "/tools" },
        { name: "16タイプ占い性格診断", path: "/tools/16types" },
        { name: `${t.name}タイプ`, path },
      ])} />
      <JsonLd data={pageArticleJsonLd({
        title: `${t.name}タイプの性格・恋愛・仕事・相性`,
        description: `${t.catch}。${t.desc}`,
        path,
      })} />
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/tools/16types" className="text-purple-400 text-sm hover:text-purple-300">← 16タイプ診断にもどる</Link>
        </div>

        {/* header */}
        <div className="text-center mb-10">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-3">✦ {code} ✦</p>
          <div className="text-6xl mb-3">{t.icon}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{t.name}タイプ</h1>
          <p className="text-purple-200 text-sm italic">{t.catch}</p>
        </div>

        {/* element badges */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {poles.map((p) => (
            <span
              key={p}
              style={{ background: "rgba(109, 40, 217, 0.3)", border: "1px solid rgba(167, 139, 250, 0.35)", borderRadius: "9999px", padding: "0.35rem 0.9rem", color: "#e9d5ff", fontSize: "0.78rem" }}
            >
              {ELEMENTS[p].emoji} {ELEMENTS[p].label}・{ELEMENTS[p].word}
            </span>
          ))}
        </div>

        {/* sections */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>🌿 {t.name}タイプの性格</h2>
          <p style={bodyStyle}>{t.personality}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>✨ 強み</h2>
          <p style={bodyStyle}>{t.strengths.join(" ／ ")}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🍃 弱み・注意点</h2>
          <p style={bodyStyle}>{t.weakness}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>💜 恋愛傾向</h2>
          <p style={bodyStyle}>{t.loveDetail}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌱 向いている仕事・働き方</h2>
          <p style={bodyStyle}>{t.workStyle}</p>
          <p style={{ ...bodyStyle, marginTop: "0.6rem", color: "#c4b5fd", fontSize: "0.85rem" }}>適職：{t.work}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🤝 相性</h2>
          <p style={bodyStyle}>
            相性のいいタイプ：<strong className="text-white"><LinkifyCodes text={t.match} /></strong>
            <br />
            すれ違いやすいタイプ：<LinkifyCodes text={t.worst} />
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌟 開運アドバイス</h2>
          <p style={bodyStyle}>{t.advice}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🔮 ラッキークリスタル</h2>
          <p style={bodyStyle}>{t.crystal}</p>
        </section>

        {/* take quiz */}
        <Link href="/tools/16types" className="block mt-10 mb-6">
          <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.25rem 1.4rem", textAlign: "center" }}>
            <p className="text-white font-bold text-sm mb-1">まだ診断していない方へ</p>
            <p className="text-purple-300 text-xs">▶ 全12問・約2分であなたのタイプを調べる</p>
          </div>
        </Link>

        {/* LINE */}
        <div style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" }} className="mb-6">
          <p className="text-white font-bold text-base mb-2">🎁 「{t.name}」の毎月の運勢をLINEで</p>
          <p className="text-purple-100 text-sm leading-relaxed mb-5">
            LINE友だち追加で、あなたのタイプの<strong className="text-white">月別の運勢・恋愛運・相性のいい人</strong>をお届けします。
          </p>
          <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
            <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              LINEで運勢を受け取る
            </button>
          </a>
        </div>

        {/* full reading CTA */}
        <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" }} className="mb-10">
          <p className="text-white font-bold text-base mb-2">もっと深く、あなたを知りたい方へ</p>
          <p className="text-purple-200 text-sm leading-relaxed mb-5">
            生年月日から読み解くパーソナル鑑定で、あなただけの運命の地図をお届けします。
          </p>
          <Link href="/readings">
            <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              ✦ フル鑑定を申し込む ✦
            </button>
          </Link>
        </div>

        {/* 関連コラム */}
        <RelatedArticles
          categories={["診断", "心理テスト", "心理学", "占い"]}
          tags={["自己理解", "性格診断"]}
          title="自分をもっと知る関連コラム"
        />

        {/* other types — 内部リンク */}
        <div style={{ ...sectionStyle, textAlign: "left" }}>
          <h2 style={h2Style}>ほかのタイプも見る</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c}
                href={`/tools/16types/${c}`}
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.35rem 0.85rem", color: "#ddd6fe", fontSize: "0.8rem" }}
                className="hover:bg-purple-700/30"
              >
                {TYPES[c].icon} {TYPES[c].name}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-purple-400/70 text-xs leading-relaxed text-center mt-8">
          ※ この診断はエンターテインメントです。結果は自己理解のヒントとしてお楽しみください。
        </p>
      </div>
    </div>
  );
}
