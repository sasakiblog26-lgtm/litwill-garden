/**
 * note.com article category definitions for Apex Legends gaming guides.
 *
 * Defines price tiers, article categories, and magazine configuration
 * used across the note publisher integration.
 */

/** A single note article category definition. */
export interface NoteCategory {
  title: string;
  type: string;
  price: number;
  description: string;
  isMagazine: boolean;
}

/**
 * Price tier constants for note.com articles.
 *
 * - `free` — 無料記事（集客用）
 * - `starter` — 入門有料記事 500円（0→1達成用エントリー価格）
 * - `standard` — 有料記事 980円
 * - `premium` — 有料記事 2,980円
 * - `highEnd` — 高単価記事 4,980円
 * - `magazine` — 月額マガジン 980円/月
 */
export const NOTE_PRICE_TIERS = {
  free: 0,
  starter: 500,
  standard: 980,
  premium: 2980,
  highEnd: 4980,
  magazine: 980,
} as const;

/**
 * All note.com article categories for the Apex Legends guide site.
 *
 * Categories span free articles for user acquisition, paid single-purchase
 * articles at various price points, and a monthly subscription magazine.
 */
export const NOTE_ARTICLE_CATEGORIES: NoteCategory[] = [
  // ===== 無料記事（集客用, price=0）=====
  {
    title: "Apex Legends 完全初心者ガイド",
    type: "beginner-guide",
    price: NOTE_PRICE_TIERS.free,
    description:
      "Apex Legendsをこれから始める方向けの完全無料ガイド。基本操作からゲームの流れまで丁寧に解説します。",
    isMagazine: false,
  },
  {
    title: "初心者おすすめキャラ診断チャート",
    type: "character-guide",
    price: NOTE_PRICE_TIERS.free,
    description:
      "プレイスタイルに合ったキャラクターが見つかる診断チャート。初心者でも自分に合ったレジェンドが分かります。",
    isMagazine: false,
  },
  {
    title: "射撃訓練場の使い方と練習メニュー",
    type: "beginner-guide",
    price: NOTE_PRICE_TIERS.free,
    description:
      "射撃訓練場を最大限活用するための練習メニューを紹介。エイム力を効率的に向上させましょう。",
    isMagazine: false,
  },

  // ===== 入門有料記事 500円（0→1達成用エントリー）=====
  {
    title: "【保存版】Apex初心者がブロンズ脱出するための最速ロードマップ",
    type: "rank-guide",
    price: NOTE_PRICE_TIERS.starter,
    description:
      "ダイヤ到達プレイヤーが教える、ブロンズからシルバー・ゴールドまで最短で駆け上がるための実践ロードマップ。最初の1ランクアップに必要な全知識をこの1冊に凝縮。",
    isMagazine: false,
  },
  {
    title: "Apex初心者が最初の1週間でやるべきこと完全ガイド",
    type: "beginner-guide",
    price: NOTE_PRICE_TIERS.starter,
    description:
      "ゲームを始めたばかりの初心者が、最初の1週間でやるべきことを日別に解説。キャラ選び・操作設定・練習方法まで全て網羅。",
    isMagazine: false,
  },

  // ===== 有料記事 980円 =====
  {
    title: "キャラ別完全攻略ガイド",
    type: "character-guide",
    price: NOTE_PRICE_TIERS.standard,
    description:
      "キャラごとに1記事のシリーズ展開。立ち回り・アビリティ活用法・構成相性まで徹底解説します。",
    isMagazine: false,
  },
  {
    title: "武器別リコイル制御マニュアル（GIF付き）",
    type: "weapon-guide",
    price: NOTE_PRICE_TIERS.standard,
    description:
      "全武器のリコイルパターンをGIF付きで解説。制御のコツと練習方法を武器ごとに紹介します。",
    isMagazine: false,
  },
  {
    title: "Apex初心者→シルバー到達ガイド",
    type: "rank-guide",
    price: NOTE_PRICE_TIERS.standard,
    description:
      "ランクマッチ入門者向け。ブロンズからシルバーまで確実に到達するための立ち回りと心構えを解説します。",
    isMagazine: false,
  },

  // ===== 有料記事 2,980円 =====
  {
    title: "ランク攻略ロードマップ ブロンズ→ダイヤ完全版",
    type: "rank-guide",
    price: NOTE_PRICE_TIERS.premium,
    description:
      "ブロンズからダイヤまでのランク帯別攻略ロードマップ。各ランク帯で必要なスキルと戦略を完全網羅します。",
    isMagazine: false,
  },
  {
    title:
      "立ち回り教科書（ポジショニング・射線管理・詰め引き判断の全て）",
    type: "rank-guide",
    price: NOTE_PRICE_TIERS.premium,
    description:
      "ポジショニング、射線管理、詰め引き判断の全てを体系的に解説。中級者から上級者へのステップアップに必須の一冊です。",
    isMagazine: false,
  },

  // ===== 高単価記事 4,980円 =====
  {
    title:
      "VODレビューで学ぶ上達メソッド（自分の試合を分析する方法）",
    type: "vod-review",
    price: NOTE_PRICE_TIERS.highEnd,
    description:
      "自分の試合映像を分析して弱点を発見・改善する方法を詳細に解説。プロも実践するVODレビュー手法を学べます。",
    isMagazine: false,
  },
  {
    title: "プロの感度設定＆デバイス選びの完全ガイド",
    type: "beginner-guide",
    price: NOTE_PRICE_TIERS.highEnd,
    description:
      "プロプレイヤーの感度設定データベースとデバイス選びの完全ガイド。自分に最適な設定を見つけましょう。",
    isMagazine: false,
  },

  // ===== 月額マガジン 980円/月 =====
  {
    title: "Apexメタレポート",
    type: "meta-report",
    price: NOTE_PRICE_TIERS.magazine,
    description:
      "パッチノート分析・キャラ/武器ティアリスト更新・週間メタ解説をまとめた月額マガジン。最新メタを常に把握できます。",
    isMagazine: true,
  },
];
