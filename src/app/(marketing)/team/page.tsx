import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "チーム紹介",
  description: `${brand.name} 編集部のチーム紹介。心理テスト・占い・運命鑑定メディアの運営チームをご紹介します。`,
};

export default function TeamPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ TEAM ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">チーム紹介</h1>
        </div>

        {/* About */}
        <div
          style={{
            background: "rgba(91,33,182,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h2 className="text-purple-200 font-bold mb-4">✦ {brand.name} について</h2>
          <div className="space-y-4 text-purple-100 text-sm leading-relaxed">
            <p>
              {brand.name} は、心理テスト・性格診断・占いを通じて、
              あなたが「本当の自分」に出会えるメディアです。
            </p>
            <p>
              数字（数秘術）・星（星座・月星座）・タロット・心理学の4つの視点から、
              あなたの内側に眠る可能性を照らし出します。
              自己理解を深め、恋愛・仕事・人生においてより自分らしく輝けるようサポートします。
            </p>
            <p>
              運営は <strong className="text-purple-200">{brand.operator}</strong> が担当しています。
              ご質問やフィードバックがございましたら、お気軽にお問い合わせください。
            </p>
          </div>
        </div>

        {/* Operator */}
        <div
          id="operator"
          style={{
            background: "rgba(91,33,182,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h2 className="text-purple-200 font-bold mb-6">✦ 運営者情報</h2>
          <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
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
              <h3 className="text-white font-black text-lg mb-1">{brand.owner.name}</h3>
              <p className="text-purple-300 text-sm mb-3">{brand.owner.role}</p>
              <div className="space-y-2 text-purple-100 text-sm leading-relaxed">
                <p>
                  {brand.name} の企画・運営を統括しています。
                  Webメディアの立ち上げからコンテンツ制作、SEO戦略までトータルにプロデュースしています。
                </p>
                <p>
                  心理学・スピリチュアル・自己啓発の分野に深い関心を持ち、
                  「自己理解が人生を豊かにする」という信念のもとサービスを運営しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial policy */}
        <div
          style={{
            background: "rgba(91,33,182,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}
        >
          <h2 className="text-purple-200 font-bold mb-5">✦ 編集方針</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "心理学ベースの分析", desc: "感覚的なアドバイスではなく、心理学の知見をベースに分析します。" },
              { label: "温かく寄り添う言葉", desc: "読者が自分を責めるのではなく、自分を好きになれる表現を心がけます。" },
              { label: "エンタメとして明示", desc: "占い・スピリチュアル系コンテンツはエンターテインメントとして明記します。" },
              { label: "継続的なアップデート", desc: "コンテンツを定期的に見直し、最新の知見を反映します。" },
            ].map((policy, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(109,40,217,0.15)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                }}
              >
                <h3 className="text-purple-200 font-bold text-sm mb-2">{policy.label}</h3>
                <p className="text-purple-300 text-xs leading-relaxed">{policy.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
