/**
 * CTA（Call To Action）自動挿入モジュール
 *
 * Markdown 記事本文に対して、記事タイプに応じた CTA ブロックを
 * 適切な位置に挿入する。CTA は Markdown コメントブロックとして挿入され、
 * レンダリング時にコンポーネントへ変換される想定。
 */

// ---------------------------------------------------------------------------
// CTA block definitions
// ---------------------------------------------------------------------------

/** YouTube 動画誘導 CTA */
const CTA_YOUTUBE = `<!-- CTA:youtube -->
<!-- この立ち回りを動画で解説しています↓ -->
`;

/** note 有料記事誘導 CTA */
const CTA_NOTE = `<!-- CTA:note -->
<!-- さらに詳しい解説はnote有料記事で公開中 -->
`;

/** LINE 公式登録 CTA */
const CTA_LINE = `<!-- CTA:line -->
<!-- LINE公式アカウント登録で「Apex初心者スタートダッシュガイド」を無料プレゼント中！ -->
`;

/**
 * アフィリエイトリンク CTA を生成する
 *
 * @param keyword - デバイス名やプロダクト名
 * @returns Markdown コメント形式の CTA ブロック
 */
function buildAffiliateCta(keyword: string): string {
  return `<!-- CTA:affiliate:${keyword} -->\n`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** デバイス関連キーワード（本文にこれらが含まれていたらアフィリエイト CTA を挿入） */
const DEVICE_KEYWORDS = [
  "マウス",
  "キーボード",
  "ヘッドセット",
  "イヤホン",
  "モニター",
  "マウスパッド",
  "コントローラー",
  "パッド",
  "ゲーミングPC",
  "ゲーミングチェア",
];

/**
 * 本文中の H2 見出し（## ）の位置インデックスを返す
 *
 * @param content - Markdown 本文
 * @returns 各 H2 見出し直後の位置（改行の次）の配列
 */
function findH2Positions(content: string): number[] {
  const positions: number[] = [];
  const regex = /^## .+$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // H2 見出し行の末尾（改行の次の文字位置）
    const endOfLine = content.indexOf("\n", match.index);
    if (endOfLine !== -1) {
      positions.push(endOfLine + 1);
    } else {
      positions.push(content.length);
    }
  }

  return positions;
}

/**
 * 指定位置に文字列を挿入するヘルパー
 *
 * @param content - 元の文字列
 * @param position - 挿入位置
 * @param insertion - 挿入する文字列
 * @returns 挿入後の文字列
 */
function insertAt(content: string, position: number, insertion: string): string {
  return content.slice(0, position) + insertion + content.slice(position);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Markdown 記事本文に CTA ブロックを挿入する
 *
 * 挿入ルール:
 * - 記事中盤（3 番目の H2 の後）: YouTube 動画誘導 CTA
 * - 記事中盤（5 番目の H2 の後）: note 有料記事誘導 CTA
 * - 記事末尾: LINE 公式登録 CTA
 * - デバイス関連キーワード検出時: アフィリエイトリンク CTA（該当キーワード直後の段落末）
 *
 * CTA は Markdown コメント形式（`<!-- CTA:type -->`）で挿入される。
 * フロントエンドのレンダラーがこのコメントを検出し、
 * 適切な CTA コンポーネントに置換する想定。
 *
 * @param content - Markdown 形式の記事本文
 * @param articleType - 記事タイプ（guide / character / weapon / ranking）
 * @returns CTA が挿入された Markdown 本文
 */
export function insertCtas(content: string, articleType: string): string {
  let result = content;
  const h2Positions = findH2Positions(result);

  // オフセット追跡: 挿入により位置がずれるため累積オフセットを管理
  let offset = 0;

  // 3 番目の H2 の後に YouTube CTA を挿入
  if (h2Positions.length >= 3) {
    const insertPos = h2Positions[2] + offset;
    const insertion = `\n${CTA_YOUTUBE}\n`;
    result = insertAt(result, insertPos, insertion);
    offset += insertion.length;
  }

  // 5 番目の H2 の後に note CTA を挿入
  if (h2Positions.length >= 5) {
    const insertPos = h2Positions[4] + offset;
    const insertion = `\n${CTA_NOTE}\n`;
    result = insertAt(result, insertPos, insertion);
    offset += insertion.length;
  }

  // 記事末尾に LINE CTA を挿入
  result = result.trimEnd() + `\n\n${CTA_LINE}`;

  // デバイス関連キーワードが本文に含まれていたらアフィリエイト CTA を挿入
  for (const keyword of DEVICE_KEYWORDS) {
    if (content.includes(keyword)) {
      result = result.trimEnd() + `\n\n${buildAffiliateCta(keyword)}`;
    }
  }

  return result;
}
