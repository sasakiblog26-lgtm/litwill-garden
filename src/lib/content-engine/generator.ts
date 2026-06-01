/**
 * AI 記事生成モジュール
 *
 * Claude API を使用して Apex Legends 攻略記事を自動生成する。
 * リトライ・エラー通知・内部リンク挿入・CTA 挿入を含む。
 */

import Anthropic from "@anthropic-ai/sdk";

import { articleTemplates, type ArticleType } from "./templates";
import { insertInternalLinks } from "./internal-links";
import { insertCtas } from "./cta-inserter";
import { notifySlack } from "./notifier";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** 記事生成の入力パラメータ */
export type ArticleGenerationInput = {
  /** 対象キーワード */
  keyword: string;
  /** 記事タイプ */
  articleType: ArticleType;
  /** ターゲットランク帯（例: "ゴールド", "ダイヤ"） */
  targetRank?: string;
  /** 関連レジェンド名（キャラ攻略時など） */
  relatedLegend?: string;
  /** 関連武器名（武器攻略時など） */
  relatedWeapon?: string;
};

/** SEO メタデータ */
export type SeoMeta = {
  /** SEO タイトル */
  title: string;
  /** メタディスクリプション */
  description: string;
  /** メタキーワード */
  keywords: string[];
};

/** 生成された記事データ */
export type GeneratedArticle = {
  /** 記事タイトル */
  title: string;
  /** URL 用スラッグ */
  slug: string;
  /** Markdown 形式の本文 */
  content: string;
  /** 記事の抜粋 */
  excerpt: string;
  /** SEO メタデータ */
  seoMeta: SeoMeta;
};

/** パッチデータの構造 */
export type PatchData = {
  /** パッチバージョン（例: "2.15"） */
  version: string;
  /** パッチ適用日 */
  date: string;
  /** バフされたレジェンド / 武器のリスト */
  buffs: string[];
  /** ナーフされたレジェンド / 武器のリスト */
  nerfs: string[];
  /** その他の変更点 */
  otherChanges: string[];
  /** メタへの影響分析テキスト（任意） */
  metaImpact?: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** 最大リトライ回数 */
const MAX_RETRIES = 3;

/** リトライ時の初期待機時間（ミリ秒） */
const INITIAL_BACKOFF_MS = 1000;

/** Claude に渡すモデル名 */
const MODEL = "claude-sonnet-4-20250514";

/** レスポンスの最大トークン数 */
const MAX_TOKENS = 4096;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * 指定ミリ秒だけ待機する
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Claude API クライアントを生成する
 *
 * 環境変数 `CLAUDE_API_KEY` を使用して認証する。
 */
function createClient(): Anthropic {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("環境変数 CLAUDE_API_KEY が設定されていません。");
  }
  return new Anthropic({ apiKey });
}

/**
 * Claude API からのレスポンステキストを抽出する
 */
function extractText(response: Anthropic.Message): string {
  const textBlock = response.content.find(
    (block: Anthropic.ContentBlock) => block.type === "text",
  );
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude API レスポンスにテキストブロックが含まれていません。");
  }
  return textBlock.text;
}

/**
 * Claude API のレスポンスを JSON としてパースする
 *
 * レスポンスに JSON ブロックが含まれている場合はそれを、
 * そうでなければ全体を JSON としてパースする。
 */
function parseJsonResponse<T>(text: string): T {
  // ```json ... ``` ブロックを検出
  const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  const jsonStr = jsonBlockMatch ? jsonBlockMatch[1] : text;

  try {
    return JSON.parse(jsonStr.trim()) as T;
  } catch {
    throw new Error(
      `Claude API レスポンスの JSON パースに失敗しました: ${jsonStr.slice(0, 200)}...`,
    );
  }
}

/**
 * 記事生成用のユーザープロンプトを構築する
 */
