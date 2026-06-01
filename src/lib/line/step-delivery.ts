/**
 * LINEステップ配信シナリオ
 *
 * セグメント別のステップ配信シナリオを管理する。
 * 全配信に特商法解除導線を含める。
 */

import type { LineSegment } from "./segments";

/** ステップメッセージ */
export type StepMessage = {
  /** 配信日（登録日からの日数） */
  dayOffset: number;
  /** メッセージタイトル */
  title: string;
  /** メッセージ本文 */
  body: string;
  /** CTAリンク（任意） */
  ctaUrl?: string;
  /** CTAラベル（任意） */
  ctaLabel?: string;
  /** 対象セグメント（nullは全セグメント共通） */
  segment: LineSegment | null;
};

/** 特商法解除導線フッター */
const tokushohoFooter = `
━━━━━━━━━━━━━
配信停止はこちら↓
{unsubscribe_url}
運営: Litwill Garden 編集部
特定商取引法に基づく表記:
https://litwill-garden.com/legal/tokushoho
━━━━━━━━━━━━━`;

/**
 * メッセージ本文に特商法解除導線を付与する
 */
export function appendTokushoho(body: string): string {
  return body + tokushohoFooter;
}

// ===== ウェルカムメッセージ（Day 0・全セグメント共通） =====

/** ウェルカムメッセージ */
export const welcomeMessage: StepMessage = {
  dayOffset: 0,
  title: "ようこそ！Litwill Garden へ",
  body: `友だち追加ありがとうございます！🎮
Litwill Garden 編集部です。

Apex Legends™ で一緒に上手くなりましょう！

🎁 登録特典として
「Apex初心者スタートダッシュガイド（PDF）」
をプレゼントします！

📖 ガイドの内容：
✅ 最初にやるべき設定5つ（感度/視野角/キー配置/オーディオ/映像設定）
✅ 初心者おすすめキャラ3選
✅ 射撃訓練場での15分練習メニュー
✅ 初心者がやりがちなNG行動5つ
✅ プロが使う感度設定一覧表

以下のリンクからダウンロードしてください↓`,
  ctaUrl: "https://litwill-garden.com/guides/starter-pdf",
  ctaLabel: "無料PDFをダウンロードする",
  segment: null,
};

/** ランクセグメント質問メッセージ */
export const segmentQuestionMessage: StepMessage = {
  dayOffset: 0,
  title: "あなたのランクを教えてください",
  body: `あなたに合った攻略情報をお届けするために、
現在のランクを教えてください！

以下のボタンからお選びください↓`,
  segment: null,
};

// ===== 初心者セグメント（ルーキー〜ブロンズ） =====

/** 初心者向けステップメッセージ */
export const beginnerSteps: StepMessage[] = [
  {
    dayOffset: 1,
    title: "エイムが当たらない原因と5分でできる改善法",
    body: `エイムが当たらないのは「感度」と「練習方法」が原因かも。

まずはこの3つを試してみて：
1️⃣ 感度を少し下げる（目安: 400DPI × 2.0）
2️⃣ 射撃訓練場で5分だけターゲット追従
3️⃣ ADS感度をヒップファイアの0.7倍に

▼ 詳しいエイム練習法はこちら
https://litwill-garden.com/guides/aim-training`,
    ctaUrl: "https://litwill-garden.com/guides/aim-training",
    ctaLabel: "エイム練習法を読む",
    segment: "beginner",
  },
  {
    dayOffset: 2,
    title: "初心者が最初に覚えるべき立ち回り3原則",
    body: `立ち回りの基本、実は3つだけ覚えればOK：

🔹 原則1: 味方から離れすぎない（30m以内）
🔹 原則2: 射線（撃たれるライン）が通る場所に立たない
🔹 原則3: 逃げ道を確保してから戦う

これだけで「すぐ落とされる」が激減します。

▼ 立ち回りの基本をもっと詳しく
https://litwill-garden.com/guides/positioning-basics`,
    ctaUrl: "https://litwill-garden.com/guides/positioning-basics",
    ctaLabel: "立ち回りガイドを読む",
    segment: "beginner",
  },
  {
    dayOffset: 3,
    title: "武器選びの基本（まずはこの3武器だけ使え）",
    body: `初心者が最初に使うべき武器はこの3つ：

🔫 R-301: 最も扱いやすいAR。リコイルが素直。
🔫 R-99: 近距離最強SMG。マガジン拡張必須。
🔫 ボルトSMG: R-99が苦手ならこっち。反動がマイルド。

まずはR-301+サブ武器の構成で練習しよう！

▼ 初心者向け武器ガイド
https://litwill-garden.com/weapons`,
    ctaUrl: "https://litwill-garden.com/weapons",
    ctaLabel: "武器ガイドを読む",
    segment: "beginner",
  },
  {
    dayOffset: 5,
    title: "【有料note】Apex初心者→シルバー到達ガイド",
    body: `ブロンズからシルバーに上がるための
具体的なロードマップをまとめました。

📖 「Apex初心者→シルバー到達ガイド」（980円）

✅ ランクで勝つための立ち回り完全解説
✅ ブロンズ帯での最適なキャラ構成
✅ RP効率を最大化する戦い方
✅ 練習メニュー付き

すでに100人以上が購入して成果を出しています！`,
    ctaUrl: "https://note.com/litwill_garden/n/beginner-to-silver",
    ctaLabel: "noteで購入する（980円）",
    segment: "beginner",
  },
  {
    dayOffset: 7,
    title: "YouTube初心者向けプレイリスト",
    body: `動画で学ぶのが一番わかりやすい！

初心者向けの解説動画をプレイリストにまとめました。
実際のプレイ映像付きで、文字だけでは伝わらないポイントを解説しています。

▼ 初心者向けプレイリストはこちら
https://www.youtube.com/@litwill-garden`,
    ctaUrl: "https://www.youtube.com/@litwill-garden",
    ctaLabel: "YouTubeで動画を見る",
    segment: "beginner",
  },
  {
    dayOffset: 14,
    title: "【有料note】ランク攻略ロードマップ ブロンズ→ダイヤ",
    body: `2週間お疲れ様です！
上達は実感できていますか？

次のステップとして、ブロンズからダイヤまでの
完全ロードマップをご用意しました。

📖 「ランク攻略ロードマップ ブロンズ→ダイヤ」（2,980円）

✅ ランク帯別の最適な立ち回り
✅ RP計算と効率的な稼ぎ方
✅ キャラ・武器構成の段階的なステップアップ
✅ メンタル管理とティルト対策

本気で上達したい方におすすめです。`,
    ctaUrl: "https://note.com/litwill_garden/n/rank-roadmap",
    ctaLabel: "noteで購入する（2,980円）",
    segment: "beginner",
  },
];

