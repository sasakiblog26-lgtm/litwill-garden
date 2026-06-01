import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI・16性格タイプ解説",
  description: "MBTIの16タイプを一覧で解説。各タイプの強み・弱み・恋愛・仕事傾向がわかります。",
};

type MbtiType = {
  code: string;
  name: string;
  icon: string;
  group: string;
  desc: string;
  strengths: string[];
  love: string;
  work: string;
};

const groups = [
  {
    label: "分析家グループ",
    color: "rgba(99, 102, 241, 0.3)",
    borderColor: "rgba(129, 140, 248, 0.4)",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
  },
  {
    label: "外交官グループ",
    color: "rgba(134, 239, 172, 0.1)",
    borderColor: "rgba(134, 239, 172, 0.3)",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
  },
  {
    label: "番人グループ",
    color: "rgba(251, 191, 36, 0.1)",
    borderColor: "rgba(251, 191, 36, 0.3)",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  },
  {
    label: "探検家グループ",
    color: "rgba(249, 115, 22, 0.1)",
    borderColor: "rgba(249, 115, 22, 0.3)",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
  },
];

const mbtiTypes: MbtiType[] = [
  { code: "INTJ", name: "建築家", icon: "🏛️", group: "分析家", desc: "独立心が強く、長期的なビジョンを描く戦略家。知識への渇望と高い基準を持つ。", strengths: ["戦略的思考", "独立心", "高い基準", "決断力"], love: "真剣で深い関係を求める。浅い関係には興味がない。", work: "戦略・経営・研究・エンジニア" },
  { code: "INTP", name: "論理学者", icon: "🔬", group: "分析家", desc: "抽象的な概念と理論を愛する思索家。問題解決に独創的なアプローチを取る。", strengths: ["論理的思考", "創造的な問題解決", "客観性", "知識への探求"], love: "知的なつながりを重視。感情表現は苦手。", work: "研究・プログラミング・哲学・数学" },
  { code: "ENTJ", name: "指揮官", icon: "👑", group: "分析家", desc: "カリスマ的なリーダーで、目標達成のために人と組織を動かす力がある。", strengths: ["リーダーシップ", "戦略立案", "効率化", "目標達成力"], love: "対等なパートナーシップを求める。強い相手に惹かれる。", work: "経営・マネジメント・法律・コンサル" },
  { code: "ENTP", name: "討論者", icon: "⚡", group: "分析家", desc: "知的な議論と斬新なアイデアを愛する革新者。ルールや慣習に縛られない。", strengths: ["独創性", "知的好奇心", "議論力", "適応力"], love: "知的で刺激的な相手に惹かれる。ルーティンを嫌う。", work: "起業・弁護士・クリエイター・マーケター" },
  { code: "INFJ", name: "提唱者", icon: "🌿", group: "外交官", desc: "深い洞察力と理想主義を持つ稀な存在。他者の可能性を信じ、より良い世界を目指す。", strengths: ["深い洞察力", "共感力", "理想主義", "創造性"], love: "深い精神的つながりを求める。理想の愛を追い求める。", work: "カウンセラー・作家・聖職者・心理士" },
  { code: "INFP", name: "仲介者", icon: "🌸", group: "外交官", desc: "豊かな内面世界と強い個人的価値観を持つ夢想家。真の自己表現を求め続ける。", strengths: ["共感力", "理想主義", "創造性", "献身性"], love: "深く、真剣で感情的なつながりを求める。", work: "ライター・カウンセラー・アーティスト・教育者" },
  { code: "ENFJ", name: "主人公", icon: "🌟", group: "外交官", desc: "カリスマ的で感情移入が得意なリーダー。他者の成長を助けることに生きがいを感じる。", strengths: ["カリスマ性", "人を動かす力", "共感力", "組織力"], love: "深く情熱的な愛を与える。パートナーの成長を支えたい。", work: "教師・コーチ・政治家・プロデューサー" },
  { code: "ENFP", name: "広報活動家", icon: "✨", group: "外交官", desc: "情熱的で創造力あふれる自由な精神の持ち主。可能性を見出し、人を鼓舞する才能がある。", strengths: ["熱意と情熱", "人をつなぐ力", "創造性", "共感力"], love: "深い感情的つながりを求める。自由と個性を大切にする。", work: "ジャーナリスト・コンサルタント・起業家・俳優" },
  { code: "ISTJ", name: "管理者", icon: "📋", group: "番人", desc: "信頼性が高く、責任感の強い実践主義者。事実と具体性を重んじ、義務を全うする。", strengths: ["信頼性", "責任感", "忍耐力", "実務能力"], love: "誠実で安定した長期的な関係を大切にする。", work: "会計士・弁護士・管理職・軍人" },
  { code: "ISFJ", name: "擁護者", icon: "🛡️", group: "番人", desc: "温かく思いやりのある守護者。献身的に他者をサポートし、調和ある環境を作り出す。", strengths: ["献身性", "信頼性", "細部への注意", "温かさ"], love: "献身的で安定した愛情を与える。家庭を大切にする。", work: "看護師・教師・ソーシャルワーカー・管理職" },
  { code: "ESTJ", name: "幹部", icon: "⚙️", group: "番人", desc: "秩序と伝統を重んじる組織の柱。明確なルールと効率性を大切にするリーダー。", strengths: ["組織力", "実行力", "信頼性", "リーダーシップ"], love: "明確な役割分担と安定した関係を好む。", work: "管理職・教師・弁護士・軍人" },
  { code: "ESFJ", name: "領事", icon: "🤝", group: "番人", desc: "社交的で思いやりがあり、周囲の人の幸福に心を砕く「コミュニティの柱」。", strengths: ["社交性", "思いやり", "チームワーク", "実務能力"], love: "安定した調和のある関係を求める。相手をよく気にかける。", work: "医療・教育・接客・コミュニティサービス" },
  { code: "ISTP", name: "巨匠", icon: "🔧", group: "探検家", desc: "冷静で合理的な問題解決者。手を動かし、仕組みを理解することに喜びを見出す。", strengths: ["問題解決力", "冷静な分析", "実用的なスキル", "独立性"], love: "自由と独立を尊重される関係を好む。行動で愛を表現する。", work: "エンジニア・技術者・救急隊員・スポーツ選手" },
  { code: "ISFP", name: "冒険家", icon: "🎨", group: "探検家", desc: "豊かな感性と美的センスを持つ自由な芸術家。今この瞬間を大切に生きる。", strengths: ["芸術的センス", "共感力", "柔軟性", "観察力"], love: "感性が合い、自由を尊重してくれる相手と深まる。", work: "アーティスト・デザイナー・音楽家・動物看護師" },
  { code: "ESTP", name: "起業家", icon: "🚀", group: "探検家", desc: "エネルギッシュで知覚力が鋭いパフォーマー。リスクを楽しみ、行動で結果を出す。", strengths: ["行動力", "交渉力", "観察力", "適応力"], love: "情熱的で刺激的な関係を求める。退屈は大敵。", work: "起業家・セールス・スポーツ選手・警察官" },
  { code: "ESFP", name: "エンターテイナー", icon: "🎭", group: "探検家", desc: "楽観的で自発的なスポットライトを愛する存在。周囲に喜びとエンターテインメントをもたらす。", strengths: ["社交性", "楽観主義", "実用的なスキル", "人を楽しませる力"], love: "楽しく情熱的な関係を好む。感情を豊かに表現する。", work: "エンターテイナー・教師・接客・イベントプランナー" },
];

