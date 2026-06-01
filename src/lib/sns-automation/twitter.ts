/**
 * X (Twitter) automation module for Litwill Garden.
 *
 * Handles posting to the X API, generating article promotion posts,
 * and defining hashtag sets and posting schedules.
 */

/** Standard hashtag set for Apex Legends content */
export const HASHTAG_SET: string[] = [
  "#ApexLegends",
  "#Apex",
  "#エーペックス",
  "#Apex初心者",
  "#FPS",
  "#LitwillGarden",
];

/** Posting schedule for X (Japan Standard Time) */
export const POSTING_SCHEDULE = {
  morning: "08:00",
  evening: "21:00",
  timezone: "Asia/Tokyo",
} as const;

/**
 * Sends a Slack notification when a posting attempt fails.
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
        text: `🚨 X投稿エラー: ${message}`,
      }),
    });
  } catch (err) {
    console.error("[SNS] Failed to send Slack notification:", err);
  }
}

/**
 * Posts a tweet to X (Twitter) via the v2 API.
 *
 * Uses OAuth 1.0a credentials from environment variables:
 * - `X_API_KEY`
 * - `X_API_SECRET`
 * - `X_ACCESS_TOKEN`
 * - `X_ACCESS_TOKEN_SECRET`
 *
 * Retries up to 3 times on failure and sends a Slack notification
 * if all attempts are exhausted.
 *
 * @param content - The text content to post
 * @param hashtags - Optional array of hashtags to append
 * @returns The posted tweet's ID and URL
 * @throws Error if all retry attempts fail
 */
export async function postToTwitter(
  content: string,
  hashtags?: string[]
): Promise<{ id: string; url: string }> {
  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error("X API credentials are not configured in environment variables");
  }

  const fullContent = hashtags
    ? `${content}\n\n${hashtags.join(" ")}`
    : content;

  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Build OAuth 1.0a signature components
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const nonce = crypto.randomUUID().replace(/-/g, "");

      const oauthParams: Record<string, string> = {
        oauth_consumer_key: apiKey,
        oauth_nonce: nonce,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: timestamp,
        oauth_token: accessToken,
        oauth_version: "1.0",
      };

      // Create signature base string
      const method = "POST";
      const baseUrl = "https://api.twitter.com/2/tweets";
      const paramString = Object.keys(oauthParams)
        .sort()
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(oauthParams[k])}`)
        .join("&");
      const signatureBase = `${method}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;

      // Generate HMAC-SHA1 signature
      const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessTokenSecret)}`;
      const encoder = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(signingKey),
        { name: "HMAC", hash: "SHA-1" },
        false,
        ["sign"]
      );
      const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        encoder.encode(signatureBase)
      );
      const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

      // Build Authorization header
      const authHeader =
        `OAuth oauth_consumer_key="${encodeURIComponent(apiKey)}", ` +
        `oauth_nonce="${encodeURIComponent(nonce)}", ` +
        `oauth_signature="${encodeURIComponent(signature)}", ` +
        `oauth_signature_method="HMAC-SHA1", ` +
        `oauth_timestamp="${timestamp}", ` +
        `oauth_token="${encodeURIComponent(accessToken)}", ` +
        `oauth_version="1.0"`;

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: fullContent }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`X API error (${response.status}): ${errorBody}`);
      }

      const data = (await response.json()) as { data: { id: string } };
      const tweetId = data.data.id;

      return {
        id: tweetId,
        url: `https://x.com/i/status/${tweetId}`,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`[SNS] X posting attempt ${attempt}/${maxRetries} failed:`, lastError.message);

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }
  }

  const errorMsg = `All ${maxRetries} attempts to post to X failed. Last error: ${lastError?.message}`;
  await notifySlackOnFailure(errorMsg);
  throw new Error(errorMsg);
}

/**
 * Generates a promotional tweet for a newly published article.
 *
 * The output format is: article title + short summary + URL + hashtags.
 * The result is guaranteed to be at most 280 characters.
 *
 * @param article - The article data to promote
 * @param article.title - Article title
 * @param article.url - Full URL to the article
 * @param article.excerpt - Short excerpt or summary of the article
 * @returns The formatted tweet string (max 280 characters)
 */
export function generateArticlePromoPost(article: {
  title: string;
  url: string;
  excerpt: string;
}): string {
  const hashtags = ["#ApexLegends", "#エーペックス", "#LitwillGarden"];
  const hashtagStr = hashtags.join(" ");
  const urlLine = article.url;

  // Build the tweet: title + excerpt + URL + hashtags
  // Reserve space for URL, newlines, and hashtags
  const fixedParts = `\n\n${urlLine}\n\n${hashtagStr}`;
  const maxExcerptLen = 280 - article.title.length - fixedParts.length - 1; // -1 for newline after title

  let excerpt = article.excerpt;
  if (excerpt.length > maxExcerptLen) {
    excerpt = excerpt.slice(0, maxExcerptLen - 1) + "…";
  }

  const tweet = `${article.title}\n${excerpt}\n\n${urlLine}\n\n${hashtagStr}`;

  // Final safety check
  if (tweet.length > 280) {
    return tweet.slice(0, 279) + "…";
  }

  return tweet;
}
