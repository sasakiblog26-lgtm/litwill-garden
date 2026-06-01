/**
 * LINE Marketing integration barrel exports for Litwill Garden.
 *
 * Re-exports all public APIs from the LINE marketing sub-modules so
 * consumers can import from a single entry point:
 *
 * ```ts
 * import { sendPushMessage, STEP_SCENARIOS, handleWebhookEvent } from "@/lib/line-marketing";
 * ```
 *
 * @module line-marketing
 */

export {
  type LineMessage,
  TOKUSHOHO_FOOTER,
  sendPushMessage,
  sendMulticast,
  replyMessage,
  setRichMenu,
  createTextMessage,
  createFlexMessage,
} from "./client";

export {
  type RichMenuArea,
  type RichMenuPayload,
  RICH_MENU_CONFIG,
  createRichMenuPayload,
  registerRichMenu,
} from "./rich-menu";

export {
  type Segment,
  type Subscriber,
  SEGMENT_CONFIG,
  assignSegment,
  getSubscribersBySegment,
  createRankQuestionMessage,
} from "./segments";

export {
  type StepMessage,
  type StepScenario,
  STEP_SCENARIOS,
  PDF_CONTENT_OUTLINE,
  getNextStepMessage,
  executeStepDelivery,
} from "./step-delivery";

export {
  type WeeklyDigest,
  generateWeeklyDigest,
  sendWeeklyBroadcast,
} from "./weekly-broadcast";

export {
  type LineWebhookEvent,
  handleWebhookEvent,
  verifySignature,
} from "./webhook";