// ===== シルバー〜ゴールドセグメント =====

/** シルバー〜ゴールド向けステップメッセージ */
export const intermediateSteps: StepMessage[] = [
  {
    dayOffset: 1,
    title: "ゴールド帯で停滞する3つの原因",
    body: `ゴールドで停滞する原因はほぼこの3つ：

❌ 1. 不利な撃ち合いを始めてしまう
❌ 2. 味方との連携が取れていない
❌ 3. ポジションの優先度がわかっていない

この3つを意識するだけでプラチナは見えてきます。

▼ 詳しい解説はこちら
https://litwill-garden.com/ranking`,
    ctaUrl: "https://litwill-garden.com/ranking",
    ctaLabel: "ランク攻略を読む",
    segment: "intermediate",
  },
  {
    dayOffset: 2,
    title: "中級者が意識すべき射線管理",
    body: `射線管理ができると生存率が劇的に上がります。

🔹 射線を切る: 遮蔽物を利用して被弾を最小化
🔹 射線を通す: 有利なポジションから一方的に撃てる角度を作る
🔹 クロスファイア: 味方と異なる角度から敵に射線を通す

意識するだけで「なぜか撃たれる」が激減。

▼ 射線管理の詳細ガイド
https://litwill-garden.com/guides/line-of-sight`,
    ctaUrl: "https://litwill-garden.com/guides/line-of-sight",
    ctaLabel: "射線管理ガイドを読む",
    segment: "intermediate",
  },
  {
    dayOffset: 3,
    title: "チームでの立ち回り（カバー、フォーカス、詰め引き）",
    body: `チーム戦の基本は3つ：

🔹 カバー: 味方が撃たれたら即座に援護
🔹 フォーカス: 1人の敵を3人で集中攻撃
🔹 詰め引き: ダメージ交換で有利なら詰める、不利なら引く

これらを「声に出して」プレイすると格段にチーム力が上がります。

▼ チーム立ち回りガイド
https://litwill-garden.com/guides/team-tactics`,
    ctaUrl: "https://litwill-garden.com/guides/team-tactics",
    ctaLabel: "チーム立ち回りガイドを読む",
    segment: "intermediate",
  },
  {
    dayOffset: 5,
    title: "【有料note】中級者向けキャラ別完全攻略",
    body: `キャラの使い方を深く理解すると、
ランクの伸びが加速します。

📖 「中級者向けキャラ別完全攻略」（980円）

✅ 各キャラのアビリティ活用テクニック
✅ キャラ別の最適な立ち回り
✅ 構成別の戦術ガイド
✅ プロの使い方を分析

あなたのメインキャラをもっと使いこなそう。`,
    ctaUrl: "https://note.com/litwill_garden/n/character-guide",
    ctaLabel: "noteで購入する（980円）",
    segment: "intermediate",
  },
  {
    dayOffset: 7,
    title: "YouTube中級者向けプレイリスト",
    body: `中級者向けの実践テクニックを動画で解説中！

VODレビューやキャラ攻略など、
テキストだけでは伝わらない細かい動きを映像で確認できます。

▼ 中級者向けプレイリスト
https://www.youtube.com/@litwill-garden`,
    ctaUrl: "https://www.youtube.com/@litwill-garden",
    ctaLabel: "YouTubeで動画を見る",
    segment: "intermediate",
  },
  {
    dayOffset: 14,
    title: "【有料note】VODレビューで学ぶ上達メソッド",
    body: `上手い人と自分のプレイ、
何が違うかわかりますか？

📖 「VODレビューで学ぶ上達メソッド」（4,980円）

✅ 自分の試合録画を分析する具体的な方法
✅ チェックすべきポイントリスト
✅ よくあるミスパターンと改善策
✅ プロのVODレビュー実例付き

自分のプレイを客観視できるようになると
上達スピードが一気に加速します。`,
    ctaUrl: "https://note.com/litwill_garden/n/vod-review-method",
    ctaLabel: "noteで購入する（4,980円）",
    segment: "intermediate",
  },
];

