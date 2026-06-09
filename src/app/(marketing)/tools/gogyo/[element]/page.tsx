import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { snsAccounts } from "@/config/sns";
import { ELEMENTS_LIST, findBySlug } from "../data";
import RelatedArticles from "@/components/diagnosis/related-articles";
import { JsonLd, breadcrumbJsonLd, pageArticleJsonLd } from "@/components/seo/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return ELEMENTS_LIST.map((e) => ({ element: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ element: string }> }): Promise<Metadata> {
  const { element } = await params;
  const d = findBySlug(element);
  if (!d) return {};
  const title = `五行「${d.element}」タイプの性格・恋愛・仕事・相性｜四柱推命`;
  const description = `四柱推命の五行「${d.element}（${d.catch}）」タイプを解説。${d.desc} 詳しい性格・弱み・恋愛・適職・相性（相生相剋）・開運カラー・クリスタルを紹介します。`;
  return { title, description, openGraph: { title: `五行「${d.element}」タイプの性格・相性`, description: d.catch } };
}

const PAGE_BG = "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)";
const CARD_BG = "rgba(91, 33, 182, 0.12)";
const CARD_BORDER = "1px solid rgba(167, 139, 250, 0.22)";

const sectionStyle: CSSProperties = { background: CARD_BG, border: CARD_BORDER, borderRadius: "1rem", padding: "1.4rem 1.5rem", textAlign: "left", marginBottom: "1rem" };
const h2Style: CSSProperties = { color: "#c084fc", fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" };
const bodyStyle: CSSProperties = { color: "#ddd6fe", fontSize: "0.92rem", lineHeight: 1.9, margin: 0 };

export default async function GogyoElementPage({ params }: { params: Promise<{ element: string }> }) {
  const { element } = await params;
  const d = findBySlug(element);
  if (!d) notFound();

  const others = ELEMENTS_LIST.filter((e) => e.slug !== d.slug);

  const path = `/tools/gogyo/${d.slug}`;

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh" }} className="py-16 px-4">
      <JsonLd data={breadcrumbJsonLd([
        { name: "診断ツール", path: "/tools" },
        { name: "五行タイプ診断", path: "/tools/gogyo" },
        { name: `${d.element}タイプ`, path },
      ])} />
      <JsonLd data={pageArticleJsonLd({
        title: `五行「${d.element}」タイプの性格・恋愛・仕事・相性`,
        description: `${d.catch}。${d.desc}`,
        path,
      })} />
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/tools/gogyo" className="text-purple-400 text-sm hover:text-purple-300">← 五行タイプ診断にもどる</Link>
        </div>

        {/* header */}
        <div className="text-center mb-10">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-3">✦ FIVE ELEMENTS ✦</p>
          <div className="text-6xl mb-3">{d.icon}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{d.element}タイプ</h1>
          <p className="text-purple-200 text-sm italic">{d.catch}</p>
        </div>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌿 {d.element}タイプの性格</h2>
          <p style={bodyStyle}>{d.personality}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>✨ 強み</h2>
          <p style={bodyStyle}>{d.strengths.join(" ／ ")}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🍃 弱み・注意点</h2>
          <p style={bodyStyle}>{d.weakness}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>💜 恋愛傾向</h2>
          <p style={bodyStyle}>{d.loveDetail}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌱 向いている仕事・働き方</h2>
          <p style={bodyStyle}>{d.workStyle}</p>
          <p style={{ ...bodyStyle, marginTop: "0.6rem", color: "#c4b5fd", fontSize: "0.85rem" }}>適職：{d.work}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🤝 相性（相生・相剋）</h2>
          <p style={{ ...bodyStyle, marginBottom: "0.6rem" }}><strong className="text-white">相生（助け合う）：</strong>{d.sosho}</p>
          <p style={bodyStyle}><strong className="text-white">相剋（ぶつかりやすい）：</strong>{d.sokoku}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🎨 開運カラー</h2>
          <p style={bodyStyle}>{d.color}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🔮 ラッキークリスタル</h2>
          <p style={bodyStyle}>{d.crystal}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌟 2026年の運気</h2>
          <p style={bodyStyle}>{d.fortune2026}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>🌟 開運アドバイス</h2>
          <p style={bodyStyle}>{d.advice}</p>
        </section>

        {/* diagnose CTA */}
        <Link href="/tools/gogyo" className="block mt-10 mb-6">
          <div style={{ background: "rgba(124, 58, 237, 0.22)", border: "1px solid rgba(167, 139, 250, 0.45)", borderRadius: "1rem", padding: "1.25rem 1.4rem", textAlign: "center" }}>
            <p className="text-white font-bold text-sm mb-1">あなたの五行を調べる</p>
            <p className="text-purple-300 text-xs">▶ 生まれ年を入れるだけ・五行タイプ診断</p>
          </div>
        </Link>

        {/* LINE */}
        <div style={{ background: "linear-gradient(135deg, rgba(6,199,85,0.18), rgba(91,33,182,0.18))", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" }} className="mb-6">
          <p className="text-white font-bold text-base mb-2">🎁 「{d.element}タイプ」の開運ガイドをLINEで</p>
          <p className="text-purple-100 text-sm leading-relaxed mb-5">
            LINE友だち追加で、<strong className="text-white">五行別の運気の活かし方・月別の開運アドバイス</strong>をお届けします。
          </p>
          <a href={snsAccounts.line.url} target="_blank" rel="noopener noreferrer">
            <button style={{ background: "#06C755", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              LINEで開運ガイドを受け取る
            </button>
          </a>
        </div>

        {/* full reading CTA */}
        <div style={{ background: "rgba(91, 33, 182, 0.18)", border: CARD_BORDER, borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" }} className="mb-10">
          <p className="text-white font-bold text-base mb-2">本格的に占ってほしい方へ</p>
          <p className="text-purple-200 text-sm leading-relaxed mb-5">
            四柱推命を含むパーソナル鑑定で、あなたの運命をより深く読み解きます。
          </p>
          <Link href="/readings">
            <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.85rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              ✦ フル鑑定を申し込む ✦
            </button>
          </Link>
        </div>

        {/* 関連コラム */}
        <RelatedArticles categories={["四柱推命", "占い"]} title="四柱推命をもっと知る関連コラム" />

        {/* other elements 内部リンク */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>ほかの五行タイプも見る</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((e) => (
              <Link
                key={e.slug}
                href={`/tools/gogyo/${e.slug}`}
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.35rem 0.85rem", color: "#ddd6fe", fontSize: "0.8rem" }}
                className="hover:bg-purple-700/30"
              >
                {e.icon} {e.element}タイプ
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
