import { snsAccounts } from "@/config/sns";

/** YouTube チャンネル登録CTAコンポーネント */
export function YoutubeCta() {
  return (
    <section className="rounded-xl border border-secondary/30 bg-bg-card p-6 md:p-8">
      <div className="text-center">
        <h3 className="font-heading text-2xl font-black text-secondary mb-2">
          動画で学ぶ Apex 攻略
        </h3>
        <p className="text-text-muted mb-6">
          立ち回り解説・武器レビュー・ランクマッチ実況を配信中。
        </p>
        <a
          href={snsAccounts.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000] px-8 py-3 text-lg font-bold text-white transition-all hover:bg-[#CC0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          チャンネル登録する
        </a>
      </div>
    </section>
  );
}
