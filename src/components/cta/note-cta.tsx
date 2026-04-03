import { snsAccounts } from "@/config/sns";

/** note 有料記事誘導CTAコンポーネント */
export function NoteCta() {
  return (
    <section className="rounded-xl border border-accent/30 bg-bg-card p-6 md:p-8">
      <div className="text-center">
        <h3 className="font-heading text-2xl font-black text-accent mb-2">
          もっと深く学びたい方へ
        </h3>
        <p className="text-text-muted mb-6">
          note では、ランク別の詳細な立ち回りガイドや
          <br className="hidden sm:block" />
          チームの実戦から得たノウハウを有料記事で公開中。
        </p>
        <a
          href={snsAccounts.note.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
        >
          note で記事を読む
        </a>
      </div>
    </section>
  );
}
