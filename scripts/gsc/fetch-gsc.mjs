// Google Search Console 週次レポート（依存ゼロ・Node標準のみ）。
// サービスアカウントJSON(GSC_SA_KEY)でJWT認証→Search Analytics APIを叩き、
// 「ページ2のゴールドマイン（11〜20位×表示多い）」を抽出してDiscordへ通知する。
//
// 必要な環境変数:
//   GSC_SA_KEY  … サービスアカウントのJSONキー全文
//   GSC_SITE_URL … 例 "https://www.litwillgarden.com/"（URLプレフィックス型）
//                  or "sc-domain:litwillgarden.com"（ドメインプロパティ型）
//   DISCORD_WEBHOOK_CONTENT … （任意）未設定なら標準出力のみ

import crypto from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function b64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  if (!res.ok) throw new Error(`token取得失敗 ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

async function queryGSC(token, siteUrl, body) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GSCクエリ失敗 ${res.status}: ${await res.text()}`);
  return (await res.json()).rows ?? [];
}

async function postDiscord(content) {
  const hook = process.env.DISCORD_WEBHOOK_CONTENT;
  if (!hook) {
    console.log("[Discord未設定] 以下を表示のみ:\n" + content);
    return;
  }
  // Discordは1メッセージ2000字まで。超える場合は分割。
  const chunks = content.match(/[\s\S]{1,1900}/g) ?? [content];
  for (const c of chunks) {
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: c }),
    });
  }
}

async function main() {
  const raw = process.env.GSC_SA_KEY;
  const siteUrl = process.env.GSC_SITE_URL || "https://www.litwillgarden.com/";

  if (!raw) {
    console.log("GSC_SA_KEY 未設定。セットアップ後に有効化されます（今回はスキップ）。");
    return; // 設定前は赤くしない
  }
  const sa = JSON.parse(raw);

  const token = await getAccessToken(sa);

  // GSCは2〜3日のデータ遅延があるため end を3日前に
  const end = new Date(Date.now() - 3 * 86400000);
  const start = new Date(end.getTime() - 90 * 86400000);

  const rows = await queryGSC(token, siteUrl, {
    startDate: ymd(start),
    endDate: ymd(end),
    dimensions: ["query"],
    rowLimit: 1000,
  });

  if (rows.length === 0) {
    await postDiscord(
      `🔍 **GSC週次レポート**（${ymd(start)}〜${ymd(end)}）\nまだ検索データがほとんどありません（インデックス/流入の立ち上がり前）。来週また確認します。`,
    );
    console.log("rows=0");
    return;
  }

  const total = rows.reduce(
    (a, r) => ({ clicks: a.clicks + (r.clicks || 0), impressions: a.impressions + (r.impressions || 0) }),
    { clicks: 0, impressions: 0 },
  );

  // ゴールドマイン: 平均掲載順位 10.5〜20.5 かつ 表示回数が多い
  const IMP_MIN = Number(process.env.GSC_IMP_MIN || 20);
  const goldmine = rows
    .filter((r) => r.position >= 10.5 && r.position <= 20.5 && r.impressions >= IMP_MIN)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 12);

  const top = [...rows].sort((a, b) => b.impressions - a.impressions).slice(0, 5);

  const fmt = (r) => `・「${r.keys[0]}」 ${r.position.toFixed(1)}位 / 表示${r.impressions} / クリック${r.clicks}（CTR${(r.ctr * 100).toFixed(1)}%）`;

  let msg = `🔍 **GSC週次レポート**（${ymd(start)}〜${ymd(end)}・直近90日）\n`;
  msg += `合計: 表示 ${total.impressions} / クリック ${total.clicks} / クエリ数 ${rows.length}\n\n`;
  msg += `⛏ **ゴールドマイン（あと一歩で1ページ目／11〜20位）** ${goldmine.length}件\n`;
  msg += goldmine.length ? goldmine.map(fmt).join("\n") : "該当なし（11〜20位×表示" + IMP_MIN + "以上のKWはまだ）";
  msg += `\n\n📈 **表示回数トップ5**\n` + top.map(fmt).join("\n");
  if (goldmine.length) msg += `\n\n→ /seo-goldmine で上位の記事タイトル等を最適化すると1ページ目に上げやすいです。`;

  await postDiscord(msg);
  console.log(msg);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
