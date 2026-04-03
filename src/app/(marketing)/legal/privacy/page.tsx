import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { brand } from "@/config/brand";
import { Breadcrumb } from "@/components/seo/breadcrumb";

export const metadata: Metadata = createMetadata({
  title: "プライバシーポリシー",
  description: `${brand.name} のプライバシーポリシー。個人情報の取り扱いについて説明しています。`,
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "プライバシーポリシー" },
        ]}
      />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          プライバシーポリシー
        </h1>
        <p className="mt-3 text-sm text-text-dim">最終更新日: 2026年3月1日</p>
      </header>

      <div className="space-y-8 text-text-muted">
        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            1. 個人情報の定義
          </h2>
          <p>
            本プライバシーポリシーにおける「個人情報」とは、個人情報保護法に定める個人情報を指し、
            氏名、メールアドレス、その他の記述等により特定の個人を識別できる情報を含みます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            2. 個人情報の収集方法
          </h2>
          <p>
            当サイトでは、以下の場合に個人情報を収集することがあります。
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>お問い合わせフォームを通じたご連絡時</li>
            <li>LINE公式アカウントへの友だち登録時</li>
            <li>メールマガジンの登録時</li>
            <li>アンケートへのご回答時</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            3. 個人情報の利用目的
          </h2>
          <p>収集した個人情報は、以下の目的で利用いたします。</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>お問い合わせへの回答・対応</li>
            <li>攻略情報やアップデート情報の配信</li>
            <li>サービスの改善・新機能の開発</li>
            <li>統計データの作成（個人を特定できない形式）</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            4. 個人情報の第三者提供
          </h2>
          <p>
            当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            5. Cookie（クッキー）の使用
          </h2>
          <p>
            当サイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用しています。
            Cookieの使用を望まない場合は、ブラウザの設定から無効にすることができます。
            ただし、一部のサービスが正常に動作しなくなる可能性があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            6. アクセス解析ツール
          </h2>
          <p>
            当サイトでは、Googleアナリティクスを利用してアクセス情報を収集しています。
            Googleアナリティクスではデータの収集のためにCookieを使用しています。
            このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            7. 広告配信について
          </h2>
          <p>
            当サイトでは、第三者配信の広告サービスを利用する場合があります。
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            8. 個人情報の安全管理
          </h2>
          <p>
            当サイトは、個人情報の漏洩・滅失・毀損の防止のために、適切なセキュリティ対策を講じます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            9. プライバシーポリシーの変更
          </h2>
          <p>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、
            ユーザーに通知することなく変更できるものとします。
            変更後のプライバシーポリシーは、本ページに掲載した時点より効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-bold text-text">
            10. お問い合わせ
          </h2>
          <p>
            本ポリシーに関するお問い合わせは、下記までご連絡ください。
          </p>
          <div className="mt-3 rounded-lg border border-bg-elevated bg-bg-card p-4">
            <p className="font-bold text-text">{brand.operator}</p>
            <p className="text-sm">運営責任者: {brand.owner.name}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
