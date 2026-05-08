import { snsAccounts } from "@/config/sns";

export function YoutubeCta() {
  return (
    <section className="rounded-xl bg-bg-deep p-6 text-text-on-dark md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.16em] text-secondary">
          VIDEO READING
        </p>
        <h3 className="mb-3 font-heading text-2xl font-black md:text-3xl">
          動画で深める占いと心理学
        </h3>
        <p className="mb-6 text-sm leading-7 text-text-dim md:text-base">
          星座、カード、恋愛心理、自己理解のテーマを、声と映像でわかりやすくお届けします。
        </p>
        <a
          href={snsAccounts.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-accent-dark px-7 py-3 text-sm font-bold text-white transition-all hover:bg-accent hover:shadow-[0_12px_30px_rgba(232,208,224,0.24)]"
        >
          YouTubeを見る
        </a>
      </div>
    </section>
  );
}
