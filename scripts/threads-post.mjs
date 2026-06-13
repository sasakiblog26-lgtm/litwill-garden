// Threads 自動投稿（最新記事を1本告知・テキスト＋リンク）
// Meta Threads API（2段階: コンテナ作成→公開）。購読者DB不要・Claude/API不要。
// 環境変数 THREADS_USER_ID / THREADS_ACCESS_TOKEN が未設定ならDRY-RUN（本文プレビューのみ）。
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const USER_ID = process.env.THREADS_USER_ID || "";
const TOKEN = process.env.THREADS_ACCESS_TOKEN || "";
const SITE = "https://www.litwillgarden.com";
const ARTICLES_DIR = join(process.cwd(), "content", "articles");
const GRAPH = "https://graph.threads.net/v1.0";

function parseArticle(file) {
  const raw = readFileSync(join(ARTICLES_DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = m[1];
  const pick = (k) => {
    const r = fm.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, "m"));
    return r ? r[1].trim() : "";
  };
  return { slug: file.replace(/\.md$/, ""), title: pick("title"), date: pick("date"), excerpt: pick("excerpt"), category: pick("category") };
}

function latest() {
  const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map(parseArticle).filter((a) => a && a.title && a.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
}

function buildText(a) {
  // Threadsは500字上限。フック＋抜粋＋リンク＋エンタメ明記。
  const title = a.title.split("｜")[0].trim();
  let ex = a.excerpt || "";
  if (ex.length > 90) ex = ex.slice(0, 90) + "…";
  let t = `🌙${title}\n\n${ex}\n\n占いはエンタメとしてお楽しみください🔮\n続きはこちら→ ${SITE}/articles/${a.slug}?utm_source=threads`;
  if (t.length > 490) t = t.slice(0, 487) + "…";
  return t;
}

async function post(text) {
  // 1) コンテナ作成
  const createUrl = `${GRAPH}/${USER_ID}/threads`;
  const c = await fetch(createUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ media_type: "TEXT", text, access_token: TOKEN }),
  });
  if (!c.ok) throw new Error(`container作成失敗: ${c.status} ${await c.text()}`);
  const { id: creationId } = await c.json();
  // Threadsはコンテナ作成後、公開まで数秒の待機を推奨
  await new Promise((r) => setTimeout(r, 5000));
  // 2) 公開
  const pubUrl = `${GRAPH}/${USER_ID}/threads_publish`;
  const p = await fetch(pubUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: creationId, access_token: TOKEN }),
  });
  if (!p.ok) throw new Error(`公開失敗: ${p.status} ${await p.text()}`);
  return (await p.json()).id;
}

async function main() {
  const a = latest();
  if (!a) { console.log("記事なし。スキップ。"); return; }
  const text = buildText(a);
  if (!USER_ID || !TOKEN) {
    console.log("DRY-RUN: THREADS_USER_ID/THREADS_ACCESS_TOKEN 未設定。本文プレビュー:\n");
    console.log(text);
    console.log(`\n文字数: ${text.length}`);
    return;
  }
  const id = await post(text);
  console.log(`Threads投稿完了: ${a.slug}（post id: ${id}）`);
}

main().catch((e) => { console.error(e); process.exit(1); });
