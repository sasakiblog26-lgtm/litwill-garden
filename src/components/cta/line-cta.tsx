import { snsAccounts } from "@/config/sns";

export function LineCta() {
  return (
    <section className="celestial-panel rounded-xl p-6 md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.16em] text-primary">
          DAILY MESSAGE
        </p>
        <h3 className="mb-3 font-heading text-2xl font-black text-text md:text-3xl">
          LINEで心を整えるヒントを受け取る
        </h3>
        <p className="mb-6 text-sm leading-7 text-text-muted md:text-base">
          占い、心理学、セルフケアの小さな問いをお届けします。忙しい日にも、自分の気持ちへ戻るきっかけを。
        </p>
        <a
          href={snsAccounts.line.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#06C755] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#05B34C] hover:shadow-[0_12px_30px_rgba(6,199,85,0.24)]"
        >
          LINEに登録する
        </a>
      </div>
    </section>
  );
}
