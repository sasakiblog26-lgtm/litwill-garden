"use client";

// 「鑑定中」の儀式演出。占い・診断ツール共通。
// 計算自体は一瞬で終わるため、最低表示時間（既定1.8秒）を保証し、
// 段階的なメッセージで没入感（＝鑑定してる感）を毎回安定して出す。
// 全画面オーバーレイなのでライト/ダークどちらのページテーマでも成立する。

import { useCallback, useRef, useState } from "react";

const DEFAULT_MESSAGES = [
  "星々の位置を計算しています",
  "あなたの運命を読み解いています",
];

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export interface RitualState {
  running: boolean;
  message: string;
  run: (task: () => void | Promise<void>, messages?: string[], duration?: number) => Promise<void>;
}

/** 鑑定演出フック。run(task) で task を実行しつつ最低 duration ミリ秒は演出を見せる。 */
export function useReadingRitual(): RitualState {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = useCallback(
    async (task: () => void | Promise<void>, messages = DEFAULT_MESSAGES, duration = 1800) => {
      setRunning(true);
      setMessage(messages[0]);
      const start = Date.now();
      let i = 0;
      const stepMs = Math.max(550, Math.floor(duration / messages.length));
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        i = Math.min(i + 1, messages.length - 1);
        setMessage(messages[i]);
      }, stepMs);

      try {
        await Promise.resolve(task());
      } finally {
        const elapsed = Date.now() - start;
        if (elapsed < duration) {
          await new Promise((r) => setTimeout(r, duration - elapsed));
        }
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setRunning(false);
      }
    },
    [],
  );

  return { running, message, run };
}

/** 鑑定演出オーバーレイ。ページ直下に置き、state を渡す。 */
export function RitualOverlay({ state }: { state: RitualState }) {
  if (!state.running) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at center, rgba(26,10,61,0.96) 0%, rgba(13,7,32,0.98) 70%, rgba(9,5,22,0.99) 100%)",
        backdropFilter: "blur(4px)",
        animation: "lg-ritual-fade 0.4s ease",
      }}
    >
      <style>{RITUAL_KEYFRAMES}</style>

      {/* 回転する黄道十二宮のリング */}
      <div style={{ position: "relative", width: 160, height: 160, marginBottom: 36 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "lg-ritual-spin 14s linear infinite",
          }}
        >
          {ZODIAC_GLYPHS.map((g, idx) => {
            const angle = (idx / ZODIAC_GLYPHS.length) * 2 * Math.PI - Math.PI / 2;
            const r = 70;
            const x = 80 + r * Math.cos(angle);
            const y = 80 + r * Math.sin(angle);
            return (
              <span
                key={g}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  color: "rgba(196,181,253,0.75)",
                  fontSize: 16,
                }}
              >
                {g}
              </span>
            );
          })}
        </div>
        {/* 中心の脈動する星 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "#e9d5ff",
            animation: "lg-ritual-pulse 1.6s ease-in-out infinite",
          }}
        >
          ✦
        </div>
      </div>

      <p
        key={state.message}
        style={{
          fontFamily: "var(--lg-font-heading, 'Shippori Mincho', serif)",
          color: "#f3eeff",
          fontSize: 16,
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "0 24px",
          animation: "lg-ritual-fade 0.5s ease",
        }}
      >
        {state.message}
        <span style={{ animation: "lg-ritual-blink 1.2s steps(3) infinite" }}> …</span>
      </p>
    </div>
  );
}

const RITUAL_KEYFRAMES = `
@keyframes lg-ritual-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes lg-ritual-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
@keyframes lg-ritual-pulse { 0%,100% { transform: scale(1); opacity: .85 } 50% { transform: scale(1.25); opacity: 1 } }
@keyframes lg-ritual-blink { 0% { opacity: .2 } 50% { opacity: 1 } 100% { opacity: .2 } }
@media (prefers-reduced-motion: reduce) {
  [style*="lg-ritual-spin"] { animation: none !important }
  [style*="lg-ritual-pulse"] { animation: none !important }
}
`;