function buildUserPrompt(input: ArticleGenerationInput): string {
  const parts: string[] = [];

  parts.push(`対象キーワード: 「${input.keyword}」`);
  parts.push(`記事タイプ: ${articleTemplates[input.articleType].name}`);

  if (input.targetRank) {
    parts.push(`ターゲットランク帯: ${input.targetRank}`);
  }
  if (input.relatedLegend) {
    parts.push(`関連レジェンド: ${input.relatedLegend}`);
  }
  if (input.relatedWeapon) {
    parts.push(`関連武器: ${input.relatedWeapon}`);
  }

  const template = articleTemplates[input.articleType];
  const sectionList = template.sections
    .map((s, i) => `${i + 1}. ${s.name}: ${s.description}`)
    .join("\n");

  parts.push(`\n以下のセクション構成に従って記事を執筆してください:\n${sectionList}`);

  parts.push(`\n出力は以下の JSON 形式で返してください:
\`\`\`json
{
  "title": "記事タイトル（日本語）",
  "content": "Markdown形式の記事本文",
  "excerpt": "100文字以内の記事抜粋",
  "seoMeta": {
    "title": "SEOタイトル（60文字以内）",
    "description": "メタディスクリプション（120文字以内）",
    "keywords": ["キーワード1", "キーワード2", "キーワード3"]
  }
}
\`\`\``);

  return parts.join("\n");
}

/**
 * パッチ記事生成用のユーザープロンプトを構築する
 */
function buildPatchPrompt(patchData: PatchData): string {
  const parts: string[] = [];

  parts.push(`パッチ ${patchData.version}（${patchData.date}）の分析記事を作成してください。`);
  parts.push(`\nバフ: ${patchData.buffs.join(", ") || "なし"}`);
  parts.push(`ナーフ: ${patchData.nerfs.join(", ") || "なし"}`);
  parts.push(`その他の変更: ${patchData.otherChanges.join(", ") || "なし"}`);

  if (patchData.metaImpact) {
    parts.push(`\nメタへの影響（参考情報）: ${patchData.metaImpact}`);
  }

  parts.push(`\n以下の構成で記事を執筆してください:
1. パッチ概要: 今回のパッチの全体像を簡潔にまとめる
2. バフ・ナーフ詳細: 各変更の具体的な内容と数値
3. メタへの影響: ピック率・勝率への予想される影響
4. おすすめ構成の変化: パッチ後に強くなる編成
5. まとめ: 初心者が押さえるべきポイント`);

  parts.push(`\n出力は以下の JSON 形式で返してください:
\`\`\`json
{
  "title": "記事タイトル（日本語）",
  "content": "Markdown形式の記事本文",
  "excerpt": "100文字以内の記事抜粋",
  "seoMeta": {
    "title": "SEOタイトル（60文字以内）",
    "description": "メタディスクリプション（120文字以内）",
    "keywords": ["キーワード1", "キーワード2", "キーワード3"]
  }
}
\`\`\``);

  return parts.join("\n");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * AI を使って Apex Legends 攻略記事を生成する
 *
 * Claude API を呼び出し、指定されたキーワード・記事タイプに基づいて
 * 記事を生成する。生成後は内部リンクの挿入と CTA の挿入を行う。
 *
 * 失敗時は最大 3 回まで指数バックオフでリトライし、
 * 全リトライ失敗時は Slack に通知を送信してエラーをスローする。
 *
 * @param input - 記事生成の入力パラメータ
 * @returns 生成された記事データ（タイトル、スラッグ、本文、抜粋、SEO メタ）
 * @throws 全リトライ失敗時にエラーをスローする
 */
export async function generateArticle(
  input: ArticleGenerationInput,
): Promise<GeneratedArticle> {
  const client = createClient();
  const template = articleTemplates[input.articleType];
  const userPrompt = buildUserPrompt(input);

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: template.systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });

      const rawText = extractText(response);
      const parsed = parseJsonResponse<{
        title: string;
        content: string;
        excerpt: string;
        seoMeta: SeoMeta;
      }>(rawText);

      // 内部リンク挿入 → CTA 挿入
      let processedContent = insertInternalLinks(parsed.content);
      processedContent = insertCtas(processedContent, input.articleType);

      return {
        title: parsed.title,
        slug: slugify(parsed.title),
        content: processedContent,
        excerpt: parsed.excerpt,
        seoMeta: parsed.seoMeta,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES - 1) {
        const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(backoff);
      }
    }
  }

  // 全リトライ失敗 → Slack 通知
  const errorMessage = `[Content Engine] 記事生成に失敗しました。\nキーワード: ${input.keyword}\n記事タイプ: ${input.articleType}\nエラー: ${lastError?.message ?? "不明なエラー"}`;
  await notifySlack(errorMessage).catch(() => {
    // Slack 通知自体の失敗は握りつぶす
  });

  throw lastError ?? new Error("記事生成に失敗しました。");
}

