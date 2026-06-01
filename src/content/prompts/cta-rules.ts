/**
 * CTA挿入ルール定義
 *
 * 記事内に挿入するCTA（Call To Action）のルールを管理する。
 */

/** CTA挿入位置 */
export type CtaPosition = "mid-youtube" | "mid-note" | "end-line" | "inline-affiliate";

/** CTAルール定義 */
export type CtaRule = {
  /** CTA識別子 */
  id: CtaPosition;
  /** 挿入位置の説明 */
  position: string;
  /** テンプレート */
  template: string;
  /** 挿入条件（記事内のどの位置に挿入するか） */
  insertAfterSection: number | "device-mention";
};

/** CTA挿入ルール一覧 */
export const ctaRules: CtaRule[] = [
  {
    id: "mid-youtube",
    position: "記事中盤（本編の中間セクション後）",
    template: `:::cta-youtube
**この立ち回りを動画で解説しています↓**

[▶ YouTubeで動画を見る](https://www.youtube.com/@litwill-garden)

実際のプレイ映像付きで、文字だけでは伝わりにくいポイントを解説しています。
:::`,
    insertAfterSection: 3,
  },
  {
    id: "mid-note",
    position: "記事中盤2（YouTube CTAの後のセクション後）",
    template: `:::cta-note
**もっと詳しく知りたい方へ**

この記事の内容をさらに深掘りした有料ガイドをnoteで公開中。
キャラ攻略完全版やランク攻略ロードマップなど、ここでは書ききれなかった実践テクニックを収録しています。

[noteで詳細ガイドを見る →](https://note.com/litwill_garden)
:::`,
    insertAfterSection: 4,
  },
  {
    id: "end-line",
    position: "記事末尾（まとめセクション後）",
    template: `:::cta-line
**🎮 LINE登録で「Apex初心者スタートダッシュガイド」を無料プレゼント！**

- 最初にやるべき設定5つ
- 初心者おすすめキャラ3選
- 射撃訓練場の15分練習メニュー
- 初心者がやりがちなNG行動5つ
- プロの感度設定一覧表

**今すぐ友だち追加して受け取る↓**

[LINE友だち追加はこちら]({LINE_URL})
:::`,
    insertAfterSection: -1,
  },
  {
    id: "inline-affiliate",
    position: "デバイス言及時（インライン）",
    template: `:::affiliate
このマウスはAimLabでもよく使われています → [商品リンク]({AFFILIATE_URL})
:::`,
    insertAfterSection: "device-mention",
  },
];

/** デバイスカテゴリとキーワードのマッピング（自動アフィリエイトリンク挿入用） */
export const deviceKeywords: Record<string, string[]> = {
  mouse: ["マウス", "ゲーミングマウス", "G PRO", "DeathAdder", "Viper", "Superlight"],
  keyboard: ["キーボード", "ゲーミングキーボード", "メカニカル"],
  monitor: ["モニター", "ゲーミングモニター", "144Hz", "240Hz", "360Hz"],
  headset: ["ヘッドセット", "イヤホン", "ゲーミングヘッドセット"],
  mousepad: ["マウスパッド", "デスクマット"],
  controller: ["コントローラー", "パッド", "PAD"],
};
