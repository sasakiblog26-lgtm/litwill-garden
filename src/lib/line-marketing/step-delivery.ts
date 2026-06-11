/**
 * LINE step delivery (ステップ配信) for Litwill Garden.
 *
 * Manages automated drip sequences that send targeted content
 * to subscribers over multiple days based on their segment.
 *
 * @module line-marketing/step-delivery
 */

import { eq, and, lte, isNull } from "drizzle-orm";

import { lineSubscribers } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db";
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
 * Pre-defined step delivery scenarios per segment.
 *
 * Each scenario contains 5 messages delivered on consecutive days.
 * トーン: 温かみがあり専門性を感じさせる文体。
 */
export const STEP_SCENARIOS: StepScenario[] = [
  {
    name: "beginner-onboarding",
    segment: "beginner",
    messages: [
      {
        step: 0,
        segment: "beginner",
        subject: "ようこそ！まずは自分の星を知ることから",
        body: "占い・心理学の世界へようこそ。まず最初に、あなたの太陽星座と基本的な性質を知ってみましょう✨",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "記事を読む",
      },
      {
        step: 1,
        segment: "beginner",
        subject: "西洋占星術の基本とホロスコープの見方",
        body: "ホロスコープは12星座×12ハウスで成り立っています。まずは太陽・月・ASCの3つを押さえるだけで自己理解が深まります。",
        ctaUrl: "https://www.litwillgarden.com/tools",
        ctaLabel: "無料ツールを試す",
      },
      {
        step: 2,
        segment: "beginner",
        subject: "心理学から見る「気質」のパターン",
        body: "16タイプ性格診断（MBTI）は、自分の思考・感情パターンを知る入口です。まず自分のタイプを知ってみましょう。",
        ctaUrl: "https://www.litwillgarden.com/tools/16types",
        ctaLabel: "タイプを調べる",
      },
      {
        step: 3,
        segment: "beginner",
        subject: "占いを「当たる・外れる」だけで判断しないために",
        body: "占いの本質は予言ではなく、自分の傾向や選択肢を可視化するツールです。この視点が変わると、占いがぐっと深くなります。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "コラムを読む",
      },
      {
        step: 4,
        segment: "beginner",
        subject: "あなただけの鑑定で、もっと深く知る",
        body: "西洋占星術・インド占星術・四柱推命の3軸で、あなたの持ち味と人生のテーマを丁寧に読み解きます。",
        ctaUrl: "https://www.litwillgarden.com/readings",
        ctaLabel: "鑑定を詳しく見る",
      },
    ],
  },
  {
    name: "love-relationship",
    segment: "silver-gold",
    messages: [
      {
        step: 0,
        segment: "silver-gold",
        subject: "相性を知ることで、関係はもっと楽になる",
        body: "恋愛や人間関係の悩みの多くは「タイプの違い」への理解不足から生まれます。星と心理学の両面から、相性の本質に迫ります。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "記事を読む",
      },
      {
        step: 1,
        segment: "silver-gold",
        subject: "星座×月星座で「愛し方の癖」を知る",
        body: "恋愛パターンは太陽星座だけでは分かりません。月星座は「感情的な欲求」を示し、パートナーとのすれ違いの鍵を握っています。",
        ctaUrl: "https://www.litwillgarden.com/tools",
        ctaLabel: "ツールを試す",
      },
      {
        step: 2,
        segment: "silver-gold",
        subject: "なぜ同じパターンの恋愛を繰り返すのか",
        body: "繰り返される恋愛パターンには、心理学でいう「アタッチメントスタイル」が関係しています。自分のスタイルを知ることが変化の第一歩。",
        ctaUrl: "https://www.litwillgarden.com/diagnosis",
        ctaLabel: "診断を受ける",
      },
      {
        step: 3,
        segment: "silver-gold",
        subject: "相手の「愛情表現の言語」を知っていますか？",
        body: "愛情の伝え方には5つの言語があります（言葉・時間・贈り物・奉仕・スキンシップ）。すれ違いのほとんどは、この言語の違いから来ています。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "コラムを読む",
      },
      {
        step: 4,
        segment: "silver-gold",
        subject: "相性鑑定で、関係のテーマを読み解く",
        body: "二人のホロスコープを重ね合わせることで、この関係が持つ意味と課題が見えてきます。深く知りたい方は鑑定をどうぞ。",
        ctaUrl: "https://www.litwillgarden.com/readings",
        ctaLabel: "相性鑑定を見る",
      },
    ],
  },
  {
    name: "life-purpose",
    segment: "platinum-above",
    messages: [
      {
        step: 0,
        segment: "platinum-above",
        subject: "あなたが何度も引き寄せられるテーマは何ですか？",
        body: "人生のテーマは、繰り返し現れる経験や問いの中にあります。占星術ではノード軸、四柱推命では大運がそのヒントを与えてくれます。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "記事を読む",
      },
      {
        step: 1,
        segment: "platinum-above",
        subject: "インド占星術が示す「魂の方向性」",
        body: "インド占星術（ジョーティシュ）は、個人の魂の目的や前世からのカルマを読む体系です。西洋占星術とは異なる視点が、深い自己理解をもたらします。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "コラムを読む",
      },
      {
        step: 2,
        segment: "platinum-above",
        subject: "四柱推命と「天命」の読み方",
        body: "四柱推命は生年月日時の4柱から、その人の本質・才能・人生の流れを読みます。天命という概念は、あなたの強みとつながっています。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "コラムを読む",
      },
      {
        step: 3,
        segment: "platinum-above",
        subject: "ユング心理学と個性化のプロセス",
        body: "ユングの「個性化」とは、影（シャドウ）を統合しながら本来の自己へと成長していくプロセスです。占いはその地図になります。",
        ctaUrl: "https://www.litwillgarden.com/articles",
        ctaLabel: "コラムを読む",
      },
      {
        step: 4,
        segment: "platinum-above",
        subject: "3軸の鑑定で、人生の地図を手に入れる",
        body: "西洋占星術・インド占星術・四柱推命の3軸から読む鑑定は、あなたの魂の地図を描きます。人生のテーマを深く探りたい方へ。",
        ctaUrl: "https://www.litwillgarden.com/readings",
        ctaLabel: "鑑定を詳しく見る",
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
export async function executeStepDelivery(db: AppDb): Promise<number> {
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
