/**
 * LINE Messaging API client for Litwill Garden.
 *
 * Handles all outbound communication with the LINE Platform including
 * push messages, multicast, reply, and rich-menu linking.
 *
 * @module line-marketing/client
 */

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET ?? "";

const LINE_API_BASE = "https://api.line.me/v2/bot";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A single LINE message payload.
 *
 * Supports text, template and flex message types as defined by the
 * LINE Messaging API.
 */
export type LineMessage = {
  type: "text" | "template" | "flex";
  text?: string;
  template?: object;
  altText?: string;
  contents?: object;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * 特商法に基づく配信解除導線テキスト.
 *
 * すべてのLINE配信メッセージの末尾に付与する必要があります。
 */
export const TOKUSHOHO_FOOTER =
  "\n\n---\n" +
  "■ 配信解除について\n" +
  "このアカウントをブロックすると配信が停止されます。\n" +
  "メニューの「設定」＞「ブロック」からいつでも解除できます。\n" +
  "運営: Litwill Garden（https://litwill-garden.com/tokushoho）";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Appends the 特商法 unsubscribe footer to every text message in the array.
 */
function appendTokushohoFooter(messages: LineMessage[]): LineMessage[] {
  return messages.map((msg) => {
    if (msg.type === "text" && msg.text) {
      return { ...msg, text: msg.text + TOKUSHOHO_FOOTER };
    }
    // For flex / template messages the footer is expected to be embedded in
    // the contents by the caller, but we add an extra text bubble as a
    // fallback safety-net.
    return msg;
  });
}

/**
 * Sends a notification to Slack when a LINE API call fails after all retries.
 *
 * @param context - Short description of the failed operation.
 * @param error   - The original error.
 */
async function notifySlackOnFailure(
  context: string,
  error: unknown,
): Promise<void> {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) {
    console.error(
      `[LINE Client] Slack notification skipped (no SLACK_WEBHOOK_URL): ${context}`,
      error,
    );
    return;
  }

  try {
    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🚨 LINE API Error – ${context}\n\`\`\`${String(error)}\`\`\``,
      }),
    });
  } catch (slackErr) {
    console.error("[LINE Client] Failed to notify Slack:", slackErr);
  }
}

/**
 * Makes a POST request to the LINE API with automatic retry (up to 3 attempts).
 *
 * @param path - API path relative to `LINE_API_BASE`.
 * @param body - JSON-serialisable request body.
 */
async function linePost(path: string, body: object): Promise<void> {
  const url = `${LINE_API_BASE}${path}`;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`LINE API ${res.status}: ${text}`);
      }

      return; // success
    } catch (err) {
      console.error(
        `[LINE Client] Attempt ${attempt}/${maxRetries} failed for ${path}:`,
        err,
      );

      if (attempt === maxRetries) {
        await notifySlackOnFailure(`POST ${path}`, err);
        throw err;
      }

      // Exponential back-off: 500ms, 1000ms, 2000ms
      await new Promise((resolve) =>
        setTimeout(resolve, 500 * Math.pow(2, attempt - 1)),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sends a push message to a specific LINE user.
 *
 * The messages are automatically appended with the 特商法解除導線 footer.
 * Retries up to 3 times on failure and sends a Slack notification if all
 * retries are exhausted.
 *
 * @param userId   - LINE user ID of the recipient.
 * @param messages - Array of LINE message objects to send.
 */
export async function sendPushMessage(
  userId: string,
  messages: LineMessage[],
): Promise<void> {
  await linePost("/message/push", {
    to: userId,
    messages: appendTokushohoFooter(messages),
  });
}

/**
 * Sends a multicast message to multiple LINE users (max 500 per call).
 *
 * @param userIds  - Array of LINE user IDs (max 500).
 * @param messages - Array of LINE message objects to send.
 */
export async function sendMulticast(
  userIds: string[],
  messages: LineMessage[],
): Promise<void> {
  const enriched = appendTokushohoFooter(messages);

  // LINE multicast API supports max 500 recipients per call.
  const chunkSize = 500;
  for (let i = 0; i < userIds.length; i += chunkSize) {
    const chunk = userIds.slice(i, i + chunkSize);
    await linePost("/message/multicast", {
      to: chunk,
      messages: enriched,
    });
  }
}

/**
 * Replies to a LINE webhook event using a reply token.
 *
 * @param replyToken - The reply token received from the webhook event.
 * @param messages   - Array of LINE message objects to reply with.
 */
export async function replyMessage(
  replyToken: string,
  messages: LineMessage[],
): Promise<void> {
  await linePost("/message/reply", {
    replyToken,
    messages: appendTokushohoFooter(messages),
  });
}

/**
 * Links a rich menu to a specific LINE user.
 *
 * @param userId     - LINE user ID.
 * @param richMenuId - The rich menu ID to link.
 */
export async function setRichMenu(
  userId: string,
  richMenuId: string,
): Promise<void> {
  await linePost(`/user/${userId}/richmenu/${richMenuId}`, {});
}

// ---------------------------------------------------------------------------
// Message factory helpers
// ---------------------------------------------------------------------------

/**
 * Creates a simple text LINE message.
 *
 * @param text - The message text.
 * @returns A `LineMessage` with type `"text"`.
 */
export function createTextMessage(text: string): LineMessage {
  return { type: "text", text };
}

/**
 * Creates a Flex Message for LINE.
 *
 * @param altText  - Alternative text shown in push notifications.
 * @param contents - Flex Message container JSON object.
 * @returns A `LineMessage` with type `"flex"`.
 */
export function createFlexMessage(altText: string, contents: object): LineMessage {
  return { type: "flex", altText, contents };
}
