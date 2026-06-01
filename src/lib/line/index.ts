/**
 * LINE公式連携モジュール
 *
 * リッチメニュー・ステップ配信・セグメント管理・Webhook処理。
 */

export { defaultRichMenu, createRichMenu } from "./rich-menu";
export type { RichMenuConfig, RichMenuItem } from "./rich-menu";
export { segments, rankSegmentQuestion, determineSegment } from "./segments";
export type { LineSegment, SegmentDefinition } from "./segments";
export {
  welcomeMessage,
  segmentQuestionMessage,
  beginnerSteps,
  intermediateSteps,
  advancedSteps,
  weeklyDeliveryTemplate,
  weeklySchedule,
  getStepMessages,
  appendTokushoho,
} from "./step-delivery";
export type { StepMessage } from "./step-delivery";
export {
  pushMessage,
  sendStepMessage,
  multicastMessage,
  broadcastWeeklyNews,
  sendSegmentQuestion,
} from "./messaging";
export { verifySignature, handleWebhookEvent } from "./webhook";
export type { LineWebhookEvent, LineWebhookBody } from "./webhook";
