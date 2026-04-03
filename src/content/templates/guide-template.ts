/** 攻略ガイド記事テンプレート */
export const guideTemplate = {
  structure: [
    "導入（この記事で学べること）",
    "前提知識（必要なレベル・状況説明）",
    "本編（ステップバイステップ解説）",
    "実践Tips（すぐに使えるコツ3選）",
    "よくある質問（FAQ）",
    "まとめ（次にやるべきこと）",
    "関連記事リンク",
  ],
  seoGuidelines: {
    titleLength: "30〜40文字",
    descriptionLength: "120〜160文字",
    h2Count: "5〜8個",
    wordCount: "3000〜5000文字",
    internalLinks: "3〜5本",
  },
  categoryTemplates: {
    beginner: {
      tone: "フレンドリーで丁寧。専門用語には必ず括弧で解説を入れる。",
      targetReader: "Apex を始めたばかり、またはランクがブロンズ〜シルバーで停滞している人",
    },
    aim: {
      tone: "具体的な数値やデータを交えた実践的な解説。",
      targetReader: "エイムに自信がなく、射撃訓練場での練習方法を知りたい人",
    },
    positioning: {
      tone: "マップ画像やシナリオを使った視覚的な解説。",
      targetReader: "撃ち合いはできるが、ポジショニングで負けることが多い人",
    },
    ranking: {
      tone: "ランク帯別の具体的な行動指針。データに基づいた客観的な解説。",
      targetReader: "ゴールドからプラチナ、ダイヤモンドに上がりたい人",
    },
  },
} as const;
