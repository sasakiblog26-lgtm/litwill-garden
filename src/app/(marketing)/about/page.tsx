import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "運営者・サービス紹介 | About",
  description: "Litwill Gardenのサービス概要と運営者情報。心理テスト・占い・運命鑑定を通じて自分らしく生きるためのメディア。",
};

const values = [
  {
    icon: "🤖",
    title: "AIで4つの視点を統合する",
    desc: "西洋占星術・インド占星術・四柱推命・心理学を、AIがひとつの人物像へ統合。複数の視点が一致する「核」と、状況で出る「多面性」を、勘や霊感に頼らず毎回ブレない一貫性で読み解きます。AIの活用は隠さず、誠実にお伝えします。",
  },
  {
    icon: "💜",
    title: "温かく寄り添うコンテンツ",
    desc: "「正解を押しつけない」ことを大切にしています。読んで自分を責めるのではなく、自分をもっと好きになれるコンテンツを目指します。",
  },
  {
    icon: "✨",
    title: "楽しみながら深く知る",
    desc: "難しい心理学もエンタメとして気軽に楽しめるように工夫しています。スクロールするたびに新しい発見がある体験を大切にします。",
  },
  {
    icon: "🌿",
    title: "自分らしい人生への道しるべ",
    desc: "テストや占いを通じて、自分の価値観・強み・使命を発見し、より豊かで自分らしい生き方へのヒントを届けます。",
  },
];

export default function AboutPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ ABOUT ✦</p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
            自分を知ることが、
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              人生を変える
            </span>
          </h1>
          <p className="text-purple-200 leading-relaxed max-w-2xl mx-auto">
            {brand.name} は、心理テスト・性格診断・占いを通じて、
            あなたが「本当の自分」に出会えるメディアです。
            <br />
            西洋占星術・インド占星術・四柱推命・心理学 — その4つの視点を
            <strong>AIがひとつの人物像へ統合</strong>し、あなたの内側に眠る可能性を照らし出します。
            AIを活用していることを、私たちは隠しません。
          </p>
        </div>

        {/* Mission */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.2), rgba(79,70,229,0.2))",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: "1.5rem",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <p className="text-purple-300 text-xs tracking-widest mb-3">✦ MISSION ✦</p>
          <p className="text-white text-xl md:text-2xl font-black leading-relaxed">
            「自分を知ること」で、
            <br />
            すべての人が自分らしく輝ける世界へ
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <p className="text-purple-300 text-xs tracking-[0.3em] uppercase text-center mb-8">✦ VALUES ✦</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(91,33,182,0.12)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="text-white font-bold text-sm mb-2">{v.title}</h3>
                <p className="text-purple-200 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Operator */}
        <div
          style={{
            background: "rgba(91,33,182,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <p className="text-purple-300 text-xs tracking-widest mb-6">✦ OPERATOR ✦</p>
          <div className="flex items-start gap-5">
            <div
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, rgba(109,40,217,0.4), rgba(79,70,229,0.4))",
                border: "1px solid rgba(167,139,250,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "900",
                  background: "linear-gradient(135deg, #c084fc, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {brand.owner.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-1">{brand.owner.name}</h3>
              <p className="text-purple-300 text-sm mb-4">{brand.owner.role} / {brand.name}</p>
              <div className="space-y-2 text-purple-200 text-sm leading-relaxed">
                <p>
                  Webメディアの企画・制作・マーケティングを手がけるプロデューサー。
                  心理学・スピリチュアル・自己啓発の分野に深い関心を持ち、
                  「自己理解が人生を豊かにする」という信念のもと {brand.name} を立ち上げました。
                </p>
                <p>
                  「難しいことをわかりやすく、楽しく伝える」ことをモットーに、
                  誰もが自分を深く知れるコンテンツを日々制作しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Site info */}
        <div
          style={{
            background: "rgba(91,33,182,0.1)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <h3 className="text-purple-200 font-bold text-sm mb-4">サイト情報</h3>
          <div className="space-y-2 text-sm">
            {[
              ["サイト名", brand.name],
              ["運営者", brand.operator],
              ["ドメイン", brand.domain],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="text-purple-400 w-20 flex-shrink-0">{label}</span>
                <span className="text-purple-100">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/fortune/reading">
            <button
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                padding: "1rem 3rem",
                borderRadius: "9999px",
                color: "white",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ✦ 鑑定を受ける ✦
            </button>
          </Link>
          <p className="text-purple-400 text-xs mt-4">
            <Link href="/contact" className="hover:text-purple-300 underline">お問い合わせ</Link>
            　|
            <Link href="/legal/privacy" className="hover:text-purple-300 underline">プライバシーポリシー</Link>
            　|
            <Link href="/legal/terms" className="hover:text-purple-300 underline">利用規約</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
