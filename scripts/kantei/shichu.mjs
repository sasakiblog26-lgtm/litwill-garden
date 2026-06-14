// 四柱推命：年・月・日・時の四柱（干支）と五行バランス。
// 月柱は二十四節気境界、日柱・時柱も lunar-javascript の検証済み暦算出を使用。
// 入力は「現地時刻（JST）」の年月日時分。出生時刻なしのときは時柱を省く。

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Solar } = require("lunar-javascript");

const GAN_WUXING = { 甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水" };
const ZHI_WUXING = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };

export function computeShichu(y, m, d, hour, minute, timeKnown) {
  // 時刻不明のときは月柱・日柱算出のため正午で計算（時柱は使わない）
  const H = timeKnown ? hour : 12;
  const M = timeKnown ? minute : 0;
  const solar = Solar.fromYmdHms(y, m, d, H, M, 0);
  const ec = solar.getLunar().getEightChar();

  const yearP = ec.getYear();   // 例: 癸酉
  const monthP = ec.getMonth();
  const dayP = ec.getDay();
  const timeP = ec.getTime();
  const dayGan = ec.getDayGan(); // 日干（日主）

  const pillars = [yearP, monthP, dayP];
  if (timeKnown) pillars.push(timeP);

  // 五行カウント（各柱の天干＋地支）
  const elements = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of pillars) {
    const gan = p.charAt(0), zhi = p.charAt(1);
    if (GAN_WUXING[gan]) elements[GAN_WUXING[gan]]++;
    if (ZHI_WUXING[zhi]) elements[ZHI_WUXING[zhi]]++;
  }
  // 最強・最弱
  const sorted = Object.entries(elements).sort((a, b) => b[1] - a[1]);

  return {
    年柱: yearP, 月柱: monthP, 日柱: dayP,
    時柱: timeKnown ? timeP : null,
    日干: dayGan,
    日干五行: GAN_WUXING[dayGan],
    五行バランス: elements,
    最強五行: sorted[0][0],
    最弱五行: sorted[sorted.length - 1][0],
  };
}
