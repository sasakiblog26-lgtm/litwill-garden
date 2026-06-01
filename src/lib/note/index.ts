/**
 * note連携モジュール
 *
 * 記事カテゴリ管理・記事変換パイプライン・売上トラッキング。
 */

export {
  noteCategories,
  priceLabels,
  getCategoriesByPrice,
  getCategoryById,
} from "./categories";
export type { NoteArticleCategory, NotePriceType } from "./categories";
export {
  convertToNoteArticle,
  publishToNote,
  publishArticleToNote,
} from "./publisher";
export type { NotePublishInput, NotePublishResult, NoteArticleDraft } from "./publisher";
export {
  fetchSalesData,
  generateSalesSummary,
  generateMonthlyReport,
} from "./sales-tracker";
export type { NoteSalesData, SalesSummary } from "./sales-tracker";
