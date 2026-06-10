"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Chip = { label: string; href?: string; search?: boolean };
type Msg = { role: "bot" | "user"; text: string; chips?: Chip[] };

const GREETING: Msg = {
  role: "bot",
  text: "こんにちは🔮 リトウィルガーデンの案内役です。何をお探しですか？下から選ぶか、ひとことで教えてください。",
  chips: [
    { label: "無料で診断したい", href: "/tools" },
    { label: "鑑定を申し込みたい", href: "/readings" },
    { label: "記事を探したい", search: true },
    { label: "占いの種類を知りたい" },
  ],
};

// ルールベースの意図判定（API不要）。キーワードで返答とリンクを決める。
function reply(input: string): Msg {
  const t = input.toLowerCase();
  const has = (...ks: string[]) => ks.some((k) => t.includes(k));

  if (has("種類", "どんな占い", "違い", "占術")) {
    return {
      role: "bot",
      text: "当サイトは4つの占術を融合しています。気になるものから試せます。",
      chips: [
        { label: "西洋占星術（16タイプ診断）", href: "/tools/16types" },
        { label: "四柱推命（五行診断）", href: "/tools/gogyo" },
        { label: "タロット（1枚引き）", href: "/tools/tarot" },
        { label: "占いの選び方コラム", href: "/articles/muryou-uranai-shindan" },
      ],
    };
  }
  if (has("恋愛", "復縁", "片思い", "結婚", "相手の気持ち", "好きな人")) {
    return {
      role: "bot",
      text: "恋愛のお悩みですね。無料の相性診断で傾向をつかんで、深く知りたいときは恋愛テーマの鑑定がおすすめです。",
      chips: [
        { label: "相性を無料診断", href: "/tools/compatibility" },
        { label: "恋愛・結婚の鑑定", href: "/readings" },
        { label: "恋愛の記事を探す", search: true },
      ],
    };
  }
  if (has("仕事", "転職", "キャリア", "天職")) {
    return {
      role: "bot",
      text: "仕事・転職のお悩みには、生まれ持った性質を読む鑑定が向いています。",
      chips: [
        { label: "仕事・転職の鑑定", href: "/readings" },
        { label: "五行タイプ診断（適職）", href: "/tools/gogyo" },
      ],
    };
  }
  if (has("タロット")) {
    return { role: "bot", text: "タロットは「今この瞬間」を占うのに向いています。", chips: [{ label: "今日のタロットを引く", href: "/tools/tarot" }, { label: "タロットの記事", search: true }] };
  }
  if (has("四柱推命", "五行", "命式")) {
    return { role: "bot", text: "四柱推命は生まれ持った性質や運気の流れを読みます。", chips: [{ label: "五行タイプ診断", href: "/tools/gogyo" }] };
  }
  if (has("星座", "占星術", "ホロスコープ", "性格")) {
    return { role: "bot", text: "性格や運勢の傾向は、占星術ベースの診断が分かりやすいです。", chips: [{ label: "16タイプ性格診断", href: "/tools/16types" }, { label: "星座占い", href: "/tools/zodiac" }] };
  }
  if (has("相性")) {
    return { role: "bot", text: "相性診断はこちらからどうぞ。", chips: [{ label: "相性を無料診断", href: "/tools/compatibility" }, { label: "相性の鑑定", href: "/readings" }] };
  }
  if (has("料金", "値段", "価格", "いくら", "費用")) {
    return { role: "bot", text: "鑑定はお試し¥1,000〜ご用意しています。テーマと内容は鑑定メニューでご確認ください。", chips: [{ label: "鑑定メニュー・料金", href: "/readings" }] };
  }
  if (has("無料", "ためし", "お試し", "診断")) {
    return { role: "bot", text: "無料で試せる診断がそろっています。", chips: [{ label: "無料診断の一覧", href: "/tools" }] };
  }
  if (has("鑑定", "申込", "申し込み", "相談", "占ってほしい", "占って")) {
    return { role: "bot", text: "鑑定は文章レポート（メール納品）でお届けします。テーマを選んで申し込めます。", chips: [{ label: "鑑定を申し込む", href: "/readings" }] };
  }

  // デフォルト
  return {
    role: "bot",
    text: "なるほど。関連する記事や診断を探してみますね。キーワード検索か、下のメニューからどうぞ。",
    chips: [
      { label: "記事を検索する", search: true },
      { label: "無料診断を見る", href: "/tools" },
      { label: "鑑定メニュー", href: "/readings" },
    ],
  };
}

export function AssistantPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const onChip = (c: Chip) => {
    setMsgs((m) => [...m, { role: "user", text: c.label }]);
    if (c.search) {
      onClose();
      window.dispatchEvent(new CustomEvent("litwill:open-search"));
      return;
    }
    if (c.href) {
      router.push(c.href);
      onClose();
    }
  };

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }, reply(text)]);
  };

  return (
    <>
      <div className="ux-overlay" onClick={onClose} />
      <div className="ux-panel" role="dialog" aria-label="案内チャット">
        <div className="ux-panel-head">
          <span className="ux-panel-title">💬 案内チャット</span>
          <button className="ux-panel-close" aria-label="閉じる" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="ux-panel-body" ref={bodyRef}>
          <div className="ux-chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <div className={`ux-bubble ${m.role === "bot" ? "ux-bubble-bot" : "ux-bubble-user"}`}>
                  {m.text}
                </div>
                {m.chips && (
                  <div className="ux-chips">
                    {m.chips.map((c) => (
                      <button key={c.label} className="ux-chip" onClick={() => onChip(c)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <input
            className="ux-input"
            placeholder="ひとことで質問（例：復縁したい）"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();
            }}
          />
          <button className="ux-btn-primary" style={{ padding: "0 16px" }} onClick={onSend}>
            送信
          </button>
        </div>
      </div>
    </>
  );
}

// 占いはエンタメ。案内ボットは情報の道案内のみ（鑑定の断定はしない）。
