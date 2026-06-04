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
    value: "各サービスページに記載の通り（消費税込み）\n魂のテーマリーディング：¥3,300 / 恋愛リーディング：¥3,300 / 人生の星図 フル鑑定：¥11,000",
  },
  {
    label: "支払い方法",
    value: "クレジットカード（VISA・Mastercard・American Express・JCB）\nStripe を通じた安全な決済処理",
  },
  { label: "支払い時期", value: "お申し込み時（即時決済）" },
  {
    label: "役務の提供方法",
    value: "鑑定レポートをメールにてデジタル納品（PDF・テキスト形式）",
  },
  {
    label: "役務の提供時期",
    value: "お申し込み・決済完了後、3〜5営業日以内にご登録のメールアドレスへお届けします",
  },
  {
    label: "返品・キャンセル",
    value: "お申し込み後24時間以内：ご連絡いただければキャンセル・全額返金に応じます\nお申し込み後24時間以降：鑑定着手のため、キャンセル・返金はお受けできません\nデジタルコンテンツ（PDF等）：納品後の返品・返金不可",
  },
  {
    label: "特記事項",
    value: "占いサービスは娯楽・自己啓発を目的とするものであり、医療・法律・金融等の専門的アドバイスを代替するものではありません",
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
                    whiteSpace: "pre-line",
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
