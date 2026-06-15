// occult_data → 命式（四柱推命）の表示用データ（テンプレート・APIコスト0）。
// 命式は生年月日時（JST）から導く四柱（年・月・日・時）の干支。出生地に依存しない。

import type { OccultData } from "./engine";

export interface Pillar {
  label: string; // 年柱/月柱/日柱/時柱
  value: string | null; // 干支（例: 癸酉）。時刻不明なら時柱は null
}

export interface MeishikiResult {
  birthLabel: string;
  pillars: Pillar[];
  dayMaster: { gan: string; yomi: string; element: string; body: string }; // 日干（日主）
  gogyo: { counts: Record<string, number>; strongest: string; weakest: string; note: string };
  timeKnown: boolean;
}

// 日干（日主）＝あなた自身を表す。10干それぞれの本質。
const DAY_MASTER: Record<string, { yomi: string; element: string; body: string }> = {
  甲: { yomi: "きのえ・陽の木", element: "木", body: "大樹のような人。まっすぐ上へ伸びる向上心と、人を引っ張るリーダーの素質を持ちます。" },
  乙: { yomi: "きのと・陰の木", element: "木", body: "草花のような人。柔軟で協調的、しなやかに環境へ適応する粘り強さがあります。" },
  丙: { yomi: "ひのえ・陽の火", element: "火", body: "太陽のような人。明るく情熱的で、周囲を照らす華やかさと発信力を持ちます。" },
  丁: { yomi: "ひのと・陰の火", element: "火", body: "灯火のような人。繊細で芯が強く、内側に静かな情熱と探究心を秘めています。" },
  戊: { yomi: "つちのえ・陽の土", element: "土", body: "山岳のような人。どっしりと安定し、信頼される包容力とスケールの大きさがあります。" },
  己: { yomi: "つちのと・陰の土", element: "土", body: "田畑のような人。面倒見がよく、人や物事を育て支える堅実さと現実感覚を持ちます。" },
  庚: { yomi: "かのえ・陽の金", element: "金", body: "鉱石や刀のような人。決断力と行動力に富み、筋を通す強さと正義感があります。" },
  辛: { yomi: "かのと・陰の金", element: "金", body: "宝石のような人。繊細な美意識と高いプライド、磨かれた感性で物事を見極めます。" },
  壬: { yomi: "みずのえ・陽の水", element: "水", body: "大海のような人。スケールが大きく自由で、知的かつ大胆に道を切り拓きます。" },
  癸: { yomi: "みずのと・陰の水", element: "水", body: "雨露のような人。繊細で優しく、鋭い直感と人を潤す知性を備えています。" },
};

const GOGYO_NOTE: Record<string, string> = {
  木: "成長・前進する力が強め。目標に向かって伸びる場面で輝きます。",
  火: "情熱・表現の力が強め。人を惹きつけ、発信する場面で輝きます。",
  土: "安定・継続の力が強め。支える・積み上げる役回りで信頼を集めます。",
  金: "決断・美意識の力が強め。筋を通す・見極める場面で真価が出ます。",
  水: "知性・柔軟の力が強め。考える・適応する場面で突破口を開きます。",
};

export function buildMeishiki(d: OccultData): MeishikiResult {
  const s = d.四柱推命;
  const [y, m, day] = d.meta.birth_date.split("-").map((n) => parseInt(n, 10));
  const dm = DAY_MASTER[s.日干] ?? { yomi: "", element: s.日干五行, body: "" };

  return {
    birthLabel: `${y}年${m}月${day}日生まれ`,
    pillars: [
      { label: "年柱", value: s.年柱 },
      { label: "月柱", value: s.月柱 },
      { label: "日柱", value: s.日柱 },
      { label: "時柱", value: s.時柱 },
    ],
    dayMaster: { gan: s.日干, yomi: dm.yomi, element: dm.element, body: dm.body },
    gogyo: {
      counts: s.五行バランス,
      strongest: s.最強五行,
      weakest: s.最弱五行,
      note: `あなたの命式でいちばん強い五行は「${s.最強五行}」、弱いのは「${s.最弱五行}」。${GOGYO_NOTE[s.最強五行] ?? ""}`,
    },
    timeKnown: d.meta.timeKnown,
  };
}
