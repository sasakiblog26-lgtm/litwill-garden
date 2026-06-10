// Litwill Garden PWA サービスワーカー（最小構成）
// 目的: ①インストール可能要件(fetchハンドラ)を満たす ②オフライン時の
// フォールバック ③静的アセットの高速化。記事/診断はネット優先で常に最新。
const CACHE = "litwill-pwa-v1";
const OFFLINE_URL = "/offline";
const PRECACHE = ["/offline", "/icon-192.png", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // ページ遷移（ナビゲーション）: ネット優先。失敗時オフラインページ。
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match(OFFLINE_URL).then((r) => r || Response.error()))
    );
    return;
  }

  // 静的アセット(画像/フォント/_next): キャッシュ優先で取得後に補充。
  const url = new URL(req.url);
  if (url.origin === self.location.origin && /\.(png|jpg|jpeg|svg|webp|ico|woff2?)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          })
      )
    );
  }
});
