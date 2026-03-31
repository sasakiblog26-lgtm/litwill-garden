import { snsAccounts } from "@/config/sns";

/** LINE公式アカウント登録CTAコンポーネント */
export function LineCta() {
  return (
    <section className="rounded-xl border border-primary/30 bg-bg-card p-6 md:p-8">
      <div className="text-center">
        <h3 className="font-heading text-2xl font-black text-primary mb-2">
          LINE で攻略情報を受け取ろう
        </h3>
        <p className="text-text-muted mb-6">
          最新のメタ情報・攻略記事・プロ設定の更新をいち早くお届け。
          <br className="hidden sm:block" />
          あなたのランクに合わせた上達Tipsも配信中。
        </p>
        <a
          href={snsAccounts.line.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#06C755] px-8 py-3 text-lg font-bold text-white transition-all hover:bg-[#05B34C] hover:shadow-[0_0_20px_rgba(6,199,85,0.4)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .348-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .349-.281.63-.63.63h-2.386c-.345 0-.627-.281-.627-.63V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.627-.631.627-.346 0-.626-.283-.626-.627V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.627-.631.627-.345 0-.627-.283-.627-.627V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.627H4.917c-.345 0-.63-.281-.63-.627V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .346-.281.631-.629.631M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          友だち追加する
        </a>
        <p className="mt-3 text-xs text-text-dim">
          無料で登録できます。配信停止もいつでも可能です。
        </p>
      </div>
    </section>
  );
}
