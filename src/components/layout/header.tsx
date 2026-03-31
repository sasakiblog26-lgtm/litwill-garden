"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** サイトヘッダー（ナビゲーション付き） */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bg-elevated bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-black tracking-tight text-primary">
            LITWILL
          </span>
          <span className="font-heading text-2xl font-black tracking-tight text-text">
            GARDEN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-text-muted hover:bg-bg-elevated lg:hidden"
          aria-label="メニュー"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={cn(
          "border-t border-bg-elevated lg:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-1 px-4 py-3">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
