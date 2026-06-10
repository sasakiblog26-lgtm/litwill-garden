"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchPanel } from "./search-panel";
import { DisplayPanel } from "./display-panel";
import { AssistantPanel } from "./assistant-panel";
import { TocPanel } from "./toc-panel";

type Panel = "none" | "search" | "display" | "assistant" | "toc";

// ドックの1ボタン（モジュールスコープで定義＝再レンダーで作り直さない）
function DockItem({
  label,
  icon,
  onClick,
  primary,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <div className="ux-dock-item">
      <span className="ux-dock-label">{label}</span>
      <button className={`ux-dock-btn ${primary ? "ux-dock-btn-primary" : ""}`} aria-label={label} onClick={onClick}>
        {icon}
      </button>
    </div>
  );
}

export function FloatingDock() {
  const pathname = usePathname() || "";
  const [panel, setPanel] = useState<Panel>("none");
  const [expanded, setExpanded] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // 記事詳細ページ（/articles/<slug>）のみ目次ボタンを出す
  const isArticle = /^\/articles\/[^/]+$/.test(pathname);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ルート変更でパネル・展開を閉じる
  useEffect(() => {
    setPanel("none");
    setExpanded(false);
  }, [pathname]);

  // 案内ボットからの「検索を開く」イベント
  useEffect(() => {
    const onOpenSearch = () => {
      setPanel("search");
      setExpanded(true);
    };
    window.addEventListener("litwill:open-search", onOpenSearch);
    return () => window.removeEventListener("litwill:open-search", onOpenSearch);
  }, []);

  const open = useCallback((p: Panel) => {
    setPanel(p);
    setExpanded(false);
  }, []);
  const close = useCallback(() => setPanel("none"), []);
  const openGuide = () => window.dispatchEvent(new CustomEvent("litwill:open-guide"));

  return (
    <>
      {panel === "search" && <SearchPanel onClose={close} />}
      {panel === "display" && <DisplayPanel onClose={close} />}
      {panel === "assistant" && <AssistantPanel onClose={close} />}
      {panel === "toc" && isArticle && <TocPanel onClose={close} />}

      <div className="ux-dock">
        {expanded && (
          <>
            {isArticle && <DockItem label="目次" icon="☰" onClick={() => open("toc")} />}
            <DockItem label="サイト内検索" icon="🔍" onClick={() => open("search")} />
            <DockItem label="表示設定（見やすさ）" icon="Aa" onClick={() => open("display")} />
            <DockItem label="使い方ガイド" icon="?" onClick={() => { setExpanded(false); openGuide(); }} />
            <DockItem label="案内チャット" icon="💬" onClick={() => open("assistant")} primary />
          </>
        )}

        {showTop && !expanded && (
          <DockItem label="トップへ戻る" icon="↑" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        )}

        <div className="ux-dock-item">
          <span className="ux-dock-label">{expanded ? "閉じる" : "メニュー"}</span>
          <button
            className="ux-dock-btn ux-dock-trigger ux-dock-btn-primary"
            aria-label={expanded ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "✕" : "✦"}
          </button>
        </div>
      </div>
    </>
  );
}
