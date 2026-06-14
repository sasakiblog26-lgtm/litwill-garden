// 西洋占星術：太陽星座・月星座・アセンダント・主要天体の黄経（of-date, トロピカル）。
// astronomy-engine の検証済み変換を使用。アセンダントは数値法（東の地平に昇る黄道点）で算出。

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Astronomy = require("astronomy-engine");

export const SIGNS = [
  "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座",
  "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座",
];

const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const norm360 = (x) => ((x % 360) + 360) % 360;

export function signOf(lonDeg) {
  const lon = norm360(lonDeg);
  const idx = Math.floor(lon / 30);
  return { index: idx, name: SIGNS[idx], degInSign: +(lon - idx * 30).toFixed(2), lon: +lon.toFixed(2) };
}

function obliquity(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  return 23.439291 - 0.0130042 * T; // deg
}

// 黄道(λ, β=0) → 赤道(ra hours, dec deg)
function eclToEqua(lonDeg, epsDeg) {
  const l = lonDeg * D2R, e = epsDeg * D2R;
  const ra = Math.atan2(Math.sin(l) * Math.cos(e), Math.cos(l));
  const dec = Math.asin(Math.sin(e) * Math.sin(l));
  return { raHours: norm360(ra * R2D) / 15, decDeg: dec * R2D };
}

// 数値法アセンダント：黄道が地平(高度0)を横切る2点のうち、東側(方位0〜180)の点。
function ascendant(date, lat, lon, eps) {
  const observer = new Astronomy.Observer(lat, lon, 0);
  const sample = (lambda) => {
    const { raHours, decDeg } = eclToEqua(lambda, eps);
    const h = Astronomy.Horizon(date, observer, raHours, decDeg, null);
    return { alt: h.altitude, az: h.azimuth };
  };
  const candidates = [];
  let prev = sample(0);
  for (let deg = 1; deg <= 360; deg++) {
    const L = deg % 360;
    const cur = sample(L);
    if (prev.alt * cur.alt < 0) {
      // 高度0の交点を二分法で精密化
      let lo = deg - 1, hi = deg, loAlt = prev.alt;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        const m = sample(norm360(mid));
        if (m.alt * loAlt > 0) { lo = mid; loAlt = m.alt; } else { hi = mid; }
      }
      const lam = norm360((lo + hi) / 2);
      candidates.push({ lam, az: sample(lam).az });
    }
    prev = cur;
  }
  // 東側(方位0〜180)＝昇る点を採用。複数あれば方位90に最も近いもの。
  const east = candidates.filter((c) => c.az >= 0 && c.az <= 180);
  if (east.length === 0) return candidates.length ? candidates[0].lam : null;
  east.sort((a, b) => Math.abs(a.az - 90) - Math.abs(b.az - 90));
  return east[0].lam;
}

export function computeWestern(dateUTC, lat, lon, timeKnown) {
  const eps = obliquity(dateUTC);
  const sun = Astronomy.SunPosition(dateUTC).elon;
  const moon = Astronomy.EclipticGeoMoon(dateUTC).lon;

  const planetLon = (body) => {
    const gv = Astronomy.GeoVector(body, dateUTC, true);
    return Astronomy.Ecliptic(gv).elon;
  };
  const planets = {
    水星: signOf(planetLon(Astronomy.Body.Mercury)),
    金星: signOf(planetLon(Astronomy.Body.Venus)),
    火星: signOf(planetLon(Astronomy.Body.Mars)),
    木星: signOf(planetLon(Astronomy.Body.Jupiter)),
    土星: signOf(planetLon(Astronomy.Body.Saturn)),
  };

  const out = {
    太陽: signOf(sun),
    月: signOf(moon),
    planets,
    obliquity: +eps.toFixed(4),
  };
  if (timeKnown) {
    const asc = ascendant(dateUTC, lat, lon, eps);
    out.アセンダント = asc == null ? null : signOf(asc);
  } else {
    out.アセンダント = null; // 出生時刻なしでは算出不可
  }
  return out;
}
