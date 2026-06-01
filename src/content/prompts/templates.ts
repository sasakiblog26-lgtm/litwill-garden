/**
 * 記事構成テンプレート
 *
 * 記事タイプごとの構成ガイドライン。
 * AI記事生成プロンプトに組み込んで使用する。
 */

/** 記事テンプレート型 */
export type ArticleTemplate = {
  type: string;
  label: string;
  structure: string[];
  sectionGuide: Record<string, string>;
};

/** 攻略ガイド型テンプレート */
export const guideArticleTemplate: ArticleTemplate = {
  type: "guide",
  label: "攻略ガイド型",
  structure: [
    "現状の問題点",
    "原因分析（なぜそうなるか）",
    "具体的な練習方法（射撃訓練場メニュー付き）",
    "実践での使い方",
    "上達チェックリスト",
    "まとめ",
    "CTA",
  ],
  sectionGuide: {
    "現状の問題点": "読者が抱える問題をデータや具体例で提示。共感を得る。",
    "原因分析（なぜそうなるか）": "問題の根本原因を分析。初心者がやりがちなミスを列挙。",
    "具体的な練習方法（射撃訓練場メニュー付き）": "射撃訓練場でできる具体的な練習メニューを時間付きで提示。",
    "実践での使い方": "練習内容を実際の試合でどう活かすかを解説。",
    "上達チェックリスト": "自分の上達度を測れるチェック項目を箇条書きで提示。",
    "まとめ": "記事の要点を3行でまとめる。次にやるべきアクションを明示。",
    "CTA": "LINE登録・YouTube・note記事への誘導。",
  },
};

/** キャラ攻略型テンプレート */
export const characterArticleTemplate: ArticleTemplate = {
  type: "character",
  label: "キャラ攻略型",
  structure: [
    "キャラ概要",
    "アビリティ解説",
    "立ち回りの基本",
    "おすすめ武器構成",
    "味方との相性",
    "よくあるミス",
    "上級テク",
    "まとめ",
    "CTA",
  ],
  sectionGuide: {
    "キャラ概要": "キャラの役割・ロール・ティア評価を簡潔に。ピック率・勝率データを含める。",
    "アビリティ解説": "各アビリティの効果・クールダウン・使いどころをデータ付きで解説。",
    "立ち回りの基本": "序盤・中盤・終盤でのポジショニングと行動指針。",
    "おすすめ武器構成": "相性の良い武器セットを2〜3パターン提示。",
    "味方との相性": "組み合わせの良いキャラと悪いキャラを理由付きで解説。",
    "よくあるミス": "初心者〜中級者がやりがちなミスと改善方法。",
    "上級テク": "中級者以上向けのテクニックを具体的に解説。",
    "まとめ": "キャラの総評と習熟までのロードマップ。",
    "CTA": "LINE登録・YouTube・note記事への誘導。",
  },
};

/** 武器攻略型テンプレート */
export const weaponArticleTemplate: ArticleTemplate = {
  type: "weapon",
  label: "武器攻略型",
  structure: [
    "武器スペック",
    "リコイルパターン",
    "制御方法",
    "おすすめアタッチメント",
    "有利な交戦距離",
    "プロの使用率",
    "まとめ",
    "CTA",
  ],
  sectionGuide: {
    "武器スペック": "ダメージ・DPS・レート・マガジン等の数値データを表形式で提示。",
    "リコイルパターン": "リコイルの方向と強度を図解。",
    "制御方法": "リコイル制御の具体的なマウス/パッド操作方法。練習メニュー付き。",
    "おすすめアタッチメント": "優先度順にアタッチメントを解説。",
    "有利な交戦距離": "この武器が最も強い距離帯をデータ付きで解説。",
    "プロの使用率": "プロシーンでの使用率データと、なぜプロが使う/使わないかを解説。",
    "まとめ": "武器の総評と他武器との比較。",
    "CTA": "LINE登録・YouTube・note記事への誘導。",
  },
};

/** ランク攻略型テンプレート */
export const rankingArticleTemplate: ArticleTemplate = {
  type: "ranking",
  label: "ランク攻略型",
  structure: [
    "対象ランク帯の特徴",
    "勝つための立ち回り",
    "ポイント計算の考え方",
    "おすすめ構成",
    "RP管理戦略",
    "まとめ",
    "CTA",
  ],
  sectionGuide: {
    "対象ランク帯の特徴": "そのランク帯のプレイヤー層・よくある試合展開を解説。",
    "勝つための立ち回り": "ランク帯ごとの最適な立ち回り戦略をフェーズ別に解説。",
    "ポイント計算の考え方": "キル/アシスト/順位のRP効率を数値で解説。",
    "おすすめ構成": "そのランク帯で勝ちやすいキャラ・武器構成を提案。",
    "RP管理戦略": "マイナスを避ける判断と、プラスを最大化する判断を具体例で解説。",
    "まとめ": "次のランクに上がるための3ステップアクション。",
    "CTA": "LINE登録・YouTube・note記事への誘導。",
  },
};

/** テンプレートマップ */
export const articleTemplates = {
  guide: guideArticleTemplate,
  character: characterArticleTemplate,
  weapon: weaponArticleTemplate,
  ranking: rankingArticleTemplate,
} as const;

/** テンプレートタイプ */
export type ArticleTemplateType = keyof typeof articleTemplates;
