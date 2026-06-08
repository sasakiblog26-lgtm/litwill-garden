export const brand = {
  name: "Litwill Garden",
  domain: "litwillgarden.com",
  url: "https://www.litwillgarden.com",
  operator: "Litwill Garden",
  description:
    "西洋占星術・インド占星術・四柱推命を融合した独自メソッドで、あなたの悩みを深く読み解く占い×心理学メディア。魂のテーマ・恋愛・仕事・人生の星図をプロが丁寧にリーディングします。",
  tagline: "あなたの魂が描く、人生の星図",
  target: "占星術・タロット・心理学に関心を持つ女性。スピリチュアルな視点で自己理解・悩み解決を求める層",
  owner: {
    name: "佐々木弘雅",
    role: "占いブランドオーナー",
  },
  // 公式SNS等の URL。構造化データ(Organization.sameAs)に反映され、Googleの
  // エンティティ認識（ナレッジグラフ／AIオーバービュー）を強化する。
  // アカウント開設後にURLを追加する（未開設プロフィールは載せない＝死リンクは
  // 信頼シグナルを下げる）。例: "https://x.com/litwill_garden"
  socials: [
    "https://x.com/litwillgarden",
    "https://www.threads.net/@litwillgarden",
  ] as string[],
  // サイトが扱う専門領域。Organization.knowsAbout に反映しトピック関連性を示す。
  expertise: [
    "西洋占星術",
    "インド占星術",
    "四柱推命",
    "タロット",
    "数秘術",
    "心理学",
  ] as string[],
  colors: {
    primary: "#9B8BBF",
    secondary: "#C8D8F0",
    accent: "#E8D0E0",
    background: "#F8F5FC",
    text: "#2D2448",
    gold: "#D4C090",
  },
  fonts: {
    display: "Cormorant Garamond",
    heading: "Shippori Mincho",
    body: "Noto Sans JP",
  },
} as const;
