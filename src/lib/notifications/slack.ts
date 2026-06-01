/**
 * Slack通知ユーティリティ
 *
 * エラーハンドリング時のSlack通知を一元管理する。
 */

/**
 * SlackにWebhook経由でメッセージを送信する
 *
 * @param message - 送信するメッセージ
 * @param channel - チャンネル名（省略時はWebhookのデフォルト）
 */
export async function notifySlack(message: string, channel?: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[Slack] SLACK_WEBHOOK_URL is not set. Skipping notification.");
    return;
  }

  try {
    const payload: Record<string, string> = { text: message };
    if (channel) {
      payload.channel = channel;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[Slack] Failed to send notification: ${response.status}`);
    }
  } catch (error) {
    console.error("[Slack] Error sending notification:", error);
  }
}
