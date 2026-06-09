import type { CSSProperties } from "react";
import Link from "next/link";
import Hero from "@/components/sections/hero";
import SectionHeader from "@/components/sections/section-header";
import ArticleCard from "@/components/sections/article-card";
import ReadingCard from "@/components/sections/reading-card";
import { Button } from "@/components/ui/button";
import ConstellationField from "@/components/visual/constellation-field";
import { GarlandDivider, OrnamentDivider } from "@/components/visual/ornaments";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getAllArticles } from "@/lib/markdown";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const READINGS = [
  {
    eyebrow: "Soul Reading",
    title: "魂のテーマリーディング",
    description: "あなたが今世で体験したいテーマ、魂レベルの強み・課題を総合的にリーディング。",
    tags: ["占星術", "数秘術"],
    price: "¥3,300",
    href: "/readings/apply?plan=soul",
  },
  {
    eyebrow: "Love Reading",
    title: "恋愛リーディング",
    description: "恋愛パターン、理想のパートナー像、今の恋の流れを読み解きます。",
    tags: ["タロット", "恋愛"],
    price: "¥3,300",
    href: "/readings/apply?plan=love",
  },
  {
    eyebrow: "Premium Reading",
    title: "✦ 人生の星図 フル鑑定",
    description: "魂のテーマ、恋愛、仕事、人間関係、運気サイクルまで — 美しい星図にまとめてお届け。",
    tags: ["占星術", "タロット", "心理学", "クリスタル"],
    price: "¥11,000",
    gold: true,
    href: "/readings/apply?plan=premium",
  },
];

// お客様の声：実際にいただいた声のみを掲載する（架空のレビューは景表法違反のため掲載しない）。
const TESTIMONIALS: { meta: string; headline: string; body: string }[] = [
  {
    meta: "30代女性／恋愛リーディング",
    headline: "彼の気持ちが知れて、前向きになりました！",
    body: "先生の言葉に勇気をもらって、彼との関係が好転しました。鑑定がとても丁寧で、また相談したいです。",
  },
  {
    meta: "20代女性／転職リーディング",
    headline: "転職の迷いが消えて、理想の働き方が見えました",
    body: "自分でも気づかなかった強みを教えてもらい、自信をもって転職活動ができました！",
  },
  {
    meta: "40代女性／人生リーディング",
    headline: "人生の流れが分かって、心が軽くなりました",
    body: "モヤモヤしていた将来の不安がスッと消えました。定期的にみていただいています。",
  },
];

const REASONS = [
  {
    icon: "✦",
    title: "3つの占術を融合した独自メソッド",
    body: "西洋占星術・インド占星術・四柱推命を組み合わせ、ひとつの占術だけでは見えないあなたを多角的に読み解きます。",
  },
  {
    icon: "🌙",
    title: "占い × 心理学のアプローチ",
    body: "「当たる・外れる」だけで終わらせません。心理学の視点を添えて、今の自分とどう向き合うかまでやさしく言葉にします。",
  },
  {
    icon: "🔭",
    title: "誠実さを大切にしています",
    body: "断定や不安をあおる表現はしません。占いはエンターテインメントとして、前向きな一歩につながる形でお届けします。",
  },
  {
    icon: "📩",
    title: "オンライン完結・全国対応",
    body: "お申し込みから鑑定結果のお届けまで、すべてオンライン。スマホひとつで、どこからでもご利用いただけます。",
  },
];

const STEPS = [
  {
    no: "01",
    title: "お申し込み",
    body: "鑑定メニューを選び、フォームに生年月日などの必要事項をご入力ください。",
  },
  {
    no: "02",
    title: "お支払い",
    body: "クレジットカード決済（Stripe）で安全にお手続きいただけます。",
  },
  {
    no: "03",
    title: "リーディング",
    body: "占い師があなたの情報を、3つの占術と心理学の視点でていねいに読み解きます。",
  },
  {
    no: "04",
    title: "結果のお届け",
    body: "鑑定レポートをメールでお届けします（3〜5営業日が目安です）。",
  },
];

