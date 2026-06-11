import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

// ===== コンテンツ系 =====

/** 記事テーブル */
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: varchar("category", { length: 50 }).notNull(),
  /** 記事タイプ: column / diagnosis / reading */
  articleType: varchar("article_type", { length: 50 }),
  /** ステータス: draft → review → scheduled → published */
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  seoMeta: jsonb("seo_meta"),
  /** 関連キーワードID */
  keywordId: integer("keyword_id"),
  /** 自動挿入された内部リンクJSON */
  internalLinksJson: jsonb("internal_links_json"),
  /** CTA設定JSON */
  ctaConfigJson: jsonb("cta_config_json"),
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
  /** 記事が生成済みか */
  articleGenerated: boolean("article_generated").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ===== LINE マーケティング系 =====

/** LINE登録者テーブル */
export const lineSubscribers = pgTable("line_subscribers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 200 }),
  /** セグメント: beginner / silver-gold / platinum-above */
  segment: varchar("segment", { length: 30 }).default("beginner"),
  /** セグメント分類のベースとなった選択テキスト（旧: rankTier） */
  rankTier: varchar("rank_tier", { length: 100 }),
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
