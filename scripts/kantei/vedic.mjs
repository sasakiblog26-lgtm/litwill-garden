// インド占星術：ラヒリ・アヤナムシャによるサイデリアル化、ナクシャトラ、ヴィムショッタリ・ダシャー。
// 月の黄経（トロピカル）を入力にとる（westernのEclipticGeoMoonと同源）。

const norm360 = (x) => ((x % 360) + 360) % 360;

export const NAKSHATRA = [
  "アシュヴィニー", "バラニー", "クリッティカー", "ローヒニー", "ムリガシラー",
  "アールドラー", "プナルヴァス", "プシュヤ", "アーシュレーシャー", "マガー",
  "プールヴァ・パールグニー", "ウッタラ・パールグニー", "ハスタ", "チトラー", "スヴァーティー",
  "ヴィシャーカー", "アヌラーダー", "ジェーシュター", "ムーラ", "プールヴァ・アーシャーダー",
  "ウッタラ・アーシャーダー", "シュラヴァナ", "ダニシュター", "シャタビシャー",
  "プールヴァ・バードラパダー", "ウッタラ・バードラパダー", "レーヴァティー",
];

// ヴィムショッタリ：支配星の並びと年数（合計120年）
const DASHA_LORDS = ["ケートゥ", "金星", "太陽", "月", "火星", "ラーフ", "木星", "土星", "水星"];
const DASHA_YEARS = { ケートゥ: 7, 金星: 20, 太陽: 6, 月: 10, 火星: 7, ラーフ: 18, 木星: 16, 土星: 19, 水星: 17 };

// ラヒリ・アヤナムシャ（近似）：J2000.0で約23.8523°、歳差50.2719"/年
function lahiriAyanamsa(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const yearFrac = 2000.0 + (jd - 2451545.0) / 365.25;
  return 23.8523 + (yearFrac - 2000.0) * 0.0139644;
}

const NAK_DEG = 360 / 27; // 13.3333...

export function computeVedic(dateUTC, tropicalMoonLon) {
  const ayan = lahiriAyanamsa(dateUTC);
  const sidMoon = norm360(tropicalMoonLon - ayan);
  const nakIndex = Math.floor(sidMoon / NAK_DEG);
  const within = sidMoon - nakIndex * NAK_DEG;
  const pada = Math.floor(within / (NAK_DEG / 4)) + 1;
  const fraction = within / NAK_DEG; // ナクシャトラ内の進行率(0..1)

  // ヴィムショッタリ：誕生時の月ナクシャトラ支配星から開始
  const startLord = DASHA_LORDS[nakIndex % 9];
  const balanceYears = (1 - fraction) * DASHA_YEARS[startLord]; // 開始ダシャーの残り

  // 誕生から現在までを歩いて現在のマハーダシャーを特定
  const birth = dateUTC.getTime();
  const now = Date.now();
  const yearsElapsed = (now - birth) / (365.2425 * 86400000);

  const seq = [];
  let lordIdx = nakIndex % 9;
  let cursor = 0; // 誕生からの累積年
  // 最初の(部分)ダシャー
  seq.push({ lord: startLord, from: 0, to: balanceYears });
  cursor = balanceYears;
  // 以降フル期間で追加（現在を十分超えるまで）
  while (cursor < yearsElapsed + 0.0001 || seq.length < 2) {
    lordIdx = (lordIdx + 1) % 9;
    const lord = DASHA_LORDS[lordIdx];
    const dur = DASHA_YEARS[lord];
    seq.push({ lord, from: cursor, to: cursor + dur });
    cursor += dur;
    if (seq.length > 30) break;
  }
  const current = seq.find((s) => yearsElapsed >= s.from && yearsElapsed < s.to) || seq[0];

  const toDate = (yearsFromBirth) => new Date(birth + yearsFromBirth * 365.2425 * 86400000)
    .toISOString().slice(0, 10);

  return {
    ayanamsa: +ayan.toFixed(3),
    月サイデリアル黄経: +sidMoon.toFixed(2),
    ナクシャトラ: { index: nakIndex, name: NAKSHATRA[nakIndex], pada },
    現在のダシャー: {
      支配星: current.lord,
      期間: `${toDate(current.from)} 〜 ${toDate(current.to)}`,
    },
    誕生時の開始ダシャー: { 支配星: startLord, 残り年数: +balanceYears.toFixed(2) },
  };
}
