"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Doc = { type: string; title: string; url: string; category: string; keywords: string };

// 取得したインデックスはモジュールに保持して再取得を防ぐ。
let cache: Doc[] | null = null;

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const [docs, setDocs] = useState<Doc[]>(cache ?? []);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (cache) return;
    let alive = true;
    fetch("/search-index")
      .then((r) => r.json())
      .then((data: Doc[]) => {
        cache = data;
        if (alive) setDocs(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const results = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return docs.filter((d) => d.type !== "article").slice(0, 8); // 初期は診断/主要ページ
    const terms = kw.split(/\s+/);
    return docs
      .map((d) => {
        const hay = `${d.title} ${d.category} ${d.keywords}`.toLowerCase();
        const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
        // タイトル一致を優先
        const titleBonus = d.title.toLowerCase().includes(kw) ? 2 : 0;
        return { d, score: score + titleBonus, all: terms.every((t) => hay.includes(t)) };
      })
      .filter((x) => x.all)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14)
      .map((x) => x.d);
  }, [q, docs]);

  return (
    <>
      <div className="ux-overlay" onClick={onClose} />
      <div className="ux-panel" role="dialog" aria-label="サイト内検索">
        <div className="ux-panel-head">
          <span className="ux-panel-title">🔍 サイト内検索</span>
          <button className="ux-panel-close" aria-label="閉じる" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="ux-panel-body">
          <input
            ref={inputRef}
            className="ux-input"
            placeholder="キーワード（例：恋愛、タロット、相性）"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div style={{ marginTop: 14 }}>
            {results.length === 0 ? (
              <p className="ux-muted">該当する記事・診断が見つかりませんでした。</p>
            ) : (
              results.map((d) => (
                <a key={d.url} href={d.url} className="ux-result" onClick={onClose}>
                  <span className="ux-result-cat">
                    {d.type === "article" ? d.category : d.category}
                  </span>
                  <span className="ux-result-title">{d.title}</span>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
