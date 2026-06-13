// LINE公式アカウント 週次ブロードキャスト（DB不要・無料）
// content/articles/ の最新記事からダイジェストを組み、LINEの broadcast API で
// 全友だちへ一斉配信する。購読者DBは不要（LINE側が友だち全員へ配信）。
// 環境変数 LINE_CHANNEL_ACCESS_TOKEN が未設定なら何もせず正常終了。
//
// 実行: node scripts/line-weekly-broadcast.mjs
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const SITE = "https://www.litwillgarden.com";
const ARTICLES_DIR = join(process.cwd(), "content", "articles");

// --- frontmatter から title/date/excerpt を最小パース ---
function parseArticle(file) {
  const raw = readFileSync(join(ARTICLES_DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = m[1];
  const pick = (key) => {
    const r = fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"));
    return r ? r[1].trim() : "";
  };
  const slug = file.replace(/\.md$/, "");
  return { slug, title: pick("title"), date: pick("date"), excerpt: pick("excerpt") };
}

function latestArticles(n) {
  const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parseArticle)
    .filter((a) => a && a.title && a.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, n);
}

const TOKUSHOHO_FOOTER =
  "\n\n---\n■ 配信解除について\n" +
  "このアカウントをブロックすると配信が停止されます。\n" +
  "運営: Litwill Garden（" + SITE + "/tokushoho）";

function buildMessage() {
  const arts = latestArticles(3);
  if (arts.length === 0) return null;
  let body = "🌙 Litwill Garden｜今週のおすすめコラム\n\n";
  for (const a of arts) {
    const ex = a.excerpt.length > 50 ? a.excerpt.slice(0, 50) + "…" : a.excerpt;
    body += `✦ ${a.title}\n${ex}\n→ ${SITE}/articles/${a.slug}?utm_source=line\n\n`;
  }
  body += `占いはエンターテインメントとしてお楽しみください🔮\n`;
  body += `無料の星座診断はこちら → ${SITE}/diagnosis?utm_source=line`;
  body += TOKUSHOHO_FOOTER;
  return body;
}

async function main() {
  const text = buildMessage();
  if (!text) {
    console.log("記事が見つからないため配信スキップ。");
    return;
  }
  if (!TOKEN) {
    console.log("DRY-RUN: LINE_CHANNEL_ACCESS_TOKEN 未設定のため配信しません。本文プレビュー:\n");
    console.log(text);
    return;
  }
  const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ messages: [{ type: "text", text }] }),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error(`LINE broadcast 失敗: ${res.status} ${t}`);
    process.exit(1);
  }
  console.log("LINE 週次ブロードキャスト送信完了（全友だち宛）。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
