import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = { title: "特定商取引法に基づく表記" };

const ITEMS = [
  { label: "販売事業者", value: "Litwill Garden" },
  { label: "運営責任者", value: "佐々木弘雅" },
  { label: "所在地", value: "お問い合わせ後に開示します" },
  { label: "電話番号", value: "お問い合わせ後に開示します" },
  {
    label: "メールアドレス",
    value: "お問い合わせフォームよりご連絡ください",
  },
  {
    label: "販売価格",
    value: "各商品・サービスページに記載の通り（税込）",
  },
  { label: "支払い方法", value: "クレジットカード・銀行振込" },
  { label: "支払い時期", value: "サービス申し込み時" },
  {
    label: "役務の提供時期",
    value: "お申し込み後、メールにてご案内する日程で実施",
  },
  {
    label: "返品・キャンセル",
    value:
      "デジタルコンテンツは購入後の返金不可。鑑定サービスは実施前のキャンセルは要相談。",
  },
  {
    label: "特記事項",
    value:
      "占いは娯楽・参考情報であり、医療・法律・金融アドバイスを目的とするものではありません。",
  },
] as const;

export default function TokushohoPage() {
  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "80px 24px",
  };

  const h1Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    color: "var(--text-primary)",
    margin: "0 0 40px",
  };

  const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const wrapperStyle: CSSProperties = {
    border: "1px solid var(--border-card)",
    borderRadius: "16px",
    overflow: "hidden",
  };

  return (
    <div style={outerStyle}>
      <h1 style={h1Style}>特定商取引法に基づく表記</h1>

      <div style={wrapperStyle}>
        <table style={tableStyle}>
          <tbody>
            {ITEMS.map(({ label, value }, i) => (
              <tr
                key={label}
                style={{
                  borderBottom:
                    i < ITEMS.length - 1
                      ? "1px solid var(--border-card)"
                      : "none",
                }}
              >
                <th
                  style={{
                    background: "var(--bg-card)",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontFamily: "var(--lg-font-body)",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                    verticalAlign: "top",
                    width: "200px",
                  }}
                >
                  {label}
                </th>
                <td
                  style={{
                    padding: "16px 20px",
                    fontFamily: "var(--lg-font-body)",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    verticalAlign: "top",
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
