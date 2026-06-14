// 半自動パイプライン：注文(birth+theme) → occult_data算出 → プロンプト組立 →
// AI生成(APIキーあれば自動/なければ手動用) → ドラフト出力(監修待ち)。
// 監修後の納品は deliver.mjs で行う。
//
// 実行: node scripts/kantei/pipeline.mjs scripts/kantei/orders/sample-order.json

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { computeOccultData } from "./index.mjs";
import { buildPrompt } from "./assemble.mjs";
import { generateReport } from "./generate.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function runPipeline(order) {
  const id = order.id || `ord-${Date.now()}`;
  const workDir = join(__dirname, "work");
  const draftDir = join(__dirname, "drafts");
  mkdirSync(workDir, { recursive: true });
  mkdirSync(draftDir, { recursive: true });

  // 1. occult_data 算出
  const occult = computeOccultData(order);
  writeFileSync(join(workDir, `${id}.occult.json`), JSON.stringify(occult, null, 2), "utf8");

  // 2. プロンプト組立（常に保存＝手動生成のフォールバック燃料）
  const { system, user } = buildPrompt(order, occult);
  writeFileSync(join(workDir, `${id}.prompt.md`),
    `<!-- SYSTEM -->\n${system}\n\n<!-- USER -->\n${user}\n`, "utf8");

  // 3. AI生成
  const gen = await generateReport({ system, user });

  // 4. ドラフト出力（監修待ち）
  const fm = [
    "---",
    `order_id: ${id}`,
    `name: ${order.name || ""}`,
    `email: ${order.email || ""}`,
    `theme: ${order.theme}`,
    `mode: ${gen.mode}`,
    `model: ${gen.model || "-"}`,
    `status: ${gen.mode === "auto" ? "pending_review" : "needs_manual_generation"}`,
    `generatedAt: ${new Date().toISOString()}`,
    "---",
    "",
  ].join("\n");

  const draftPath = join(draftDir, `${id}.draft.md`);
  if (gen.mode === "auto") {
    writeFileSync(draftPath, fm + gen.text + "\n", "utf8");
  } else {
    writeFileSync(draftPath,
      fm +
      `> ${gen.note}\n> 手順: work/${id}.prompt.md の SYSTEM と USER を対話セッションに投げ、\n` +
      `> 生成結果でこの本文を差し替え、監修後 status: approved にして deliver.mjs で納品。\n`, "utf8");
  }

  return { id, mode: gen.mode, occultPath: `work/${id}.occult.json`, promptPath: `work/${id}.prompt.md`, draftPath: `drafts/${id}.draft.md`, status: gen.mode === "auto" ? "pending_review" : "needs_manual_generation" };
}

// CLI
if (process.argv[1] && process.argv[1].endsWith("pipeline.mjs")) {
  const orderPath = process.argv[2];
  if (!orderPath) { console.error("usage: node pipeline.mjs <order.json>"); process.exit(1); }
  const order = JSON.parse(readFileSync(orderPath, "utf8"));
  runPipeline(order)
    .then((r) => console.log("パイプライン完了:\n" + JSON.stringify(r, null, 2)))
    .catch((e) => { console.error("失敗:", e.message); process.exit(1); });
}
