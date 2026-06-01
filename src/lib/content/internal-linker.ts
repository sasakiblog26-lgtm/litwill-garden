/**
 * 自動内部リンク挿入ロジック
 *
 * 記事内のキャラ名→キャラ攻略ページ、武器名→武器攻略ページに自動リンクを挿入する。
 * [[キャラ名]] や [[武器名]] の記法を検出してリンクに変換する。
 */

import { legends as legendsData } from "@/content/game-data/legends";
import { weapons as weaponsData } from "@/content/game-data/weapons";

/** 内部リンクマッピング */
type LinkMapping = {
  /** 検索対象のキーワード */
  keyword: string;
  /** リンク先URL */
  url: string;
  /** リンクテキスト */
  linkText: string;
};

/**
 * レジェンドデータからリンクマッピングを構築する
 */
function buildLegendLinks(): LinkMapping[] {
  return legendsData.map((legend) => ({
    keyword: legend.nameJa,
    url: `/characters/${legend.slug}`,
    linkText: legend.nameJa,
  }));
}

/**
 * 武器データからリンクマッピングを構築する
 */
function buildWeaponLinks(): LinkMapping[] {
  return weaponsData.map((weapon) => ({
    keyword: weapon.name,
    url: `/weapons/${weapon.slug}`,
    linkText: weapon.name,
  }));
}

/**
 * [[キーワード]] 形式のリンク記法をHTMLリンクに変換する
 *
 * @param content - 変換対象のMarkdownコンテンツ
 * @returns 内部リンク挿入済みのコンテンツ
 */
export function insertInternalLinks(content: string): string {
  const legendLinks = buildLegendLinks();
  const weaponLinks = buildWeaponLinks();
  const allLinks = [...legendLinks, ...weaponLinks];

  let result = content;

  // [[キーワード]] 形式のリンク記法を変換
  result = result.replace(/\[\[(.+?)\]\]/g, (_match, keyword: string) => {
    const link = allLinks.find((l) => l.keyword === keyword);
    if (link) {
      return `[${link.linkText}](${link.url})`;
    }
    return keyword;
  });

  // 各キーワードの初出を自動リンクに変換（既にリンク化されていない場合のみ）
  // 1記事あたり最大5本の自動内部リンクに制限
  let autoLinkCount = 0;
  const maxAutoLinks = 5;
  const linkedKeywords = new Set<string>();

  for (const link of allLinks) {
    if (autoLinkCount >= maxAutoLinks) break;

    // 既にリンク化済みか、記事中に存在しないキーワードはスキップ
    if (linkedKeywords.has(link.keyword)) continue;
    if (!result.includes(link.keyword)) continue;

    // Markdownリンク内やH1-H6見出し内のキーワードはスキップ
    const escapedKeyword = link.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(?<!\\[)(?<!\\]\\()(?<!#+ .*)${escapedKeyword}(?![^\\[]*\\])`,
      ""
    );

    if (pattern.test(result)) {
      result = result.replace(pattern, `[${link.linkText}](${link.url})`);
      linkedKeywords.add(link.keyword);
      autoLinkCount++;
    }
  }

  return result;
}
