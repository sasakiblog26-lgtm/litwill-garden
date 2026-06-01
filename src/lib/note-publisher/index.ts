/**
 * note.com publisher integration for Litwill Garden.
 *
 * Barrel export file that re-exports all public APIs, types, and constants
 * from the note publisher module.
 *
 * @module note-publisher
 */

// Client — API communication
export {
  publishToNote,
  updateNoteArticle,
  fetchSalesData,
  fetchAllSalesData,
} from "./client";
export type { NoteArticleInput, NoteSalesData } from "./client";

// Categories — article definitions and price tiers
export { NOTE_ARTICLE_CATEGORIES, NOTE_PRICE_TIERS } from "./categories";
export type { NoteCategory } from "./categories";

// Converter — article transformation pipeline
export {
  convertArticleToNote,
  generateNotePreview,
  addNoteHeader,
  addNoteFooter,
} from "./converter";
export type { SiteArticle } from "./converter";

// Sales — tracking and reporting
export {
  syncSalesData,
  getRevenueReport,
  getTopSellingArticles,
  getMagazineSubscriberCount,
} from "./sales";
export type { RevenueReport, TopArticle } from "./sales";

// Pipeline — end-to-end workflows
export {
  publishArticleToNote,
  publishMagazineEntry,
  syncAndReport,
} from "./pipeline";
