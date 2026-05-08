"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span
            className="text-[22px] font-semibold tracking-[0.06em] text-text"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-primary">Litwill</span>
            {" "}Garden
          </span>
          <span className="mt-0.5 text-[9px] font-light tracking-[0.12em] text-text-dim">
            占い × 心理学メディア
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[0.02em] text-text-dim transition-all hover:bg-primary/8 hover:text-text-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-text-dim hover:bg-primary/8 lg:hidden"
          aria-label="メニュー"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={cn("border-t border-primary/10 bg-white/92 lg:hidden", isOpen ? "block" : "hidden")}>
        <div className="space-y-0.5 px-6 py-3">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-primary/8 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
