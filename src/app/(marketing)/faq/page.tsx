import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）",
  description: "Litwill Gardenの心理テスト・運命鑑定・占いサービスに関するよくある質問をまとめています。",
};

const faqs = [
  {
    category: "鑑定・診断について",
    items: [
      {
        q: "鑑定レポートはどのくらいの精度ですか？",
        a: "数秘術・星座・タロットの3つの視点を組み合わせ、できる限り多角的に分析しています。ただし、スピリチュアル系コンテンツはエンターテインメントとしての側面もあります。参考として楽しんでいただき、最終的な判断はご自身でお願いします。",
      },
      {
        q: "出生時刻がわからない場合でも鑑定できますか？",
        a: "はい、出生時刻がわからなくても鑑定は可能です。出生時刻がわかる場合はより精度が上がりますが、生年月日と出生地だけでも十分な鑑定ができます。",
      },
      {
        q: "無料ツールと有料鑑定の違いは何ですか？",
        a: "無料ツール（数秘術計算機・星座判定・相性診断）は基本的な分析をご提供します。有料の運命鑑定レポートでは、より詳細な本質分析・恋愛・仕事・金運・人生フェーズなど8つ以上の視点から徹底的に読み解きます。",
      },
      {
        q: "鑑定結果はどのような形式で受け取れますか？",
        a: "現在はWebページ上でご確認いただけます。今後、PDFダウンロード機能も順次対応予定です。",
      },
    ],
  },
  {
    category: "お支払い・ご利用について",
    items: [
      {
        q: "無料で使えるコンテンツはありますか？",
        a: "はい、数秘術計算機・星座判定・相性診断ツール・MBTI解説・サンプル鑑定はすべて無料でご利用いただけます。",
      },
      {
        q: "個人情報はどのように管理されますか？",
        a: "入力いただいた生年月日等の情報は、鑑定目的にのみ使用します。第三者への提供は一切行いません。詳しくはプライバシーポリシーをご確認ください。",
      },
      {
        q: "スマートフォンからも利用できますか？",
        a: "はい、スマートフォン・タブレット・PCすべてに対応しています。",
      },
    ],
  },
  {
    category: "コンテンツ・記事について",
    items: [
      {
        q: "心理テストの記事はどのように作られていますか？",
        a: "心理学の研究や理論をベースに、わかりやすく解説しています。ただし、すべての内容が学術的に証明されたものではない場合もありますので、参考情報としてお読みください。",
      },
      {
        q: "占いコンテンツは信頼できますか？",
        a: "占いはあくまでエンターテインメントとして提供しています。人生の重大な決断には、専門家（医師・弁護士・カウンセラー等）へのご相談をお勧めします。",
      },
      {
        q: "記事のリクエストはできますか？",
        a: "はい、お問い合わせフォームからご希望のテーマをお送りください。すべてのリクエストにお応えできるわけではありませんが、参考にさせていただきます。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ FAQ ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">よくある質問</h1>
          <p className="text-purple-200 text-sm">サービスに関するよくある質問をまとめています。</p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-purple-300 text-xs tracking-[0.3em] uppercase mb-5">✦ {section.category}</h2>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(91, 33, 182, 0.12)",
                      border: "1px solid rgba(167, 139, 250, 0.2)",
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(167,139,250,0.15)" }}>
                      <p className="text-white font-bold text-sm flex items-start gap-3">
                        <span
                          style={{
                            background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                            borderRadius: "9999px",
                            width: "1.5rem",
                            height: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: "900",
                            flexShrink: 0,
                            marginTop: "0.05rem",
                          }}
                        >
                          Q
                        </span>
                        {item.q}
                      </p>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <p className="text-purple-100 text-sm leading-relaxed flex items-start gap-3">
                        <span
                          style={{
                            background: "rgba(109,40,217,0.3)",
                            border: "1px solid rgba(167,139,250,0.3)",
                            borderRadius: "9999px",
                            width: "1.5rem",
                            height: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: "900",
                            color: "#c084fc",
                            flexShrink: 0,
                            marginTop: "0.05rem",
                          }}
                        >
                          A
                        </span>
                        {item.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(91,33,182,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          <p className="text-purple-200 text-sm mb-4">
            解決しない場合は、お気軽にお問い合わせください。
          </p>
          <a
            href="/contact"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
              display: "inline-block",
            }}
          >
            お問い合わせはこちら
          </a>
        </div>
      </div>
    </div>
  );
}
