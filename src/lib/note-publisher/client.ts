/**
 * note.com API client for publishing and managing articles.
 *
 * Handles authentication, retries, and error reporting via Slack.
 * Requires the `NOTE_API_TOKEN` environment variable to be set.
 */

const NOTE_API_BASE_URL = "https://note.com/api/v2";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Input payload for creating or updating a note article. */
export interface NoteArticleInput {
  title: string;
  body: string;
  status: "draft" | "published";
  price: number;
  magazineId?: string;
  tags?: string[];
}

/** Sales data returned from the note API for a single article. */
export interface NoteSalesData {
  noteId: string;
  title: string;
  salesCount: number;
  revenue: number;
  lastSaleAt?: Date;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns the NOTE_API_TOKEN from the environment.
 * @throws {Error} When the token is not configured.
 */
function getApiToken(): string {
  const token = process.env.NOTE_API_TOKEN;
  if (!token) {
    throw new Error(
      "NOTE_API_TOKEN environment variable is not set. Cannot authenticate with note.com API.",
    );
  }
  return token;
}

/**
 * Sends a Slack notification when a note API operation fails.
 *
 * Uses the `SLACK_WEBHOOK_URL` environment variable. If the variable is not
 * set the notification is silently skipped.
 *
 * @param message - Human-readable error description.
 */
async function notifySlack(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[note-publisher] SLACK_WEBHOOK_URL not set — skipping Slack notification");
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `[note-publisher] ${message}`,
      }),
    });
  } catch (err) {
    console.error("[note-publisher] Failed to send Slack notification:", err);
  }
}

/**
 * Low-level helper that sends an authenticated request to the note API
 * with automatic retry logic.
 *
 * @param method  - HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @param path    - API path relative to the base URL (e.g. `/articles`).
 * @param body    - Optional request body (will be JSON-serialized).
 * @returns The parsed JSON response.
 * @throws {Error} After all retries are exhausted.
 */
async function noteApiRequest<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const token = getApiToken();
  const url = `${NOTE_API_BASE_URL}${path}`;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        throw new Error(
          `note API responded with ${res.status} ${res.statusText}: ${errorBody}`,
        );
      }

      return (await res.json()) as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(
        `[note-publisher] Attempt ${attempt}/${MAX_RETRIES} failed for ${method} ${path}:`,
        lastError.message,
      );

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
      }
    }
  }

  throw lastError!;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Creates and publishes an article on note.com.
 *
 * Automatically retries up to 3 times on transient failures and sends a
 * Slack notification when all retries are exhausted.
 *
 * @param article - The article payload to publish.
 * @returns An object containing the note-assigned `noteId` and the public `url`.
 */
export async function publishToNote(
  article: NoteArticleInput,
): Promise<{ noteId: string; url: string }> {
  try {
    const response = await noteApiRequest<{
      data: { id: string; key: string };
    }>("POST", "/articles", {
      title: article.title,
      body: article.body,
      status: article.status,
      price: article.price,
      magazine_id: article.magazineId,
      tags: article.tags,
    });

    return {
      noteId: response.data.id,
      url: `https://note.com/litwill_garden/n/${response.data.key}`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err);
    await notifySlack(
      `Failed to publish article "${article.title}": ${message}`,
    );
    throw err;
  }
}

/**
 * Updates an existing article on note.com.
 *
 * @param noteId  - The note-assigned article ID.
 * @param updates - Partial article fields to update.
 */
export async function updateNoteArticle(
  noteId: string,
  updates: Partial<NoteArticleInput>,
): Promise<void> {
  const payload: Record<string, unknown> = {};
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.body !== undefined) payload.body = updates.body;
  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.price !== undefined) payload.price = updates.price;
  if (updates.magazineId !== undefined) payload.magazine_id = updates.magazineId;
  if (updates.tags !== undefined) payload.tags = updates.tags;

  await noteApiRequest("PUT", `/articles/${noteId}`, payload);
}

/**
 * Fetches sales data (count and revenue) for a single note article.
 *
 * @param noteId - The note-assigned article ID.
 * @returns Sales data for the specified article.
 */
export async function fetchSalesData(noteId: string): Promise<NoteSalesData> {
  const response = await noteApiRequest<{
    data: {
      id: string;
      title: string;
      sales_count: number;
      revenue: number;
      last_sale_at?: string;
    };
  }>("GET", `/articles/${noteId}/sales`);

  return {
    noteId: response.data.id,
    title: response.data.title,
    salesCount: response.data.sales_count,
    revenue: response.data.revenue,
    lastSaleAt: response.data.last_sale_at
      ? new Date(response.data.last_sale_at)
      : undefined,
  };
}

/**
 * Fetches sales data for all published note articles.
 *
 * @returns An array of sales data objects, one per published article.
 */
export async function fetchAllSalesData(): Promise<NoteSalesData[]> {
  const response = await noteApiRequest<{
    data: Array<{
      id: string;
      title: string;
      sales_count: number;
      revenue: number;
      last_sale_at?: string;
    }>;
  }>("GET", "/articles/sales");

  return response.data.map((item) => ({
    noteId: item.id,
    title: item.title,
    salesCount: item.sales_count,
    revenue: item.revenue,
    lastSaleAt: item.last_sale_at ? new Date(item.last_sale_at) : undefined,
  }));
}
