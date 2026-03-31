/**
 * 攻略記事生成エージェント
 *
 * ターゲットキーワードと記事テンプレートを元に、
 * Apex Legends の攻略記事ドラフトを自動生成する。
 *
 * 入力: キーワード、カテゴリ、ターゲットランク帯
 * 出力: Markdown形式の記事ドラフト
 */

export type ContentWriterInput = {
  keyword: string;
  category: "beginner" | "aim" | "positioning" | "ranking" | "character" | "weapon";
  targetRank?: string;
  relatedLegend?: string;
  relatedWeapon?: string;
};

export type ContentWriterOutput = {
  title: string;
  slug: string;
  content: string;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
};

/**
 * 攻略記事を生成する
 * TODO: Claude API を使った記事生成を実装
 */
export async function generateArticle(
  _input: ContentWriterInput
): Promise<ContentWriterOutput | null> {
  // AI記事生成は後日実装
  return null;
}
