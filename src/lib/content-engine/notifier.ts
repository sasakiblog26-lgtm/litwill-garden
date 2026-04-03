/**
 * Slack 通知ヘルパー
 *
 * エラー発生時やステータス変更時に Slack Webhook へ通知を送信する。
 */

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Slack の Incoming Webhook に通知メッセージを送信する
 *
 * 環境変数 `SLACK_WEBHOOK_URL` が設定されていない場合は、
 * コンソールに警告を出力してスキップする。
 *
 * @param message - 送信するメッセージテキスト
 * @throws Webhook リクエストが失敗した場合にエラーをスローする
 */
export async function notifySlack(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[notifySlack] SLACK_WEBHOOK_URL が設定されていません。通知をスキップします。",
    );
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: message,
      username: "LITWILL GARDEN Bot",
      icon_emoji: ":video_game:",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Slack 通知の送信に失敗しました: ${response.status} ${response.statusText}`,
    );
  }
}
