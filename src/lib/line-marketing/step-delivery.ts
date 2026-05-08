/**
 * LINE step delivery (ステップ配信) for Litwill Garden.
 *
 * Manages automated drip sequences that send targeted Apex Legends
 * content to subscribers over multiple days based on their segment.
 *
 * @module line-marketing/step-delivery
 */

import { eq, and, lte, isNull } from "drizzle-orm";

import { lineSubscribers } from "@/lib/db/schema";
import { sendPushMessage, createTextMessage, createFlexMessage } from "./client";
import type { Segment, Subscriber } from "./segments";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single message in a step delivery sequence. */
export type StepMessage = {
  step: number;
  segment: Segment;
  subject: string;
  body: string;
  ctaUrl?: string;
  ctaLabel?: string;
};

/** A named step delivery scenario containing ordered messages. */
export type StepScenario = {
  name: string;
  segment: Segment;
  messages: StepMessage[];
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * PDF lead-magnet content outline.
 *
 * Used as a teaser in step 0 to promote the free guide download.
 */
export const PDF_CONTENT_OUTLINE = {
  title: "【無料】ランクアップ完全ガイド PDF",
  sections: [
    "第1章: 設定の最適化（感度・キー配置・映像設定）",
    "第2章: 立ち回りの基本原則",
    "第3章: エイム練習ロードマップ",
    "第4章: キャラ選びのフレームワーク",
    "第5章: ランクマッチの勝率を上げる5つの習慣",
  ],
} as const;

/**
 * Pre-defined step delivery scenarios per segment.
 *
 * Each scenario contains 5 messages delivered on consecutive days.
 */
export const STEP_SCENARIOS: StepScenario[] = [
  {
    name: "beginner-onboarding",
    segment: "beginner",
    messages: [
      {
        step: 0,
        segment: "beginner",
        subject: "ようこそ！まずはこの設定から",
        body: "Apex Legendsを最大限楽しむために、まず最初にやるべき設定を解説します。\n\n詳しくはこちら👇",
        ctaUrl: "https://litwill-garden.com/guides/beginner-settings",
        ctaLabel: "設定ガイドを読む",
      },
      {
        step: 1,
        segment: "beginner",
        subject: "初心者が最初に使うべきキャラ3選",
        body: "最初のキャラ選びで迷っていませんか？初心者におすすめのキャラクターを紹介します。",
        ctaUrl: "https://litwill-garden.com/characters",
        ctaLabel: "キャラ一覧を見る",
      },
      {
        step: 2,
        segment: "beginner",
        subject: "エイム練習を始めよう",
        body: "毎日15分の練習で確実に上達します。おすすめの練習メニューを紹介！",
        ctaUrl: "https://litwill-garden.com/guides/aim-training",
        ctaLabel: "練習ガイドを読む",
      },
      {
        step: 3,
        segment: "beginner",
        subject: "立ち回りの基本を覚えよう",
        body: "撃ち合い以前に、ポジション取りで勝負は決まります。基本の立ち回りを解説。",
        ctaUrl: "https://litwill-garden.com/guides/positioning",
        ctaLabel: "立ち回りガイドを読む",
      },
      {
        step: 4,
        segment: "beginner",
        subject: "無料PDFガイドをプレゼント！",
        body: `ここまで読んでくれたあなたに、ランクアップ完全ガイドPDFを無料プレゼント！\n\n【収録内容】\n${PDF_CONTENT_OUTLINE.sections.map((s) => `・${s}`).join("\n")}`,
        ctaUrl: "https://litwill-garden.com/guides/pdf-download",
        ctaLabel: "無料ダウンロード",
      },
    ],
  },
  {
    name: "silver-gold-rankup",
    segment: "silver-gold",
    messages: [
      {
        step: 0,
        segment: "silver-gold",
        subject: "ゴールド突破のカギは「判断速度」",
        body: "シルバー〜ゴールド帯で伸び悩む最大の原因と、その解決法を解説します。",
        ctaUrl: "https://litwill-garden.com/guides/gold-breakthrough",
        ctaLabel: "攻略記事を読む",
      },
      {
        step: 1,
        segment: "silver-gold",
        subject: "中距離戦を制する武器選び",
        body: "ゴールド帯以上で必須となる中距離戦の武器選びと立ち回りを解説。",
        ctaUrl: "https://litwill-garden.com/weapons",
        ctaLabel: "武器ランキングを見る",
      },
      {
        step: 2,
        segment: "silver-gold",
        subject: "味方との連携を強化する3つのコツ",
        body: "野良ランクでもチームワークを発揮するためのコミュニケーション術。",
        ctaUrl: "https://litwill-garden.com/guides/teamwork",
        ctaLabel: "連携ガイドを読む",
      },
      {
        step: 3,
        segment: "silver-gold",
        subject: "今シーズンのメタを理解しよう",
        body: "最新シーズンの環境分析とおすすめ構成を紹介します。",
        ctaUrl: "https://litwill-garden.com/tier-list",
        ctaLabel: "ティアリストを見る",
      },
      {
        step: 4,
        segment: "silver-gold",
        subject: "プラチナを目指すあなたへ",
        body: "さらに上を目指すための有料コンテンツと、プロの設定集をご用意しています。",
        ctaUrl: "https://note.com/litwill_garden",
        ctaLabel: "有料コンテンツを見る",
      },
    ],
  },
  {
    name: "platinum-advanced",
    segment: "platinum-above",
    messages: [
      {
        step: 0,
        segment: "platinum-above",
        subject: "プラチナ以上の世界へようこそ",
        body: "上位帯で勝ち抜くために必要な知識と戦略をお届けします。",
        ctaUrl: "https://litwill-garden.com/guides/platinum-guide",
        ctaLabel: "上級ガイドを読む",
      },
      {
        step: 1,
        segment: "platinum-above",
        subject: "プロ選手の設定を徹底分析",
        body: "トッププレイヤーの感度・キー配置・映像設定を完全網羅。",
        ctaUrl: "https://litwill-garden.com/guides/pro-settings",
        ctaLabel: "プロ設定を見る",
      },
      {
        step: 2,
        segment: "platinum-above",
        subject: "終盤の立ち回り完全マニュアル",
        body: "ファイナルリング攻略、ポジション取りの極意を解説。",
        ctaUrl: "https://litwill-garden.com/guides/endgame",
        ctaLabel: "終盤攻略を読む",
      },
      {
        step: 3,
        segment: "platinum-above",
        subject: "VODレビューのやり方",
        body: "自分のプレイを振り返って改善するための具体的な手順を紹介。",
        ctaUrl: "https://litwill-garden.com/guides/vod-review",
        ctaLabel: "VODレビューガイド",
      },
      {
        step: 4,
        segment: "platinum-above",
        subject: "限定コミュニティのご案内",
        body: "上位帯プレイヤー向けの情報交換コミュニティをご用意しています。",
        ctaUrl: "https://note.com/litwill_garden",
        ctaLabel: "詳細を見る",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the next step message for a subscriber based on their segment and
 * current step number.
 *
 * @param segment - The subscriber's segment.
 * @param step    - The subscriber's current step (0-indexed).
 * @returns The next `StepMessage`, or `null` if the sequence is complete.
 */
export function getNextStepMessage(
  segment: Segment,
  step: number,
): StepMessage | null {
  const scenario = STEP_SCENARIOS.find((s) => s.segment === segment);
  if (!scenario) return null;

  return scenario.messages[step] ?? null;
}

/**
 * Executes step delivery for all eligible subscribers.
 *
 * Queries subscribers whose `nextDeliveryAt` is in the past, sends them
 * the appropriate step message, and advances their step counter.
 *
 * @param db - Drizzle ORM database instance.
 * @returns The number of messages successfully sent.
 */
export async function executeStepDelivery(db: any): Promise<number> {
  const now = new Date();
  const nextInterval = 24 * 60 * 60 * 1000; // 1 day
  let sentCount = 0;

  const subscribers: Subscriber[] = await db
    .select()
    .from(lineSubscribers)
    .where(
      and(
        lte(lineSubscribers.nextDeliveryAt, now),
        isNull(lineSubscribers.unsubscribedAt),
      ),
    );

  for (const sub of subscribers) {
    if (sub.segment == null || sub.step == null) continue;

    const message = getNextStepMessage(sub.segment as Segment, sub.step);
    if (!message) {
      // Sequence complete — clear next delivery
      await db
        .update(lineSubscribers)
        .set({ nextDeliveryAt: null })
        .where(eq(lineSubscribers.userId, sub.userId));
      continue;
    }

    const lineMessages = message.ctaUrl
      ? [
          createFlexMessage(message.subject, {
            type: "bubble",
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                { type: "text", text: message.subject, weight: "bold", size: "lg" },
                { type: "text", text: message.body, wrap: true, margin: "md" },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "uri",
                    label: message.ctaLabel ?? "詳しく見る",
                    uri: message.ctaUrl,
                  },
                  style: "primary",
                },
              ],
            },
          }),
        ]
      : [createTextMessage(`${message.subject}\n\n${message.body}`)];

    try {
      await sendPushMessage(sub.userId, lineMessages);
      await db
        .update(lineSubscribers)
        .set({
          step: sub.step + 1,
          nextDeliveryAt: new Date(now.getTime() + nextInterval),
        })
        .where(eq(lineSubscribers.userId, sub.userId));
      sentCount++;
    } catch (err) {
      console.error(
        `[StepDelivery] Failed to send step ${sub.step} to ${sub.userId}:`,
        err,
      );
    }
  }

  return sentCount;
}
