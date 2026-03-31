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
  changesJson: jsonb("changes_json").notNull(),
  metaImpact: text("meta_impact"),
  analysis: text("analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** ティアリストテーブル */
export const tierLists = pgTable("tier_lists", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull(),
  season: varchar("season", { length: 50 }).notNull(),
  tiersJson: jsonb("tiers_json").notNull(),
  rationale: text("rationale"),
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
  gameTitle: varchar("game_title", { length: 50 }).default("apex-legends"),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  seoMeta: jsonb("seo_meta"),
  publishedAt: timestamp("published_at"),
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
  gameTitle: varchar("game_title", { length: 50 }).default("apex-legends"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ===== マーケ系 =====

/** SNS投稿テーブル */
export const snsPosts = pgTable("sns_posts", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 30 }).notNull(),
  content: text("content").notNull(),
  mediaUrl: text("media_url"),
  scheduledAt: timestamp("scheduled_at"),
  postedAt: timestamp("posted_at"),
  engagement: jsonb("engagement"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** LINE登録者テーブル */
export const lineSubscribers = pgTable("line_subscribers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull().unique(),
  segment: varchar("segment", { length: 30 }).default("beginner"),
  rankTier: varchar("rank_tier", { length: 30 }),
  step: integer("step").default(0),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

/** note記事テーブル */
export const noteArticles = pgTable("note_articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  price: integer("price").default(0),
  category: varchar("category", { length: 50 }),
  salesCount: integer("sales_count").default(0),
  revenue: integer("revenue").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** YouTube動画テーブル */
export const youtubeVideos = pgTable("youtube_videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  videoId: varchar("video_id", { length: 20 }).notNull().unique(),
  category: varchar("category", { length: 50 }),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
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
  status: varchar("status", { length: 20 }).default("active"),
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
