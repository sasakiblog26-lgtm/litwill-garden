"use client";

import { useState } from "react";
import Link from "next/link";

type ZodiacSign = {
  name: string;
  en: string;
  symbol: string;
  element: string;
  ruling: string;
  desc: string;
  traits: string[];
  love: string;
  work: string;
};

const zodiacSigns: ZodiacSign[] = [
  { name: "牡羊座", en: "Aries", symbol: "♈", element: "火", ruling: "火星", desc: "行動力と情熱にあふれた開拓者。果敢に挑戦し、周囲を引っ張るリーダー気質。", traits: ["情熱的", "行動力抜群", "正直でまっすぐ", "好奇心旺盛"], love: "情熱的に愛し、ストレートに気持ちを伝えるタイプ。", work: "新しいことを始める力に長けており、起業家やリーダー向き。" },
  { name: "牡牛座", en: "Taurus", symbol: "♉", element: "土", ruling: "金星", desc: "安定と美を愛する現実主義者。一度決めたことをやり遂げる粘り強さと、豊かな感性の持ち主。", traits: ["安定志向", "粘り強い", "美的センスが高い", "忠実で誠実"], love: "ゆっくりと深まる愛を大切にする。浮気せず、一途に愛し続ける。", work: "コツコツ努力する分野が得意。職人・料理・金融など実務的な仕事向き。" },
  { name: "双子座", en: "Gemini", symbol: "♊", element: "風", ruling: "水星", desc: "好奇心旺盛で多才なコミュニケーターです。変化を楽しみ、様々な分野に興味を持ちます。", traits: ["コミュニケーション上手", "多才で器用", "知的好奇心が強い", "フレキシブル"], love: "会話を通じて親密になるタイプ。刺激のある関係を好む。", work: "ライター・営業・広報など言葉を使う仕事で才能を発揮。" },
  { name: "蟹座", en: "Cancer", symbol: "♋", element: "水", ruling: "月", desc: "深い愛情と共感力を持つ「お母さん」的な存在。家族や仲間を大切にし、直感力が鋭い。", traits: ["感受性が豊か", "家族思い", "直感力が鋭い", "思いやりがある"], love: "深い絆を大切にする愛情深いタイプ。家庭的で守る愛を重視。", work: "人を癒す仕事・保育・カウンセリングなど心を扱う分野が向いている。" },
  { name: "獅子座", en: "Leo", symbol: "♌", element: "火", ruling: "太陽", desc: "生まれながらのスターで、人を魅了するカリスマ性と寛大な心の持ち主。舞台の中心が似合う。", traits: ["カリスマ性がある", "寛大で温かい", "自信に満ちている", "創造力が豊か"], love: "愛することを全力で楽しむ情熱家。ロマンチックで献身的。", work: "芸能・エンタメ・リーダー職など注目される場での活躍が得意。" },
  { name: "乙女座", en: "Virgo", symbol: "♍", element: "土", ruling: "水星", desc: "細部に気づく分析力と、誠実さが光る完璧主義者。誰かの役に立つことに喜びを感じる。", traits: ["分析力が高い", "几帳面で丁寧", "誠実で真面目", "献身的"], love: "静かで誠実な愛情表現。相手のことを細かく気にかける愛し方。", work: "医療・研究・編集・経理など細かい作業が得意な仕事で輝く。" },
  { name: "天秤座", en: "Libra", symbol: "♎", element: "風", ruling: "金星", desc: "美と調和を愛する社交家。公平な視点で物事を判断し、人間関係を滑らかにする才能がある。", traits: ["社交的で洗練されている", "公平な判断力", "美的センスが高い", "協調性がある"], love: "対等なパートナーシップを重視。ロマンチックで優雅な愛し方。", work: "デザイン・法律・外交・接客など人と関わり調和を生む仕事が向いている。" },
  { name: "蠍座", en: "Scorpio", symbol: "♏", element: "水", ruling: "冥王星", desc: "深い洞察力と情熱を持つ「変容の星座」。執念深いほどの集中力で、真実と本質を追い求める。", traits: ["洞察力が鋭い", "情熱的で深い", "意志が強い", "秘密主義的"], love: "全か無かの情熱的な愛。一度愛したら深く深く愛し続ける。", work: "心理・研究・探偵・医療など深層を探る仕事で才能を発揮。" },
  { name: "射手座", en: "Sagittarius", symbol: "♐", element: "火", ruling: "木星", desc: "自由と冒険を愛する哲学者。高い理想と楽観主義で、世界を旅しながら真理を追い求める。", traits: ["自由奔放", "楽観的", "哲学的な思考", "冒険好き"], love: "自由な関係を好むが、心が通じ合う深い絆も大切にする。", work: "旅行・教育・出版・宗教など広い視野が活きる仕事が向いている。" },
  { name: "山羊座", en: "Capricorn", symbol: "♑", element: "土", ruling: "土星", desc: "高い目標に向かって着実に歩む「登山家」。責任感と忍耐力で、長期的な成功を掴む。", traits: ["目標志向", "忍耐強い", "責任感が強い", "現実的"], love: "誠実で長続きする愛を求める。ゆっくりと信頼を築くタイプ。", work: "経営・政治・建設・医療など地道な努力が実る長期的な分野が向いている。" },
  { name: "水瓶座", en: "Aquarius", symbol: "♒", element: "風", ruling: "天王星", desc: "未来を見据えた独創的な革命家。人道主義的な視点で、社会をより良くしたいという強い意志がある。", traits: ["独創的", "人道主義的", "自由思想家", "友情を大切にする"], love: "友情から始まる知的なつながりを大切にする。自由と独立も尊重する。", work: "IT・科学・社会活動・発明など革新的なフィールドで輝く。" },
  { name: "魚座", en: "Pisces", symbol: "♓", element: "水", ruling: "海王星", desc: "豊かな想像力と深い共感力を持つ「夢想家」。霊的な感受性があり、芸術や癒しの世界で輝く。", traits: ["共感力が高い", "想像力が豊か", "霊的感受性がある", "優しく思いやりがある"], love: "相手と深く溶け合う夢のような愛を求める。無条件の愛を与える。", work: "アート・音楽・ヒーリング・映像など感性を活かす仕事が向いている。" },
];

function getSunSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10];
  return zodiacSigns[11];
}

const elementColors: Record<string, string> = {
  火: "#f97316",
  土: "#a3a37a",
  風: "#67e8f9",
  水: "#818cf8",
};

export default function ZodiacPage() {
  const [birthdate, setBirthdate] = useState("");
  const [sign, setSign] = useState<ZodiacSign | null>(null);

  const calculate = () => {
    if (!birthdate) return;
    setSign(getSunSign(new Date(birthdate)));
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(91, 33, 182, 0.15)",
    border: "1px solid rgba(167, 139, 250, 0.25)",
    borderRadius: "1rem",
    padding: "1.25rem",
  };

  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <Link href="/tools" className="text-purple-400 text-sm hover:text-purple-300">← ツール一覧</Link>
        </div>

        <div className="text-center mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ ZODIAC ✦</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">星座・月星座判定</h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            生年月日から太陽星座を判定します。
            <br />
            あなたの星座の特徴と傾向を確認しましょう。
          </p>
        </div>

        <div style={cardStyle} className="mb-8">
          <label className="text-purple-300 text-xs tracking-widest block mb-3">✦ 生年月日を入力</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            style={{
              background: "rgba(91,33,182,0.15)",
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: "0.75rem",
              color: "white",
              padding: "0.875rem 1rem",
              width: "100%",
              colorScheme: "dark",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          />
          <button
            onClick={calculate}
            disabled={!birthdate}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "9999px",
              background: birthdate ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "rgba(91,33,182,0.3)",
              color: birthdate ? "white" : "rgba(167,139,250,0.5)",
              fontWeight: "bold",
              border: "none",
              cursor: birthdate ? "pointer" : "not-allowed",
              fontSize: "1rem",
            }}
          >
            ✦ 星座を調べる ✦
          </button>
        </div>

        {sign && (
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(79,70,229,0.3))",
                border: "1px solid rgba(167,139,250,0.4)",
                borderRadius: "1.5rem",
                padding: "2rem",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              <p className="text-purple-300 text-xs tracking-widest mb-2">あなたの太陽星座</p>
              <p style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>{sign.symbol}</p>
              <h2 className="text-white text-2xl font-black mb-1">{sign.name}</h2>
              <p className="text-purple-300 text-sm mb-3">{sign.en}</p>
              <div className="flex justify-center gap-3">
                <span style={{ background: "rgba(109,40,217,0.3)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.25rem 0.875rem", color: "#c084fc", fontSize: "0.75rem" }}>
                  {sign.element}のエレメント
                </span>
                <span style={{ background: "rgba(109,40,217,0.3)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.25rem 0.875rem", color: "#c084fc", fontSize: "0.75rem" }}>
                  支配星: {sign.ruling}
                </span>
              </div>
            </div>

            <div style={cardStyle} className="mb-4">
              <p className="text-purple-100 text-sm leading-relaxed">{sign.desc}</p>
            </div>

            <div style={cardStyle} className="mb-4">
              <h3 className="text-purple-200 font-bold text-sm mb-3">✦ 性格の特徴</h3>
              <div className="flex flex-wrap gap-2">
                {sign.traits.map((t, i) => (
                  <span key={i} style={{ background: "rgba(109,40,217,0.25)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "9999px", padding: "0.3rem 0.875rem", color: "#e9d5ff", fontSize: "0.8rem" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div style={cardStyle}>
                <h3 className="text-purple-200 font-bold text-sm mb-2">💜 恋愛傾向</h3>
                <p className="text-purple-100 text-xs leading-relaxed">{sign.love}</p>
              </div>
              <div style={cardStyle}>
                <h3 className="text-purple-200 font-bold text-sm mb-2">🌿 仕事傾向</h3>
                <p className="text-purple-100 text-xs leading-relaxed">{sign.work}</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/fortune/reading">
                <button style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "0.875rem 2.5rem", borderRadius: "9999px", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
                  ✦ 詳しい運命鑑定を受ける ✦
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
