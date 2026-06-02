import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  const outerStyle: CSSProperties = { maxWidth: "720px", margin: "0 auto", padding: "80px 24px" };
  const h1Style: CSSProperties = { fontFamily: "var(--lg-font-heading)", fontWeight: 700, fontSize: "28px", color: "var(--text-primary)", margin: "0 0 40px" };
  const sectionStyle: CSSProperties = { marginBottom: "32px" };
  const h2Style: CSSProperties = { fontFamily: "var(--lg-font-heading)", fontWeight: 600, fontSize: "18px", color: "var(--text-primary)", margin: "0 0 12px" };
  const pStyle: CSSProperties = { fontSize: "15px", lineHeight: 1.9, color: "var(--text-secondary)", margin: "0 0 10px" };
  const listStyle: CSSProperties = { fontSize: "15px", lineHeight: 1.9, color: "var(--text-secondary)", paddingLeft: "24px", margin: 0 };

  return (
    <div style={outerStyle}>
      <h1 style={h1Style}>利用規約</h1>
      <div>
        <section style={sectionStyle}>
          <h2 style={h2Style}>第1条　本サービスについて</h2>
          <p style={pStyle}>Litwill Garden（以下「当サービス」）は、占い鑑定サービス（西洋占星術・インド占星術・四柱推命・タロット）およびデジタルコンテンツを提供します。</p>
          <p style={pStyle}>本規約は、当サービスを利用するすべてのお客様に適用されます。サービスをご利用いただくことで、本規約に同意いただいたものとみなします。</p>
        </section>
        <section style={sectionStyle}>
          <h2 style={h2Style}>第2条　禁止事項</h2>
          <p style={pStyle}>お客様は以下の行為を行ってはなりません。</p>
          <ul style={listStyle}>
            <li>当サービスのコンテンツの無断転載・複製・再配布</li>
            <li>コンテンツの商業的な二次利用</li>
            <li>法令または公序良俗に違反する行為</li>
            <li>当サービスの運営を妨害する行為</li>
            <li>他のお客様または第三者に不利益を与える行為</li>
          </ul>
        </section>
        <section style={sectionStyle}>
          <h2 style={h2Style}>第3条　免責事項</h2>
          <p style={pStyle}>占いは娯楽・参考情報として提供するものであり、医療・法律・投資アドバイスを目的とするものではありません。鑑定結果に基づく判断・行動の結果について、当サービスは一切の責任を負いません。</p>
        </section>
        <section style={sectionStyle}>
          <h2 style={h2Style}>第4条　知的財産権</h2>
          <p style={pStyle}>当サービスに掲載されているすべてのコンテンツの著作権その他の知的財産権は、Litwill Garden または正当な権利者に帰属します。</p>
        </section>
        <section style={sectionStyle}>
          <h2 style={h2Style}>第5条　サービスの変更・停止</h2>
          <p style={pStyle}>当サービスは、事前の通知なしにサービス内容の変更・一時停止・終了を行う場合があります。</p>
          <p style={pStyle}>本規約は必要に応じて改定することがあります。改定後の規約はサービス上に掲載した時点より効力を生じます。</p>
        </section>
      </div>
    </div>
  );
}
