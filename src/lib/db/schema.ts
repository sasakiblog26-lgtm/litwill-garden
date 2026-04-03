import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  real,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

// ===== ゲームデータ系 =====

/** レジェンド（キャラクター）テーブル */
export const legends = pgTable("legends", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  nameJa: varchar("name_ja", { length: 100 }).notNull(),
  legendClass: varchar("legend_class", { length: 50 }).notNull(),
  abilitiesJson: jsonb("abilities_json").notNull(),
  tier: varchar("tier", { length: 2 }).notNull(),
  pickRate: real("pick_rate"),
  winRate: real("win_rate"),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  description: text("description").notNull(),
  tips: jsonb("tips"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** 武器テーブル */
export const weapons = pgTable("weapons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  nameJa: varchar("name_ja", { length: 100 }),
  category: varchar("category", { length: 50 }).notNull(),
  ammoType: varchar("ammo_type", { length: 30 }).notNull(),
  damage: integer("damage").notNull(),
  headshot: integer("headshot"),
  fireRate: real("fire_rate"),
  dps: real("dps"),
  magazine: integer("magazine"),
  recoilPattern: text("recoil_pattern"),
  tier: varchar("tier", { length: 2 }).notNull(),
  attachmentsJson: jsonb("attachments_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** マップテーブル */
export const maps = pgTable("maps", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  hotZones: jsonb("hot_zones"),
  rotationTips: jsonb("rotation_tips"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** パッチノートテーブル */
export const patchNotes = pgTable("patch_notes", {
  id: serial("id").primaryKey(),
  version: varchar("version", { length: 50 }).notNull(),
  date: timestamp("date").notNull(),
  rawContent: text("raw_content"),
  changesJson: jsonb("changes_json").notNull(),
  buffsJson: jsonb("buffs_json"),
  nerfsJson: jsonb("nerfs_json"),
  metaImpact: text("meta_impact"),
  analysis: text("analysis"),
  tierListChangesJson: jsonb("tier_list_changes_json"),
  articleDraftId: integer("article_draft_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** ティアリストテーブル */
export const tierLists = pgTable("tier_lists", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull(),
  season: varchar("season", { length: 50 }).notNull(),
  tiersJson: jsonb("tiers_json").notNull(),
  rationale: text("rationale"),
  patchVersion: varchar("patch_version", { length: 50 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ===== コンテンツ系 =====

/** 記事テーブル */
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: varchar("category", { length: 50 }).notNull(),
  /** 記事タイプ: guide / character / weapon / ranking / patch-analysis */
  articleType: varchar("article_type", { length: 50 }),
  gameTitle: varchar("game_title", { length: 50 }).default("apex-legends"),
  /** ステータス: draft → review → scheduled → published */
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  seoMeta: jsonb("seo_meta"),
  /** 関連キーワードID */
  keywordId: integer("keyword_id"),
  /** 関連レジェンド名 */
  relatedLegend: varchar("related_legend", { length: 100 }),
  /** 関連武器名 */
  relatedWeapon: varchar("related_weapon", { length: 100 }),
  /** 自動挿入された内部リンクJSON */
  internalLinksJson: jsonb("internal_links_json"),
  /** CTA設定JSON */
  ctaConfigJson: jsonb("cta_config_json"),
  /** note記事IDとの紐付け */
  noteArticleId: integer("note_article_id"),
  publishedAt: timestamp("published_at"),
  scheduledAt: timestamp("scheduled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** キーワードテーブル */
export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(),
  keyword: varchar("keyword", { length: 200 }).notNull(),
  volume: integer("volume"),
  difficulty: integer("difficulty"),
  currentRank: integer("current_rank"),
  targetRank: integer("target_rank"),
  gameTitle: varchar("game_title", { length: 50 }).default("apex-legends"),
  /** 記事が生成済みか */
  articleGenerated: boolean("article_generated").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ===== マーケ系 =====

/** SNS投稿テーブル */
export const snsPosts = pgTable("sns_posts", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 30 }).notNull(),
  /** 投稿テンプレートタイプ: patch-news / meta-analysis / tips / match-result / article-promo */
  templateType: varchar("template_type", { length: 50 }),
  content: text("content").notNull(),
  hashtags: jsonb("hashtags"),
  mediaUrl: text("media_url"),
  /** 関連記事ID */
  articleId: integer("article_id"),
  scheduledAt: timestamp("scheduled_at"),
  postedAt: timestamp("posted_at"),
  /** 外部投稿ID（X post ID等） */
  externalId: varchar("external_id", { length: 100 }),
  engagement: jsonb("engagement"),
  /** impressions, likes, retweets, replies, clicks */
  impressions: integer("impressions").default(0),
  likes: integer("likes").default(0),
  retweets: integer("retweets").default(0),
  replies: integer("replies").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** SNSパフォーマンス週次レポートテーブル */
export const snsWeeklyReports = pgTable("sns_weekly_reports", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 30 }).notNull(),
  weekStart: timestamp("week_start").notNull(),
  weekEnd: timestamp("week_end").notNull(),
  totalPosts: integer("total_posts").default(0),
  totalImpressions: integer("total_impressions").default(0),
  totalEngagement: integer("total_engagement").default(0),
  topPostId: integer("top_post_id"),
  reportJson: jsonb("report_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** LINE登録者テーブル */
export const lineSubscribers = pgTable("line_subscribers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 200 }),
  /** セグメント: beginner / silver-gold / platinum-above */
  segment: varchar("segment", { length: 30 }).default("beginner"),
  rankTier: varchar("rank_tier", { length: 30 }),
  /** 現在のステップ配信Day */
  step: integer("step").default(0),
  /** 次回配信予定日時 */
  nextDeliveryAt: timestamp("next_delivery_at"),
  /** リッチメニュー表示状態 */
  richMenuId: varchar("rich_menu_id", { length: 100 }),
  /** 特商法同意 */
  tokushohoAcknowledged: boolean("tokushoho_acknowledged").default(false),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

/** LINE配信ログテーブル */
export const lineDeliveryLogs = pgTable("line_delivery_logs", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id").notNull(),
  /** 配信タイプ: step / weekly / broadcast */
  deliveryType: varchar("delivery_type", { length: 30 }).notNull(),
  /** ステップ番号（ステップ配信の場合） */
  stepDay: integer("step_day"),
  segment: varchar("segment", { length: 30 }),
  messageJson: jsonb("message_json").notNull(),
  deliveredAt: timestamp("delivered_at").defaultNow().notNull(),
  /** 開封・クリック等のトラッキング */
  opened: boolean("opened").default(false),
  clicked: boolean("clicked").default(false),
});

/** note記事テーブル */
export const noteArticles = pgTable("note_articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  /** note上のURL slug */
  noteSlug: varchar("note_slug", { length: 200 }),
  /** note上の記事ID */
  noteExternalId: varchar("note_external_id", { length: 100 }),
  /** 価格: 0=無料, 980, 2980, 4980 */
  price: integer("price").default(0),
  /** カテゴリ: free / paid-980 / paid-2980 / paid-4980 / magazine */
  category: varchar("category", { length: 50 }),
  /** 記事タイプ: character-guide / weapon-guide / rank-guide / vod-review / meta-report / beginner-guide */
  articleType: varchar("article_type", { length: 50 }),
  content: text("content"),
  /** 元記事のID（サイト記事からの変換の場合） */
  sourceArticleId: integer("source_article_id"),
  /** 公開ステータス: draft / published */
  status: varchar("status", { length: 20 }).default("draft"),
  /** マガジンID（月額マガジンの場合） */
  magazineId: varchar("magazine_id", { length: 100 }),
  salesCount: integer("sales_count").default(0),
  revenue: integer("revenue").default(0),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** note売上ログテーブル */
export const noteSalesLogs = pgTable("note_sales_logs", {
  id: serial("id").primaryKey(),
  noteArticleId: integer("note_article_id").notNull(),
  /** 売上タイプ: single / magazine-subscription */
  saleType: varchar("sale_type", { length: 30 }).notNull(),
  amount: integer("amount").notNull(),
  /** noteからの手数料控除後金額 */
  netAmount: integer("net_amount"),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

/** YouTube動画テーブル */
export const youtubeVideos = pgTable("youtube_videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  videoId: varchar("video_id", { length: 20 }).notNull().unique(),
  /** カテゴリ: beginner-guide / character-guide / vod-review / patch-note / shorts */
  category: varchar("category", { length: 50 }),
  description: text("description"),
  tags: jsonb("tags"),
  thumbnailTitle: varchar("thumbnail_title", { length: 200 }),
  /** 関連記事ID */
  relatedArticleId: integer("related_article_id"),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  /** ショート動画フラグ */
  isShort: boolean("is_short").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** アナリティクステーブル */
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  pageviews: integer("pageviews").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  conversions: integer("conversions").default(0),
  topPages: jsonb("top_pages"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===== アフィリエイト系 =====

/** アフィリエイトリンクテーブル */
export const affiliateLinks = pgTable("affiliate_links", {
  id: serial("id").primaryKey(),
  productName: varchar("product_name", { length: 200 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  aspName: varchar("asp_name", { length: 100 }),
  price: integer("price"),
  commission: integer("commission"),
  url: text("url").notNull(),
  /** 自動挿入用キーワード（この文字列が記事に含まれていたら自動リンク） */
  matchKeywords: jsonb("match_keywords"),
  status: varchar("status", { length: 20 }).default("active"),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** デバイスレビューテーブル */
export const deviceReviews = pgTable("device_reviews", {
  id: serial("id").primaryKey(),
  productName: varchar("product_name", { length: 200 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  rating: real("rating"),
  prosConsJson: jsonb("pros_cons_json"),
  affiliateLinkId: integer("affiliate_link_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
