import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNavigation } from "@/config/navigation";
import { snsAccounts } from "@/config/sns";

/** サイトフッター */
export function Footer() {
  return (
    <footer className="border-t border-bg-elevated bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-black text-primary">
                LITWILL
              </span>{" "}
              <span className="font-heading text-xl font-black text-text">
                GARDEN
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-muted">
              {brand.description}
            </p>
            {/* SNS Links */}
            <div className="mt-4 flex gap-3">
              <a
                href={snsAccounts.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={snsAccounts.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path d="M9.545 15.568V8.432L15.818 12z" fill="#18181B" />
                </svg>
              </a>
              <a
                href={snsAccounts.note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors"
                aria-label="note"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.904 6.075c-.296-.427-1.629-1.702-5.078-1.411-3.449.29-5.322 1.294-5.659 1.502-.337.207-.577.483-.577.483l-.03.03c-.2.203-.324.483-.324.793v10.86c0 .617.5 1.117 1.117 1.117.287 0 .55-.108.748-.286l.016.017s2.218-2.1 4.834-2.363c2.616-.263 4.324.37 4.633.498.31.128.7.07.96-.167.26-.236.383-.567.383-.916V7.024c0-.384-.13-.706-.38-.95h-.643z" />
                  <path d="M8.27 8.912c-.296-.427-1.629-1.702-5.078-1.412C-.258 7.792-2.13 8.795-2.468 9.003c-.337.208-.577.483-.577.483l-.03.03c-.2.204-.324.484-.324.794v10.86c0 .617.5 1.117 1.117 1.117.287 0 .55-.109.748-.287l.016.017s2.218-2.1 4.834-2.363c2.616-.264 4.324.37 4.633.498.31.128.7.07.96-.167.26-.236.383-.567.383-.916V9.862c0-.384-.13-.706-.38-.95H8.27z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="mb-3 font-heading text-sm font-black uppercase tracking-wider text-text-muted">
              コンテンツ
            </h4>
            <ul className="space-y-2">
              {footerNavigation.content.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-dim hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="mb-3 font-heading text-sm font-black uppercase tracking-wider text-text-muted">
              ツール
            </h4>
            <ul className="space-y-2">
              {footerNavigation.tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-dim hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="mb-3 font-heading text-sm font-black uppercase tracking-wider text-text-muted">
              サイトについて
            </h4>
            <ul className="space-y-2">
              {footerNavigation.about.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-dim hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-bg-elevated pt-6 text-center text-xs text-text-dim">
          <p>&copy; {new Date().getFullYear()} {brand.operator}. All rights reserved.</p>
          <p className="mt-1">
            Apex Legends は Electronic Arts Inc. の登録商標です。当サイトは EA
            とは無関係の非公式ファンサイトです。
          </p>
        </div>
      </div>
    </footer>
  );
}
