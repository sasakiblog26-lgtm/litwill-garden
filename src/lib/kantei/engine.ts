// 統合鑑定エンジンの WEB 用ラッパー。
// 算出ロジックの唯一の正本は scripts/kantei/*.mjs（M&A資産・属人ゼロ）。
// ここでは型を与えて再エクスポートするだけにし、ロジックを二重化しない。
// 算出エンジンは scripts/kantei に単一実装（JSのまま import・allowJsで解決）。
import { computeOccultData as _computeOccultData } from "../../../scripts/kantei/index.mjs";

export interface SignInfo {
  index: number;
  name: string;
  degInSign: number;
  lon: number;
}

export interface OccultData {
  meta: {
    birth_date: string;
    birth_time: string;
    birth_place: string;
    lat: number;
    lon: number;
    timeKnown: boolean;
    engine: string;
    generatedAt: string;
  };
  西洋占星術: {
    太陽: SignInfo;
    月: SignInfo;
    planets: {
      水星: SignInfo;
      金星: SignInfo;
      火星: SignInfo;
      木星: SignInfo;
      土星: SignInfo;
    };
    obliquity: number;
    アセンダント: SignInfo | null;
  };
  インド占星術: {
    ayanamsa: number;
    月サイデリアル黄経: number;
    ナクシャトラ: { index: number; name: string; pada: number };
    現在のダシャー: { 支配星: string; 期間: string };
    誕生時の開始ダシャー: { 支配星: string; 残り年数: number };
  };
  四柱推命: {
    年柱: string;
    月柱: string;
    日柱: string;
    時柱: string | null;
    日干: string;
    日干五行: string;
    五行バランス: { 木: number; 火: number; 土: number; 金: number; 水: number };
    最強五行: string;
    最弱五行: string;
  };
}

export interface BirthInput {
  birth_date: string; // YYYY-MM-DD
  birth_time?: string; // HH:mm（不明なら省略 or "unknown"）
  birth_place: string; // 日本語の都道府県・市名
}

export function computeOccultData(input: BirthInput): OccultData {
  return _computeOccultData(input) as OccultData;
}
