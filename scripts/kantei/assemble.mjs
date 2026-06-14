// プロンプト組立：occult_data ＋ 注文情報 → { system, user }。
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function buildPrompt(input, occultData) {
  const system = readFileSync(join(__dirname, "system-prompt.txt"), "utf8");
  const user = [
    "# USER INPUT",
    `birth_date: ${input.birth_date}`,
    `birth_time: ${input.birth_time && input.birth_time !== "unknown" ? input.birth_time : "unknown"}`,
    `birth_place: ${input.birth_place}`,
    `theme: ${input.theme}${input.theme_detail ? " / " + input.theme_detail : ""}`,
    `psych_type: ${input.psych_type || "unknown"}`,
    "",
    "# occult_data（出生図エンジンの算出値。これを唯一の占術根拠とすること）",
    "```json",
    JSON.stringify(occultData, null, 2),
    "```",
    "",
    "上記 occult_data と USER INPUT に基づき、システム指示の7セクション構成で統合鑑定レポートを生成してください。",
  ].join("\n");
  return { system, user };
}