export default function MbtiPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-3">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>

        <div className="text-center mb-14">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ MBTI ✦</p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">MBTI・16性格タイプ解説</h1>
          <p className="text-purple-200 text-sm max-w-xl mx-auto leading-relaxed">
            16の性格タイプの特徴・強み・恋愛・仕事傾向を一覧で解説します。
            <br />
            あなたのタイプを探してみましょう。
          </p>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.label}>
              <h2
                style={{ color: "#c084fc", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}
              >
                ✦ {group.label}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.types.map((code) => {
                  const type = mbtiTypes.find((t) => t.code === code)!;
                  return (
                    <div
                      key={code}
                      style={{
                        background: group.color,
                        border: `1px solid ${group.borderColor}`,
                        borderRadius: "1rem",
                        padding: "1.25rem",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <p className="text-white font-black text-lg leading-none">{type.code}</p>
                          <p className="text-purple-300 text-xs">{type.name}</p>
                        </div>
                      </div>
                      <p className="text-purple-100 text-xs leading-relaxed mb-3">{type.desc}</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-purple-400 text-xs font-bold mb-1">💜 恋愛</p>
                          <p className="text-purple-200 text-xs leading-relaxed">{type.love}</p>
                        </div>
                        <div>
                          <p className="text-purple-400 text-xs font-bold mb-1">🌿 向いている仕事</p>
                          <p className="text-purple-200 text-xs leading-relaxed">{type.work}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/fortune/reading">
            <button
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                padding: "0.875rem 2.5rem",
                borderRadius: "9999px",
                color: "white",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              ✦ 詳しい運命鑑定を受ける ✦
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
