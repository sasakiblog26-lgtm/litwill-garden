// 納品：RESEND_API_KEY があればメール送信、無ければ outbox にファイル出力。
// 監修(承認)済みのドラフトのみ納品する。
import { createRequire } from "module";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function deliverReport({ id, to, name, reportMarkdown }) {
  const subject = `【Litwill Garden】統合鑑定レポートが完成しました`;
  const intro = `${name || "お客様"} へ\n\nこの度はLitwill Gardenの統合鑑定をご利用いただきありがとうございます。\nAIが西洋占星術・インド占星術・四柱推命・心理学の4つの視点を統合した鑑定レポートをお届けします。\n\n────────────────\n\n`;
  const body = intro + reportMarkdown;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.KANTEI_FROM || "Litwill Garden <noreply@litwillgarden.com>";

  if (!apiKey) {
    const dir = join(__dirname, "outbox");
    mkdirSync(dir, { recursive: true });
    const file = join(dir, `${id}.eml.md`);
    writeFileSync(file, `To: ${to}\nSubject: ${subject}\n\n${body}`, "utf8");
    return { mode: "file", file, note: "RESEND_API_KEY 未設定。outboxにファイル出力（手動送信用）。" };
  }

  const { Resend } = require("resend");
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from, to, subject,
    text: body,
  });
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
  return { mode: "email", id: data?.id, to };
}

// CLI: node deliver.mjs <draftPath> <toEmail> [name]
if (process.argv[1] && process.argv[1].endsWith("deliver.mjs")) {
  const [draftPath, to, name] = process.argv.slice(2);
  if (!draftPath || !to) { console.error("usage: node deliver.mjs <draftPath> <toEmail> [name]"); process.exit(1); }
  const md = readFileSync(draftPath, "utf8");
  if (!/status:\s*approved/.test(md)) {
    console.error("⚠ ドラフトが approved ではありません。監修後 status: approved にしてください。"); process.exit(1);
  }
  const report = md.replace(/^---[\s\S]*?---\n/, ""); // frontmatter除去
  const id = draftPath.split(/[\\/]/).pop().replace(/\..*$/, "");
  deliverReport({ id, to, name, reportMarkdown: report })
    .then((r) => console.log("納品:", JSON.stringify(r, null, 2)))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
