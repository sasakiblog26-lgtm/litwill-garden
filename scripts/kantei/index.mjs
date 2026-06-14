// 統合鑑定エンジン：出生情報 → occult_data（system prompt v1.1 が受け取る算出値）。
// 西洋(astronomy-engine) / インド(サイデリアル+ダシャー) / 四柱推命(lunar-javascript) を統合。

import { geocodeJP } from "./geo.mjs";
import { computeWestern } from "./western.mjs";
import { computeVedic } from "./vedic.mjs";
import { computeShichu } from "./shichu.mjs";

const TZ_HOURS = 9; // JST固定（v1）。海外対応時は地名からTZを引く。

function parseTime(t) {
  if (!t || t === "unknown") return { known: false, h: 12, m: 0 };
  const mm = String(t).match(/^(\d{1,2}):(\d{2})$/);
  if (!mm) return { known: false, h: 12, m: 0 };
  return { known: true, h: +mm[1], m: +mm[2] };
}

export function computeOccultData(input) {
  const { birth_date, birth_time, birth_place } = input;
  const dm = String(birth_date).match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!dm) throw new Error(`birth_date は YYYY-MM-DD 形式で指定してください: ${birth_date}`);
  const [y, m, d] = [+dm[1], +dm[2], +dm[3]];
  const { known: timeKnown, h, m: min } = parseTime(birth_time);

  const geo = geocodeJP(birth_place);

  // 現地(JST)→UTC のインスタント（天体計算用）。時刻不明は正午JSTで代表。
  const dateUTC = new Date(Date.UTC(y, m - 1, d, h - TZ_HOURS, min, 0));

  const western = computeWestern(dateUTC, geo.lat, geo.lon, timeKnown);
  const vedic = computeVedic(dateUTC, western.月.lon);
  const shichu = computeShichu(y, m, d, h, min, timeKnown);

  return {
    meta: {
      birth_date, birth_time: timeKnown ? birth_time : "unknown",
      birth_place: geo.name, lat: geo.lat, lon: geo.lon,
      timeKnown, engine: "litwill-kantei v1 (astronomy-engine + lunar-javascript)",
      generatedAt: new Date().toISOString(),
    },
    西洋占星術: western,
    インド占星術: vedic,
    四柱推命: shichu,
  };
}