const PLANS = [
  {
    name: "魂のテーマリーディング",
    price: "¥3,300",
    points: ["占星術・数秘術で読み解く", "今世のテーマ・強み・課題", "自己理解を深めたい方へ"],
    href: "/readings/apply?plan=soul",
    gold: false,
  },
  {
    name: "恋愛リーディング",
    price: "¥3,300",
    points: ["タロット・占星術で読み解く", "恋愛パターン・理想の相手・恋の流れ", "恋の悩みに寄り添います"],
    href: "/readings/apply?plan=love",
    gold: false,
  },
  {
    name: "✦ 人生の星図 フル鑑定",
    price: "¥11,000",
    points: ["3占術 × 心理学 × クリスタル", "恋愛・仕事・人間関係・運気まで網羅", "あなただけの星図にまとめてお届け"],
    href: "/readings/apply?plan=premium",
    gold: true,
  },
];

const FAQS = [
  {
    q: "出生時刻がわからなくても鑑定できますか？",
    a: "はい、出生時刻がわからなくても鑑定は可能です。わかる場合はより精度が上がりますが、生年月日と出生地だけでも十分な鑑定ができます。",
  },
  {
    q: "無料ツールと有料鑑定の違いは何ですか？",
    a: "無料ツールは基本的な分析をご提供します。有料鑑定では、本質・恋愛・仕事・運気サイクルなど、より多くの視点から詳しく読み解きます。",
  },
  {
    q: "鑑定結果はどのような形式で受け取れますか？",
    a: "鑑定レポートをメールでお届けします（3〜5営業日が目安）。今後、PDFダウンロードにも順次対応予定です。",
  },
  {
    q: "個人情報はどのように管理されますか？",
    a: "ご入力いただいた情報は鑑定目的にのみ使用し、第三者への提供は一切行いません。詳しくはプライバシーポリシーをご確認ください。",
  },
  {
    q: "占いの内容は信頼できますか？",
    a: "占いはあくまでエンターテインメントとして提供しています。人生の重大な決断には、専門家（医師・弁護士・カウンセラー等）へのご相談をお勧めします。",
  },
];

// ---------------------------------------------------------------------------
// Shared style helpers
// ---------------------------------------------------------------------------

