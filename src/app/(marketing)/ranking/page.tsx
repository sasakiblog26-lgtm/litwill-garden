import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { LineCta } from "@/components/cta/line-cta";

export const metadata: Metadata = createMetadata({
  title: "ランク攻略",
  description: "ランク別の立ち回りと上達のコツ",
  path: "/ranking",
});

const rankTiers = [
  {
    name: "ルーキー",
    color: "bg-[#71717A]",
    textColor: "text-[#A1A1AA]",
    borderColor: "border-[#71717A]/40",
    description: "Apex Legends を始めたばかりのプレイヤーが配置されるランク。",
    tips: [
      "まずは操作に慣れることが最優先。射撃訓練場で基本的なエイムと移動を練習しよう",
      "チームから離れすぎないこと。味方と一緒に行動するだけでも生存率が大幅にアップ",
      "デスボックスの漁り方や回復アイテムの使いどころを覚えよう",
    ],
  },
  {
    name: "ブロンズ",
    color: "bg-[#CD7F32]",
    textColor: "text-[#CD7F32]",
    borderColor: "border-[#CD7F32]/40",
    description: "基本操作を覚え、ゲームの流れを理解し始めた段階。",
    tips: [
      "安全なランドマークに降りて、まずは装備を揃えることを優先",
      "敵の足音を聞く習慣をつけよう。ヘッドセットの使用を強く推奨",
      "リングの動きを意識して、早めにポジションを確保する癖をつけよう",
    ],
  },
  {
    name: "シルバー",
    color: "bg-[#C0C0C0]",
    textColor: "text-[#C0C0C0]",
    borderColor: "border-[#C0C0C0]/40",
    description: "戦闘の基礎がついてきた段階。ここからエイム力の差が出始める。",
    tips: [
      "毎日15分のエイム練習を習慣化しよう。射撃訓練場でのリコイル練習が効果的",
      "遮蔽物を使った撃ち合い（カバーシューティング）を意識しよう",
      "ピンシステムを積極的に使って味方と情報共有する習慣をつけよう",
    ],
  },
  {
    name: "ゴールド",
    color: "bg-[#FFD700]",
    textColor: "text-[#FFD700]",
    borderColor: "border-[#FFD700]/40",
    description: "中級者の壁。ここを超えるには立ち回りの改善が必要。",
    tips: [
      "ポジショニングを最重視。高所を取る意識を常に持とう",
      "1v1で勝てる状況を作ってから撃ち合いに行くこと。不利な状況では引く判断も大事",
      "チームの構成を意識したキャラ選びを心がけよう",
    ],
  },
  {
    name: "プラチナ",
    color: "bg-[#22D3EE]",
    textColor: "text-[#22D3EE]",
    borderColor: "border-[#22D3EE]/40",
    description: "上位プレイヤーへの入口。戦略的な判断力が求められる。",
    tips: [
      "漁夫の利を意識しよう。戦闘音を聞いて介入タイミングを計る",
      "終盤のリング移動では、安全ルートを事前に計画しておく",
      "チーム全体の体力・アーマー状況を把握して、戦闘の判断を下そう",
    ],
  },
  {
    name: "ダイヤ",
    color: "bg-[#8B5CF6]",
    textColor: "text-[#8B5CF6]",
    borderColor: "border-[#8B5CF6]/40",
    description: "上位プレイヤーの証。マスターに近づくには個人技とチーム力の両方が必要。",
    tips: [
      "味方との連携を最重視。VCでの情報共有は必須レベル",
      "メタ構成を理解し、チームに合ったキャラクターを使いこなそう",
      "プロプレイヤーの動画を見て、ポジショニングと判断の基準を学ぼう",
    ],
  },
  {
    name: "マスター",
    color: "bg-[#A855F7]",
    textColor: "text-[#A855F7]",
    borderColor: "border-[#A855F7]/40",
    description: "トッププレイヤーの領域。常に高いレベルのプレイが求められる。",
    tips: [
      "マッチ全体のゲームフローを読む力が重要。残りチーム数と位置を常に把握",
      "3v3の撃ち合いだけでなく、クロスファイアやフランクの戦術を駆使しよう",
      "自分のプレイを録画して振り返り、細かなミスを修正しよう",
    ],
  },
  {
    name: "プレデター",
    color: "bg-[#EF4444]",
    textColor: "text-[#EF4444]",
    borderColor: "border-[#EF4444]/40",
    description: "サーバー上位750人のみが到達できる最高ランク。",
    tips: [
      "フルパーティでの連携が必須。チームとしての戦略を徹底的に練り上げよう",
      "メタの変化に即座に対応できるよう、複数キャラクターを高いレベルで使えるようにしよう",
      "体調管理やメンタルケアも重要。ティルトを防ぐ方法を見つけよう",
    ],
  },
];

export default function RankingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={[{ label: "ランク攻略" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          ランク攻略ガイド
        </h1>
        <p className="mt-3 text-text-muted">
          ルーキーからプレデターまで、各ランク帯の特徴と上達のコツを解説。
          あなたの現在のランクに合わせたアドバイスを確認しましょう。
        </p>
      </header>

      <div className="space-y-8">
        {rankTiers.map((rank) => (
          <section
            key={rank.name}
            className={`rounded-xl border ${rank.borderColor} bg-bg-card p-6`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`h-4 w-4 rounded-full ${rank.color}`}
              />
              <h2 className={`font-heading text-2xl font-black ${rank.textColor}`}>
                {rank.name}
              </h2>
            </div>
            <p className="mb-4 text-text-muted">{rank.description}</p>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-dim">
              上達のコツ
            </h3>
            <ul className="space-y-2">
              {rank.tips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-text-muted">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <LineCta />
      </div>
    </div>
  );
}
