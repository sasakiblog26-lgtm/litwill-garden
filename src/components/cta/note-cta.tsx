import { snsAccounts } from "@/config/sns";

/** note 有料記事誘導CTAコンポーネント */
export function NoteCta() {
  return (
    <section className="celestial-panel rounded-xl p-6 md:p-8">
      <div className="text-center">
        <h3 className="font-heading text-2xl font-black text-accent mb-2">
          もっと深く学びたい方へ
        </h3>
        <p className="text-text-muted mb-6">
          note では、自己理解・恋愛心理・占いの深掘り記事を
          <br className="hidden sm:block" />
          静かに読み返せるかたちで公開しています。
        </p>
        <a
          href={snsAccounts.note.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-accent-dark hover:shadow-[0_12px_30px_rgba(201,154,193,0.28)]"
        >
          note で記事を読む
        </a>
      </div>
    </section>
  );
}