const containerStyle: CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "80px 24px" };

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const articles = getAllArticles()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
    .map((article) => ({
      title: article.title,
      category: article.category,
      publishedAt: article.date,
      excerpt: article.excerpt,
      thumbnail: article.thumbnail,
      seed: article.slug,
      href: `/articles/${article.slug}`,
    }));

  return (
    <>
      {/* 1. ヘッダー（ヒーロー） */}
      <Hero />

      <GarlandDivider />

      {/* 2. 鑑定メニュー */}
      <section style={{ background: "var(--bg-main)" }}>
        <ConstellationField density="sparse">
          <div style={containerStyle}>
            <SectionHeader
              eyebrow="Readings"
              title="鑑定メニュー"
              sub="西洋占星術・インド占星術・四柱推命を融合した独自メソッドで、あなたの魂が求める答えをリーディングします。"
            />
            <div
              className="resp-grid-3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}
            >
              {READINGS.map((reading) => (
                <ReadingCard key={reading.eyebrow} {...reading} />
              ))}
            </div>
          </div>
        </ConstellationField>
      </section>

      {/* 3. お客様の声（実際の声がある場合のみ表示） */}
      {TESTIMONIALS.length > 0 && (
        <section style={{ background: "var(--bg-cream-band)" }}>
          <div style={containerStyle}>
            <SectionHeader eyebrow="Voices" title="お客様の声" sub="鑑定を受けてくださった方からいただいた声をご紹介します。" />
            <div
              className="resp-grid-3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.headline}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: 20,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 20, color: "#D4C090", lineHeight: 1 }} aria-hidden="true">★★★★★</span>
                  <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: 16, color: "var(--text-primary)", margin: 0, lineHeight: 1.5 }}>
                    {t.headline}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.85, margin: 0, flex: "1 1 auto" }}>
                    {t.body}
                  </p>
                  <p style={{ fontSize: 12.5, color: "#9B8BBF", margin: 0, fontWeight: 600 }}>{t.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ padding: "0 24px" }}>
        <OrnamentDivider />
      </div>

      {/* 4. Litwill Garden が選ばれる理由 */}
      <section style={{ background: "var(--bg-main)" }}>
        <ConstellationField density="sparse">
          <div style={containerStyle}>
            <SectionHeader eyebrow="Why Litwill Garden" title="Litwill Garden が選ばれる理由" sub="占い×心理学で、自分を少し好きになるお手伝いをします。" />
            <div
              className="resp-grid-2"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 40 }}
            >
              {REASONS.map((r) => (
                <div
                  key={r.title}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: 20,
                    padding: 28,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }} aria-hidden="true">
                    {r.icon}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: 17, color: "var(--text-primary)", margin: "2px 0 8px" }}>
                      {r.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ConstellationField>
      </section>

      {/* 5. 鑑定までの流れ */}
      <section style={{ background: "var(--bg-cream-band)" }}>
        <div style={containerStyle}>
          <SectionHeader eyebrow="Flow" title="鑑定までの流れ" sub="お申し込みから結果のお届けまで、4つのステップで完結します。" />
          <div
            className="resp-grid-4"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}
          >
            {STEPS.map((s) => (
              <div
                key={s.no}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 20,
                  padding: 24,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span style={{ fontFamily: "var(--lg-font-display)", fontSize: 28, fontWeight: 700, color: "#9B8BBF" }}>{s.no}</span>
                <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: 16, color: "var(--text-primary)", margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 料金プラン */}
      <section style={{ background: "var(--bg-main)" }}>
        <ConstellationField density="sparse">
          <div style={containerStyle}>
            <SectionHeader eyebrow="Pricing" title="料金プラン" sub="すべて税込価格です。気になるメニューからお気軽にどうぞ。" />
            <div
              className="resp-grid-3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}
            >
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  style={{
                    background: "var(--bg-card)",
                    border: p.gold ? "1px solid rgba(212,192,144,0.4)" : "1px solid var(--border-card)",
                    borderRadius: 20,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <h3 style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: 17, color: "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>{p.name}</h3>
                  <p style={{ fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: 26, color: p.gold ? "#D4C090" : "var(--text-primary)", margin: 0 }}>{p.price}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, flex: "1 1 auto" }}>
                    {p.points.map((pt) => (
                      <li key={pt} style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, display: "flex", gap: 8 }}>
                        <span style={{ color: "#9B8BBF", flexShrink: 0 }} aria-hidden="true">✦</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.gold ? "gold" : "primary"} size="md" href={p.href} fullWidth>
                    申し込む
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ConstellationField>
      </section>

      {/* 7. よくあるご質問 */}
      <section style={{ background: "var(--bg-cream-band)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px" }}>
          <SectionHeader eyebrow="FAQ" title="よくあるご質問" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40 }}>
            {FAQS.map((f) => (
              <details
                key={f.q}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 16,
                  padding: "18px 22px",
                }}
              >
                <summary
                  style={{
                    fontFamily: "var(--lg-font-heading)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  Q. {f.q}
                </summary>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, margin: "14px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/faq" style={{ color: "#9B8BBF", fontSize: 14, textDecoration: "none" }}>
              すべての質問を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. 占いコラム（最新3件） */}
      <section style={{ background: "var(--bg-main)" }}>
        <ConstellationField density="sparse">
          <div style={containerStyle}>
            <SectionHeader eyebrow="Columns" title="占いコラム" sub="占星術・タロット・心理学の知恵で、日々をもっと豊かに。" />
            <div
              className="resp-grid-3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}
            >
              {articles.map((article, i) => (
                <ScrollReveal key={article.href} delay={(i % 3) as 0 | 1 | 2 | 3}>
                  <ArticleCard {...article} />
                </ScrollReveal>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link href="/articles" style={{ color: "#9B8BBF", fontSize: 14, textDecoration: "none" }}>
                すべてのコラムを見る →
              </Link>
            </div>
          </div>
        </ConstellationField>
      </section>
    </>
  );
}
