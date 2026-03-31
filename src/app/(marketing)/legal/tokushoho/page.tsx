import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { brand } from "@/config/brand";
import { Breadcrumb } from "@/components/seo/breadcrumb";

export const metadata: Metadata = createMetadata({
  title: "特定商取引法に基づく表記",
  description: `${brand.name} の特定商取引法に基づく表記ページです。`,
  path: "/legal/tokushoho",
});

const tokushohoItems = [
  { label: "販売業者", value: "Litwill Garden 編集部" },
  { label: "運営統括責任者", value: "佐々木弘雅" },
  { label: "所在地", value: "お問い合わせいただいた方に個別にお知らせいたします" },
  { label: "電話番号", value: "お問い合わせいただいた方に個別にお知らせいたします" },
  { label: "メールアドレス", value: "お問い合わせいただいた方に個別にお知らせいたします" },
  { label: "販売URL", value: brand.url },
  { label: "販売価格", value: "各商品・サービスのページに記載" },
  {
    label: "商品代金以外の必要料金",
    value: "インターネット接続にかかる通信費はお客様のご負担となります",
  },
  {
    label: "支払方法",
    value: "クレジットカード、その他各プラットフォームが対応する決済手段",
  },
  { label: "支払時期", value: "商品購入時に即時決済" },
  { label: "商品の引渡時期", value: "決済完了後、直ちにご利用いただけます" },
  {
    label: "返品・キャンセルについて",
    value:
      "デジタルコンテンツの性質上、購入後の返品・返金は原則としてお受けしておりません。ただし、商品に重大な瑕疵がある場合はこの限りではありません。",
  },
  {
    label: "動作環境",
    value:
      "最新バージョンの Chrome、Firefox、Safari、Edge でのご利用を推奨します",
  },
];

export default function TokushohoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "特定商取引法に基づく表記" },
        ]}
      />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          特定商取引法に基づく表記
        </h1>
      </header>

      <div className="overflow-hidden rounded-xl border border-bg-elevated">
        <table className="w-full">
          <tbody>
            {tokushohoItems.map((item, i) => (
              <tr
                key={item.label}
                className={`${
                  i < tokushohoItems.length - 1
                    ? "border-b border-bg-elevated"
                    : ""
                }`}
              >
                <th className="bg-bg-card px-4 py-4 text-left text-sm font-bold text-text sm:w-1/3">
                  {item.label}
                </th>
                <td className="px-4 py-4 text-sm text-text-muted">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
