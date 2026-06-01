import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPolicyPage() {
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

  const sectionStyle: CSSProperties = {
    marginBottom: "32px",
  };

  const h2Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "18px",
    color: "var(--text-primary)",
    margin: "0 0 12px",
  };

  const pStyle: CSSProperties = {
    fontSize: "15px",
    lineHeight: 1.9,
    color: "var(--text-secondary)",
    margin: 0,
  };

  return (
    <div style={outerStyle}>
      <h1 style={h1Style}>プライバシーポリシー</h1>

      <div>
        {/* 1 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>1. 収集する情報</h2>
          <p style={pStyle}>
            鑑定お申し込みの際に、以下の情報をお預かりいたします。氏名・メールアドレス・生年月日・出生時刻・出生地・ご相談内容。これらの情報は、鑑定サービスの提供に必要な範囲でのみ利用します。
          </p>
        </section>

        {/* 2 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>2. 利用目的</h2>
          <p style={pStyle}>
            お預かりした個人情報は、鑑定サービスの提供・サービス品質の向上・お問い合わせへの対応を目的として利用いたします。上記以外の目的には使用しません。
          </p>
        </section>

        {/* 3 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3. 第三者提供</h2>
          <p style={pStyle}>
            法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することは一切ありません。
          </p>
        </section>

        {/* 4 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>4. 保管・管理</h2>
          <p style={pStyle}>
            個人情報の漏洩・滅失・毀損を防ぐため、SSL暗号化通信・アクセス制限・定期的な見直しを実施し、適切な安全管理措置を講じています。
          </p>
        </section>

        {/* 5 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>5. 開示・訂正・削除</h2>
          <p style={pStyle}>
            お客様ご自身の個人情報について、開示・訂正・削除のご要望がある場合は、お問い合わせフォームよりご連絡ください。内容を確認の上、速やかに対応いたします。
          </p>
        </section>

        {/* 6 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>6. お問い合わせ</h2>
          <p style={pStyle}>
            本プライバシーポリシーに関するお問い合わせは、下記よりご連絡ください。<br />
            <span style={{ color: "#9B8BBF" }}>litwillgarden.com/contact</span>
          </p>
        </section>
      </div>
    </div>
  );
}