/**
 * パッチデータから分析記事のドラフトを生成する
 *
 * パッチノートの構造化データを受け取り、バフ・ナーフの分析、
 * メタへの影響、おすすめ構成の変化を含む記事を生成する。
 *
 * @param patchData - パッチノートの構造化データ
 * @returns 生成されたパッチ分析記事
 * @throws 全リトライ失敗時にエラーをスローする
 */
export async function generatePatchArticleDraft(
  patchData: PatchData,
): Promise<GeneratedArticle> {
  const client = createClient();
  const template = articleTemplates.guide;
  const userPrompt = buildPatchPrompt(patchData);

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: template.systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });

      const rawText = extractText(response);
      const parsed = parseJsonResponse<{
        title: string;
        content: string;
        excerpt: string;
        seoMeta: SeoMeta;
      }>(rawText);

      // 内部リンク挿入 → CTA 挿入
      let processedContent = insertInternalLinks(parsed.content);
      processedContent = insertCtas(processedContent, "guide");

      return {
        title: parsed.title,
        slug: slugify(parsed.title),
        content: processedContent,
        excerpt: parsed.excerpt,
        seoMeta: parsed.seoMeta,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES - 1) {
        const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(backoff);
      }
    }
  }

  const errorMessage = `[Content Engine] パッチ記事生成に失敗しました。\nバージョン: ${patchData.version}\nエラー: ${lastError?.message ?? "不明なエラー"}`;
  await notifySlack(errorMessage).catch(() => {});

  throw lastError ?? new Error("パッチ記事生成に失敗しました。");
}

/**
 * 日本語タイトルを URL セーフなスラッグに変換する
 *
 * 処理手順:
 * 1. 小文字に変換
 * 2. 日本語文字をそのまま保持しつつ、スペースや記号をハイフンに変換
 * 3. 連続ハイフンを 1 つにまとめる
 * 4. 先頭・末尾のハイフンを除去
 * 5. encodeURIComponent で URL セーフにする
 *
 * @param title - 日本語を含む記事タイトル
 * @returns URL セーフなスラッグ文字列
 *
 * @example
 * ```ts
 * slugify("【2026年最新】Apex 初心者のエイム練習方法");
 * // => "2026%E5%B9%B4%E6%9C%80%E6%96%B0-apex-%E5%88%9D%E5%BF%83%E8%80%85..."
 * ```
 */
export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    // 全角英数字を半角に変換
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    // 【】「」『』（）などの括弧類を除去
    .replace(/[【】「」『』（）\[\](){}]/g, "")
    // 英数字・日本語以外の文字をハイフンに変換
    .replace(
      /[^\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-z0-9ー]+/gu,
      "-",
    )
    // 連続ハイフンを 1 つにまとめる
    .replace(/-{2,}/g, "-")
    // 先頭・末尾のハイフンを除去
    .replace(/^-|-$/g, "");

  return encodeURIComponent(slug);
}