// ===== プラチナ以上セグメント =====

/** プラチナ以上向けステップメッセージ */
export const advancedSteps: StepMessage[] = [
  {
    dayOffset: 1,
    title: "ダイヤ帯以上で求められる判断力",
    body: `ダイヤ以上では、エイムだけでは勝てません。

必要なのは：
🔹 漁夫のタイミング判断
🔹 安地（リング）読みと先取り
🔹 リソース管理（弾薬・アビリティ・体力のバランス）

「正しい判断」が「正確なエイム」を上回る世界です。

▼ 上級者向けの判断力ガイド
https://litwill-garden.com/guides/decision-making`,
    ctaUrl: "https://litwill-garden.com/guides/decision-making",
    ctaLabel: "判断力ガイドを読む",
    segment: "advanced",
  },
  {
    dayOffset: 3,
    title: "プロの立ち回り分析",
    body: `プロの試合を見ると、
「なぜそこに立っているか」が全て計算されています。

Litwill Garden ではプロの立ち回りを
具体的にブレイクダウンして解説しています。

▼ プロ分析記事
https://litwill-garden.com/guides`,
    ctaUrl: "https://litwill-garden.com/guides",
    ctaLabel: "プロ分析記事を読む",
    segment: "advanced",
  },
  {
    dayOffset: 5,
    title: "【月額マガジン】メタ解説＆パッチノート分析",
    body: `上位ランクでは、メタの理解が勝率に直結します。

📖 月額マガジン「Apexメタレポート」（980円/月）

✅ パッチノートの詳細分析
✅ キャラ/武器ティアリスト更新
✅ 週間メタ解説
✅ プロシーンの動向分析

常に最新のメタを把握して、有利にランクを上げよう。`,
    ctaUrl: "https://note.com/litwill_garden/m/meta-report",
    ctaLabel: "月額マガジンを購読する（980円/月）",
    segment: "advanced",
  },
  {
    dayOffset: 7,
    title: "コーチングサービスのお知らせ",
    body: `さらに上を目指したい方へ。

今後、Litwill Garden では
マンツーマンのコーチングサービスを予定しています。

興味がある方は「コーチング希望」と
返信してください。

優先的にご案内します。`,
    segment: "advanced",
  },
];

// ===== 週次配信（全セグメント共通） =====

/** 週次配信テンプレート */
export const weeklyDeliveryTemplate: StepMessage = {
  dayOffset: -1, // 特殊: 毎週金曜配信を示す
  title: "今週のApexニュースまとめ",
  body: `📰 今週のApexニュースまとめ

{weekly_news_content}

━━━━━━━━━━━━━
📖 今週のおすすめ記事
{recommended_articles}

🎮 来週も一緒に上達しましょう！`,
  segment: null,
};

/** 週次配信スケジュール */
export const weeklySchedule = {
  dayOfWeek: 5, // 金曜日
  timeJst: "18:00",
} as const;

/**
 * 指定セグメントのステップメッセージ一覧を取得する
 *
 * @param segment - セグメントID
 * @returns ステップメッセージ配列（Day0共通メッセージ含む）
 */
export function getStepMessages(segment: LineSegment): StepMessage[] {
  const common = [welcomeMessage, segmentQuestionMessage];

  switch (segment) {
    case "beginner":
      return [...common, ...beginnerSteps];
    case "intermediate":
      return [...common, ...intermediateSteps];
    case "advanced":
      return [...common, ...advancedSteps];
    default:
      return common;
  }
}
