/**
 * 内部リンク自動挿入モジュール
 *
 * Markdown 記事本文中のレジェンド名・武器名を検出し、
 * 対応するガイドページへの内部リンクを自動挿入する。
 */

import { legends } from "@/content/game-data/legends";
import { weapons } from "@/content/game-data/weapons";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LinkEntry = {
  /** 検索対象のテキスト（日本語名 or 英語名） */
  term: string;
  /** リンク先 URL */
  url: string;
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * リンク対象の名前→URL マッピングを構築する
 *
 * レジェンドは英語名・日本語名の両方を登録する。
 * 武器も同様に英語名・日本語名を登録する。
 * 長い名前から先にマッチさせるため、term の長さで降順ソートする。
 */
function buildLinkMap(): LinkEntry[] {
  const entries: LinkEntry[] = [];

  for (const legend of legends) {
    entries.push({ term: legend.name, url: `/characters/${legend.slug}` });
    if (legend.nameJa) {
      entries.push({ term: legend.nameJa, url: `/characters/${legend.slug}` });
    }
  }

  for (const weapon of weapons) {
    entries.push({ term: weapon.name, url: `/weapons/${weapon.slug}` });
    if (weapon.nameJa) {
      entries.push({ term: weapon.nameJa, url: `/weapons/${weapon.slug}` });
    }
  }

  // 長いものから先にマッチさせることで、部分一致の誤爆を防ぐ
  entries.sort((a, b) => b.term.length - a.term.length);

  return entries;
}

/**
 * 指定位置がリンク挿入禁止区間内にあるかどうかを判定する
 *
 * 禁止区間:
 * - 見出し行（# で始まる行）
 * - コードブロック（```...```）
 * - インラインコード（`...`）
 * - 既存のリンク（[...](...) or <a>...</a>）
 */
function isInsideExcludedZone(
  content: string,
  matchStart: number,
  matchEnd: number,
): boolean {
  // Check if inside a code block (```)
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match: RegExpExecArray | null;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (matchStart >= match.index && matchEnd <= match.index + match[0].length) {
      return true;
    }
  }

  // Check if inside an inline code span (`)
  const inlineCodeRegex = /`[^`]+`/g;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    if (matchStart >= match.index && matchEnd <= match.index + match[0].length) {
      return true;
    }
  }

  // Check if inside an existing markdown link [text](url)
  const linkRegex = /\[[^\]]*\]\([^)]*\)/g;
  while ((match = linkRegex.exec(content)) !== null) {
    if (matchStart >= match.index && matchEnd <= match.index + match[0].length) {
      return true;
    }
  }

  // Check if on a heading line (starts with #)
  const lineStart = content.lastIndexOf("\n", matchStart - 1) + 1;
  const lineContent = content.slice(lineStart);
  if (/^#{1,6}\s/.test(lineContent)) {
    return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Markdown 本文中のレジェンド名・武器名に内部リンクを自動挿入する
 *
 * 以下のルールに従う:
 * - 各名前について、記事中の **最初の出現箇所のみ** をリンクに変換する
 * - 見出し（#）、コードブロック、インラインコード、既存リンク内の出現はスキップする
 * - リンク形式: `[表示名](/characters/{slug})` または `[表示名](/weapons/{slug})`
 *
 * @param content - Markdown 形式の記事本文
 * @returns 内部リンクが挿入された Markdown 本文
 */
export function insertInternalLinks(content: string): string {
  const linkMap = buildLinkMap();
  let result = content;
  const linkedTerms = new Set<string>();

  for (const entry of linkMap) {
    // 同じ URL に対して既にリンク済みならスキップ
    if (linkedTerms.has(entry.url)) {
      continue;
    }

    // term を正規表現用にエスケープ
    const escapedTerm = entry.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedTerm, "g");

    let termMatch: RegExpExecArray | null;
    while ((termMatch = regex.exec(result)) !== null) {
      const matchStart = termMatch.index;
      const matchEnd = matchStart + termMatch[0].length;

      if (isInsideExcludedZone(result, matchStart, matchEnd)) {
        continue;
      }

      // 最初の有効な出現箇所をリンクに置換
      const before = result.slice(0, matchStart);
      const after = result.slice(matchEnd);
      const link = `[${termMatch[0]}](${entry.url})`;
      result = before + link + after;
      linkedTerms.add(entry.url);
      break;
    }
  }

  return result;
}
