import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${brand.name} の利用規約です。`,
};

const terms = [
  {
    title: "第1条（適用）",
    content: `本利用規約（以下「本規約」）は、${brand.name}（以下「当サイト」）が提供するサービスの利用条件を定めるものです。ユーザーの皆様には、本規約に従って当サイトをご利用いただきます。`,
  },
  {
    title: "第2条（利用登録）",
    content: "当サイトの一部サービスは、登録なしでご利用いただけます。登録が必要なサービスについては、当サイト所定の方法により登録を行ってください。",
  },
  {
    title: "第3条（コンテンツの目的）",
    content: "当サイトが提供する心理テスト・占い・診断ツール等のコンテンツは、エンターテインメント・自己理解の参考を目的としています。提供情報は医療・法律・財務上のアドバイスを構成するものではありません。人生の重要な決断については、適切な専門家にご相談ください。",
  },
  {
    title: "第4条（禁止事項）",
    content: "ユーザーは、当サイトの利用にあたり、以下の行為を行ってはなりません。\n・法令または公序良俗に違反する行為\n・犯罪行為に関連する行為\n・当サイトのサーバーまたはネットワークの機能を破壊・妨害する行為\n・当サイトのサービスの運営を妨害するおそれのある行為\n・他のユーザーに関する個人情報等を収集または蓄積する行為\n・不正アクセスをし、またはこれを試みる行為\n・他のユーザーに成りすます行為\n・当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為\n・その他、当サイトが不適切と判断する行為",
  },
  {
    title: "第5条（著作権）",
    content: "当サイトに掲載されているコンテンツ（テキスト・画像・診断結果等）の著作権は、当サイトまたは正当な権利者に帰属します。無断での複製・転載・改変等は禁止します。",
  },
  {
    title: "第6条（免責事項）",
    content: "当サイトは、当サイトのコンテンツについて、正確性・完全性・有用性等についていかなる保証も行いません。当サイトの利用によってユーザーに生じた損害について、当サイトは一切の責任を負いません。占い・スピリチュアルコンテンツはエンターテインメントであり、その結果に基づく行動はユーザー自身の判断と責任において行ってください。",
  },
  {
    title: "第7条（サービス内容の変更等）",
    content: "当サイトは、ユーザーへの事前通知なく、サービスの内容の変更・追加・廃止を行う場合があります。",
  },
  {
    title: "第8条（利用規約の変更）",
    content: "当サイトは、必要と判断した場合、本規約を変更することがあります。変更後の本規約は、当サイトに掲載した時点より効力を生じます。",
  },
  {
    title: "第9条（準拠法・裁判管轄）",
    content: "本規約の解釈にあたっては、日本法を準拠法とします。当サイトに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
  },
];

export default function TermsPage() {
  return (
    <div
      style={{ background: "linear-gradient(160deg, #0f0720 0%, #1a0a3d 50%, #0d1127 100%)", minHeight: "100vh" }}
      className="py-16 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-4">✦ TERMS ✦</p>
          <h1 className="text-3xl font-black text-white mb-2">利用規約</h1>
          <p className="text-purple-400 text-sm">最終更新日：2026年5月1日</p>
        </div>

        <div className="space-y-8">
          {terms.map((term, i) => (
            <div
              key={i}
              style={{
                background: "rgba(91,33,182,0.1)",
                border: "1px solid rgba(167,139,250,0.18)",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}
            >
              <h2 className="text-purple-200 font-bold text-sm mb-3">{term.title}</h2>
              <p className="text-purple-100 text-sm leading-relaxed whitespace-pre-line">{term.content}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(91,33,182,0.1)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <p className="text-purple-200 font-bold text-sm mb-3">お問い合わせ</p>
          <p className="text-purple-300 text-sm">
            {brand.operator}
            <br />
            運営責任者：{brand.owner.name}
          </p>
        </div>
      </div>
    </div>
  );
}
