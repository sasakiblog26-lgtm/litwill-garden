/**
 * コンテンツ生成エンジン
 *
 * AI記事生成パイプラインの公開API。
 */

export { generateArticle, generatePatchArticle } from "./article-generator";
export type { ArticleGenerationInput, ArticleGenerationOutput } from "./article-generator";
export { insertInternalLinks } from "./internal-linker";
export { insertCtas } from "./cta-inserter";
export {
  transitionStatus,
  isValidTransition,
  getNextStatuses,
  statusLabels,
} from "./article-status";
export type { ArticleStatus } from "./article-status";
