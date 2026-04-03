/**
 * TikTok posting module for Litwill Garden.
 *
 * Handles posting videos to TikTok via the TikTok API and
 * defines the daily posting schedule.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Data required to create a TikTok post */
export interface TikTokPostData {
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** Hashtags to include */
  hashtags: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * TikTok daily posting schedule (Japan Standard Time).
 *
 * 毎日1本、20:00 JST に投稿。
 */
export const POSTING_SCHEDULE = {
  time: "20:00",
  timezone: "Asia/Tokyo",
} as const;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Sends a Slack notification when a TikTok posting attempt fails.
 *
 * @param message - The error message to send to Slack
 */
async function notifySlackOnFailure(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[SNS] Slack webhook URL not configured. Error:", message);
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🚨 TikTok投稿エラー: ${message}`,
      }),
    });
  } catch (err) {
    console.error("[SNS] Failed to send Slack notification:", err);
  }
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Posts a video to TikTok via the TikTok Content Posting API.
 *
 * Uses `TIKTOK_ACCESS_TOKEN` environment variable for authentication.
 * Retries up to 3 times on failure with exponential backoff,
 * and sends a Slack notification if all attempts fail.
 *
 * @param videoUrl - Public URL of the video file to post
 * @param metadata - Post metadata including title, description, and hashtags
 * @returns The TikTok post ID
 * @throws Error if the TIKTOK_ACCESS_TOKEN is missing or all retry attempts fail
 */
export async function postToTikTok(
  videoUrl: string,
  metadata: TikTokPostData
): Promise<{ id: string }> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("TIKTOK_ACCESS_TOKEN is not configured in environment variables");
  }

  const hashtagStr = metadata.hashtags.join(" ");
  const fullDescription = `${metadata.description}\n\n${hashtagStr}`;

  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Step 1: Initialize video upload
      const initResponse = await fetch(
        "https://open.tiktokapis.com/v2/post/publish/video/init/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_info: {
              title: metadata.title,
              description: fullDescription,
              privacy_level: "PUBLIC_TO_EVERYONE",
              disable_duet: false,
              disable_stitch: false,
              disable_comment: false,
            },
            source_info: {
              source: "PULL_FROM_URL",
              video_url: videoUrl,
            },
          }),
        }
      );

      if (!initResponse.ok) {
        const errorBody = await initResponse.text();
        throw new Error(
          `TikTok API error (${initResponse.status}): ${errorBody}`
        );
      }

      const data = (await initResponse.json()) as {
        data: { publish_id: string };
      };
      const publishId = data.data.publish_id;

      return { id: publishId };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(
        `[SNS] TikTok posting attempt ${attempt}/${maxRetries} failed:`,
        lastError.message
      );

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, attempt - 1))
        );
      }
    }
  }

  const errorMsg = `All ${maxRetries} attempts to post to TikTok failed. Last error: ${lastError?.message}`;
  await notifySlackOnFailure(errorMsg);
  throw new Error(errorMsg);
}
