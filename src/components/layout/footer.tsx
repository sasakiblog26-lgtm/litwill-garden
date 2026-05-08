import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNavigation } from "@/config/navigation";
import { snsAccounts } from "@/config/sns";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-bg-deep">
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex flex-col leading-none">
              <span
                className="text-[22px] font-semibold tracking-[0.06em] text-text-on-dark"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="text-primary-light">Litwill</span> Garden
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-text-dim">
                占いと心理学のメディア
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-7 text-text-dim">
              {brand.description}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                snsAccounts.twitter,
                snsAccounts.youtube,
                snsAccounts.note,
              ].map((account) => (
                <a
                  key={account.label}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold text-text-dim transition-colors hover:border-primary-light hover:text-primary-light"
                >
                  {account.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="コンテンツ" items={footerNavigation.content} />
          <FooterColumn title="診断ツール" items={footerNavigation.tools} />
          <FooterColumn title="サイト情報" items={footerNavigation.about} />
        </div>

        <div className="mt-10 border-t border-primary/10 pt-5 text-center">
          <p
            className="text-[12px] italic tracking-[0.04em] text-text-dim"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            (c) {new Date().getFullYear()} Litwill Garden. With Love & Light.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-[12px] font-bold tracking-[0.08em] text-primary-light">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[13px] text-text-dim transition-colors hover:text-primary-light"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
