"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "litwill-pwa-install-dismissed";

// 「ホーム画面に追加」を促すバナー。
// - Android/Chrome: beforeinstallprompt を捕まえてワンタップ追加。
// - iOS Safari: 同イベントが無いため「共有→ホーム画面に追加」を案内。
// 既にインストール済み(standalone)や、一度閉じた場合は出さない。
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari 独自フラグ
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua);

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    // iOS は beforeinstallprompt が来ないので、少し待ってから案内を出す。
    // （setState は同期ではなくタイマー内で行い、cascading render を避ける）
    let t: ReturnType<typeof setTimeout> | undefined;
    if (ios) {
      t = setTimeout(() => {
        setIsIOS(true);
        setShow(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      if (t) clearTimeout(t);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="アプリをインストール"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "1rem",
        transform: "translateX(-50%)",
        width: "min(440px, calc(100% - 1.5rem))",
        zIndex: 9999,
        background: "rgba(26,16,51,0.97)",
        border: "1px solid rgba(212,192,144,0.4)",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        padding: "1rem 1.1rem",
        color: "#F3EEFb",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-192.png"
          alt="Litwill"
          width={44}
          height={44}
          style={{ borderRadius: "12px", flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.15rem" }}>
            占い診断をホーム画面に
          </p>
          {isIOS ? (
            <p style={{ fontSize: "0.8rem", lineHeight: 1.7, opacity: 0.9 }}>
              下の <strong>共有ボタン</strong> →「
              <strong>ホーム画面に追加</strong>」でアプリのように使えます。
            </p>
          ) : (
            <p style={{ fontSize: "0.8rem", lineHeight: 1.7, opacity: 0.9 }}>
              アイコンから1タップで起動。毎日の運勢や診断をいつでも。
            </p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", justifyContent: "flex-end" }}>
        <button
          onClick={dismiss}
          style={{
            padding: "0.5rem 0.9rem",
            borderRadius: "999px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.82rem",
            cursor: "pointer",
          }}
        >
          あとで
        </button>
        {!isIOS && (
          <button
            onClick={install}
            style={{
              padding: "0.5rem 1.1rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg,#D4C090,#b89b5e)",
              border: "none",
              color: "#1a1033",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            追加する
          </button>
        )}
      </div>
    </div>
  );
}
