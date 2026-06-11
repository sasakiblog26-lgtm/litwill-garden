"use client";

import { useEffect, useState } from "react";

type Head = { id: string; text: string; level: 2 | 3 };

// 記事本文（dangerouslySetInnerHTML で描画）の h2/h3[id] を走査して目次を作る。
export function TocPanel({ onClose }: { onClose: () => void }) {
  const [heads, setHeads] = useState<Head[]>([]);

  // マウント後にDOMを走査して目次を生成する正当なパターン（SSR/hydration安全）
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("main h2[id], main h3[id]")
    );
    // マウント直後のDOM読み取り後のsetState。useState初期化関数では取れないためこのパターンが正しい
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeads(
      nodes.map((n) => ({
        id: n.id,
        text: n.textContent?.trim() || "",
        level: n.tagName === "H3" ? 3 : 2,
      }))
    );
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    onClose();
  };

  return (
    <>
      <div className="ux-overlay" onClick={onClose} />
      <div className="ux-panel" role="dialog" aria-label="目次">
        <div className="ux-panel-head">
          <span className="ux-panel-title">☰ 目次</span>
          <button className="ux-panel-close" aria-label="閉じる" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="ux-panel-body">
          {heads.length === 0 ? (
            <p className="ux-muted">この記事には目次がありません。</p>
          ) : (
            heads.map((h) => (
              <button
                key={h.id}
                className={`ux-toc-link ${h.level === 3 ? "ux-toc-l3" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}
                onClick={() => go(h.id)}
              >
                {h.text}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
