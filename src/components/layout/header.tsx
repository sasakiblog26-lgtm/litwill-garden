"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-3.5 md:px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span
            className="text-[22px] font-semibold tracking-[0.06em] text-text"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-primary">Litwill</span> Garden
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-text-dim">
            占いと心理学のメディア
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-text-muted transition-all hover:bg-primary/10 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 text-text-muted hover:bg-primary/10 lg:hidden"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <nav className={cn("border-t border-primary/10 bg-white/95 lg:hidden", isOpen ? "block" : "hidden")}>
        <div className="space-y-1 px-5 py-3">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:bg-primary/10 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
