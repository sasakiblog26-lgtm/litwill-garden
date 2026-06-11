"use client";

import { useEffect, useState } from "react";

type Settings = { font: "m" | "l" | "xl"; contrast: boolean; reduce: boolean };
const KEY = "litwill-display";
const DEFAULTS: Settings = { font: "m", contrast: false, reduce: false };

function read(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return DEFAULTS;
  }
}

// <html> にクラスを反映（head のブートスクリプトと同じ規則）
function apply(s: Settings) {
  const c = document.documentElement.classList;
  c.toggle("ux-font-l", s.font === "l");
  c.toggle("ux-font-xl", s.font === "xl");
  c.toggle("ux-contrast", s.contrast);
  c.toggle("ux-reduce-motion", s.reduce);
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function DisplayPanel({ onClose }: { onClose: () => void }) {
  const [s, setS] = useState<Settings>(DEFAULTS);

  // マウント後にlocalStorageを読む正当なパターン（SSR/hydration安全）
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setS(read()), []);

  const update = (patch: Partial<Settings>) => {
    setS((prev) => {
      const next = { ...prev, ...patch };
      apply(next);
      return next;
    });
  };

  return (
    <>
      <div className="ux-overlay" onClick={onClose} />
      <div className="ux-panel" role="dialog" aria-label="表示設定">
        <div className="ux-panel-head">
          <span className="ux-panel-title">Aa 表示設定（見やすさ）</span>
          <button className="ux-panel-close" aria-label="閉じる" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="ux-panel-body">
          <div className="ux-row">
            <div className="ux-row-label">文字サイズ</div>
            <div className="ux-seg">
              <button className={s.font === "m" ? "is-on" : ""} onClick={() => update({ font: "m" })}>
                標準
              </button>
              <button className={s.font === "l" ? "is-on" : ""} onClick={() => update({ font: "l" })}>
                大
              </button>
              <button className={s.font === "xl" ? "is-on" : ""} onClick={() => update({ font: "xl" })}>
                特大
              </button>
            </div>
          </div>

          <div className="ux-row">
            <div className="ux-row-label">高コントラスト（文字をはっきり）</div>
            <button
              className={`ux-toggle ${s.contrast ? "is-on" : ""}`}
              aria-pressed={s.contrast}
              onClick={() => update({ contrast: !s.contrast })}
            >
              {s.contrast ? "オン" : "オフ"}
            </button>
          </div>

          <div className="ux-row">
            <div className="ux-row-label">背景の動き・装飾を減らす</div>
            <button
              className={`ux-toggle ${s.reduce ? "is-on" : ""}`}
              aria-pressed={s.reduce}
              onClick={() => update({ reduce: !s.reduce })}
            >
              {s.reduce ? "オン" : "オフ"}
            </button>
          </div>

          <button
            className="ux-btn-ghost"
            style={{ width: "100%", marginTop: 4 }}
            onClick={() => update(DEFAULTS)}
          >
            標準に戻す
          </button>
          <p className="ux-muted" style={{ marginTop: 12 }}>
            設定はこの端末に保存され、次回も引き継がれます。
          </p>
        </div>
      </div>
    </>
  );
}
