// AI生成：ANTHROPIC_API_KEY があれば Claude API で自動生成、無ければ手動生成モード。
// 依存追加なし（fetch直叩き）。モデルは KANTEI_MODEL で上書き可（既定 claude-opus-4-8）。

export async function generateReport({ system, user }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.KANTEI_MODEL || "claude-opus-4-8";

  if (!apiKey) {
    return {
      mode: "manual",
      model: null,
      text: null,
      note: "ANTHROPIC_API_KEY 未設定。組立済みプロンプトを対話セッション(サブスク=無料)に貼って生成してください。",
    };
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("").trim();
  return { mode: "auto", model, text, usage: data.usage };
}
