// 検証ランナー：サンプルA/B/C/Dの出生情報でoccult_dataを算出して表示。
// 実行: node scripts/kantei/compute-samples.mjs

import { computeOccultData } from "./index.mjs";

const SAMPLES = [
  { id: "Aさん", birth_date: "1993-08-25", birth_time: "10:15", birth_place: "大阪府", theme: "work" },
  { id: "Bさん", birth_date: "1998-11-12", birth_time: "20:40", birth_place: "福岡県", theme: "love" },
  { id: "Cさん", birth_date: "1985-03-03", birth_time: "unknown", birth_place: "北海道", theme: "life" },
  { id: "Dさん", birth_date: "2000-07-07", birth_time: "05:30", birth_place: "神奈川県", theme: "tarot" },
];

for (const s of SAMPLES) {
  const od = computeOccultData(s);
  const w = od.西洋占星術, v = od.インド占星術, c = od.四柱推命;
  console.log("\n========================================");
  console.log(`${s.id}  ${s.birth_date} ${s.birth_time} ${s.birth_place}  [theme:${s.theme}]  時刻:${od.meta.timeKnown ? "あり" : "なし"}`);
  console.log("----------------------------------------");
  console.log(`西洋  太陽=${w.太陽.name}(${w.太陽.lon}°)  月=${w.月.name}(${w.月.lon}°)  アセン=${w.アセンダント ? w.アセンダント.name : "—(時刻不明)"}`);
  console.log(`      水星=${w.planets.水星.name} 金星=${w.planets.金星.name} 火星=${w.planets.火星.name} 木星=${w.planets.木星.name} 土星=${w.planets.土星.name}`);
  console.log(`インド ナクシャトラ=${v.ナクシャトラ.name}(第${v.ナクシャトラ.pada}パダ)  現ダシャー=${v.現在のダシャー.支配星}(${v.現在のダシャー.期間})  ayan=${v.ayanamsa}`);
  console.log(`四柱  ${c.年柱} ${c.月柱} ${c.日柱} ${c.時柱 ?? "(時柱なし)"}  日干=${c.日干}(${c.日干五行})  最強=${c.最強五行} 最弱=${c.最弱五行}`);
  console.log(`      五行 木${c.五行バランス.木} 火${c.五行バランス.火} 土${c.五行バランス.土} 金${c.五行バランス.金} 水${c.五行バランス.水}`);
}
console.log("");
