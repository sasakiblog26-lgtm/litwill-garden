"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const KEY = "litwill-onboarded";

type Step = { emoji: string; title: string; text: string; cta?: { label: string; href: string } };

const STEPS: Step[] = [
  {
    emoji: "🔮",
    title: "リトウィルガーデンへようこそ",
    text: "西洋占星術・四柱推命・タロットを融合した占い×心理学メディアです。30秒で使い方をご案内します。",
  },
  {
    emoji: "✨",
    title: "まずは無料の診断から",
    text: "16タイプ性格診断・今日のタロット・五行診断など、登録不要ですぐ試せます。自分の傾向をつかめます。",
    cta: { label: "無料診断を見る", href: "/tools" },
  },
  {
    emoji: "📖",
    title: "占いコラムで深く知る",
    text: "恋愛・運勢・各占術の読み方など、専門的でやさしい記事をそろえています。気になるテーマを探せます。",
    cta: { label: "コラムを読む", href: "/articles" },
  },
  {
    emoji: "💫",
    title: "もっと深く知りたいときは鑑定",
    text: "あなた専用の文章レポートをお届けします。お試し¥1,000〜。右下の💬案内チャットや🔍検索もいつでもどうぞ。",
    cta: { label: "鑑定メニュー", href: "/readings" },
  },
];

export function OnboardingGuide() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    // 初回訪問のみ自動表示。手動再表示はイベントで受ける。
    let seen = true;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 1200);
      const onOpen = () => {
        setI(0);
        setOpen(true);
      };
      window.addEventListener("litwill:open-guide", onOpen);
      return () => {
        clearTimeout(t);
        window.removeEventListener("litwill:open-guide", onOpen);
      };
    }
    const onOpen = () => {
      setI(0);
      setOpen(true);
    };
    window.addEventListener("litwill:open-guide", onOpen);
    return () => window.removeEventListener("litwill:open-guide", onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  return (
    <div className="ux-onb-overlay" onClick={close}>
      <div className="ux-onb-card" role="dialog" aria-label="使い方ガイド" onClick={(e) => e.stopPropagation()}>
        <div className="ux-onb-emoji">{step.emoji}</div>
        <div className="ux-onb-title">{step.title}</div>
        <p className="ux-onb-text">{step.text}</p>

        <div className="ux-onb-dots">
          {STEPS.map((_, idx) => (
            <span key={idx} className={`ux-onb-dot ${idx === i ? "is-on" : ""}`} />
          ))}
        </div>

        {step.cta && (
          <button
            className="ux-btn-primary"
            style={{ width: "100%", marginBottom: 10 }}
            onClick={() => {
              router.push(step.cta!.href);
              close();
            }}
          >
            {step.cta.label}
          </button>
        )}

        <div className="ux-onb-actions">
          <button className="ux-btn-ghost" onClick={close}>
            スキップ
          </button>
          {last ? (
            <button className="ux-btn-primary" onClick={close}>
              はじめる
            </button>
          ) : (
            <button className="ux-btn-primary" onClick={() => setI((n) => n + 1)}>
              次へ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
