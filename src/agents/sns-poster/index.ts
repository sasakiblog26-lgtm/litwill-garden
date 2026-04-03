/**
 * SNS投稿エージェント
 *
 * 記事公開時に各SNSプラットフォームへの投稿を自動生成・スケジューリング。
 * Twitter/X、YouTube概要欄、note告知文を自動作成。
 *
 * 入力: 記事情報
 * 出力: プラットフォーム別投稿テキスト
 */

export type SnsPostDraft = {
  platform: "twitter" | "youtube" | "note" | "line";
  content: string;
  hashtags?: string[];
  scheduledAt?: Date;
};

/**
 * 記事からSNS投稿を生成する
 * TODO: 各プラットフォーム向けの投稿文生成を実装
 */
export async function generateSnsPosts(
  _articleTitle: string,
  _articleUrl: string,
  _excerpt: string
): Promise<SnsPostDraft[]> {
  return [];
}
