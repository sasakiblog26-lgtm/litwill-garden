import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNavigation } from "@/config/navigation";
import { snsAccounts } from "@/config/sns";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-[#2D2448]">
      <div className="mx-auto max-w-[1100px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex flex-col leading-none">
              <span
                className="text-[20px] font-semibold tracking-[0.06em] text-[#F0EAF8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="text-[#C0B3DC]">Litwill</span>
                {" "}Garden
              </span>
              <span className="mt-0.5 text-[9px] font-light tracking-[0.12em] text-[#9A95B4]">
                占い × 心理学メディア
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-[1.7] text-[#9A95B4]">
              {brand.description}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={snsAccounts.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A95B4] transition-colors hover:text-[#C0B3DC]"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={snsAccounts.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A95B4] transition-colors hover:text-[#C0B3DC]"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" />
                </svg>
              </a>
              <a
                href={snsAccounts.note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A95B4] transition-colors hover:text-[#C0B3DC]"
                aria-label="note"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4 3C2.34 3 1 4.34 1 6v12c0 1.66 1.34 3 3 3h16c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3H4zm0 2h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm2 3v2h12V8H6zm0 4v2h8v-2H6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4
              className="mb-3 text-[12px] italic tracking-[0.06em] text-[#C0B3DC]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              コンテンツ
            </h4>
            <ul className="flex flex-col gap-2">
              {footerNavigation.content.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#9A95B4] transition-colors hover:text-[#C0B3DC]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4
              className="mb-3 text-[12px] italic tracking-[0.06em] text-[#C0B3DC]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ツール
            </h4>
            <ul className="flex flex-col gap-2">
              {footerNavigation.tools.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#9A95B4] transition-colors hover:text-[#C0B3DC]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4
              className="mb-3 text-[12px] italic tracking-[0.06em] text-[#C0B3DC]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              サイトについて
            </h4>
            <ul className="flex flex-col gap-2">
              {footerNavigation.about.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#9A95B4] transition-colors hover:text-[#C0B3DC]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[rgba(155,139,191,0.10)] pt-5 text-center">
          <p
            className="text-[11px] italic tracking-[0.04em] text-[#9A95B4]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            © {new Date().getFullYear()} Litwill Garden. With Love & Light ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
