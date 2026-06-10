import { getSortedArticles } from "@/lib/markdown";

// サイト内検索用の静的インデックス。ビルド時に1度生成され /search-index で配信。
// クライアントの検索パネルがこれを取得して絞り込む（バックエンド不要）。
export const dynamic = "force-static";

type SearchDoc = {
  type: "article" | "tool" | "page";
  title: string;
  url: string;
  category: string;
  keywords: string;
};

// 診断ツール・主要ページ（記事以外も検索でヒットさせる）
const STATIC_DOCS: SearchDoc[] = [
  { type: "tool", title: "16タイプ融合診断", url: "/tools/16types", category: "無料診断", keywords: "性格診断 16タイプ 占星術 心理学 自己理解 mbti" },
  { type: "tool", title: "今日のタロット占い（1枚引き）", url: "/tools/tarot", category: "無料診断", keywords: "タロット 大アルカナ 今日の運勢 1枚引き" },
  { type: "tool", title: "五行タイプ診断（四柱推命）", url: "/tools/gogyo", category: "無料診断", keywords: "四柱推命 五行 木火土金水 開運 相性" },
  { type: "tool", title: "数秘術 診断", url: "/tools/numerology", category: "無料診断", keywords: "数秘術 ライフパスナンバー 運命数" },
  { type: "tool", title: "星座占い", url: "/tools/zodiac", category: "無料診断", keywords: "星座 占星術 12星座 今日の運勢" },
  { type: "tool", title: "相性診断", url: "/tools/compatibility", category: "無料診断", keywords: "相性 恋愛 カップル 占い" },
  { type: "tool", title: "無料診断・計算ツール一覧", url: "/tools", category: "無料診断", keywords: "診断 ツール 一覧 無料" },
  { type: "page", title: "生年月日リーディング（無料診断）", url: "/diagnosis", category: "無料診断", keywords: "生年月日 リーディング 無料 占い" },
  { type: "page", title: "鑑定メニュー・申し込み", url: "/readings", category: "鑑定", keywords: "鑑定 申込 恋愛 結婚 仕事 転職 人生 運勢 タロット 料金 メール レポート" },
  { type: "page", title: "占いコラム一覧", url: "/articles", category: "コラム", keywords: "記事 コラム ブログ 一覧" },
];

export function GET() {
  const articleDocs: SearchDoc[] = getSortedArticles().map((a) => ({
    type: "article",
    title: a.title,
    url: `/articles/${a.slug}`,
    category: a.category,
    keywords: [a.excerpt, a.category, ...(a.tags ?? [])].join(" "),
  }));

  return Response.json([...STATIC_DOCS, ...articleDocs], {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
