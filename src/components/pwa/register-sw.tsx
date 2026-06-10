"use client";

import { useEffect } from "react";

// サービスワーカーを登録する（インストール可能要件＋オフライン対応）。
// UIは描画しない。layout の body 末尾に1つ置く。
export function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* 失敗してもサイトは通常どおり動く */
      });
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
