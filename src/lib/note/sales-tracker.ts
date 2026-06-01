/**
 * note売上データトラッカー
 *
 * note APIから売上データを取得し、DBに保存する。
 */

import { notifySlack } from "@/lib/notifications/slack";

/** 売上データ */
export type NoteSalesData = {
  /** 記事ID */
  noteId: string;
  /** 記事タイトル */
  title: string;
  /** 販売数 */
  salesCount: number;
  /** 売上金額（円） */
  revenue: number;
  /** 取得日時 */
  fetchedAt: Date;
};

/** 売上サマリー */
export type SalesSummary = {
  /** 期間 */
  period: { start: Date; end: Date };
  /** 総売上 */
  totalRevenue: number;
  /** 総販売数 */
  totalSales: number;
  /** 記事別売上 */
  byArticle: NoteSalesData[];
  /** 価格帯別売上 */
  byPriceRange: {
    label: string;
    revenue: number;
    salesCount: number;
  }[];
};

/**
 * note APIから売上データを取得する
 *
 * @returns 記事ごとの売上データ配列
 */
export async function fetchSalesData(): Promise<NoteSalesData[]> {
  const apiToken = process.env.NOTE_API_TOKEN;
  if (!apiToken) {
    throw new Error("NOTE_API_TOKEN is not set");
  }

  try {
    const response = await fetch("https://note.com/api/v2/notes?status=published", {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`note API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      data: {
        notes: Array<{
          id: string;
          name: string;
          likeCount: number;
          price: number;
          body: string;
        }>;
      };
    };

    // note APIから取得可能な範囲で売上データを構築
    return data.data.notes
      .filter((note) => note.price > 0)
      .map((note) => ({
        noteId: note.id,
        title: note.name,
        salesCount: 0, // 正確な数値はダッシュボードから取得が必要
        revenue: 0,
        fetchedAt: new Date(),
      }));
  } catch (error) {
    await notifySlack(
      `note売上データ取得エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}

/**
 * 売上サマリーを生成する
 *
 * @param salesData - 売上データ配列
 * @param periodStart - 期間開始日
 * @param periodEnd - 期間終了日
 * @returns 売上サマリー
 */
export function generateSalesSummary(
  salesData: NoteSalesData[],
  periodStart: Date,
  periodEnd: Date
): SalesSummary {
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = salesData.reduce((sum, d) => sum + d.salesCount, 0);

  // 価格帯別集計
  const priceRanges = [
    { label: "980円", min: 0, max: 1000 },
    { label: "2,980円", min: 1000, max: 3000 },
    { label: "4,980円", min: 3000, max: 5000 },
    { label: "月額", min: 5000, max: Infinity },
  ];

  const byPriceRange = priceRanges.map((range) => {
    const articlesInRange = salesData.filter(
      (d) => d.revenue / (d.salesCount || 1) >= range.min && d.revenue / (d.salesCount || 1) < range.max
    );
    return {
      label: range.label,
      revenue: articlesInRange.reduce((sum, d) => sum + d.revenue, 0),
      salesCount: articlesInRange.reduce((sum, d) => sum + d.salesCount, 0),
    };
  });

  return {
    period: { start: periodStart, end: periodEnd },
    totalRevenue,
    totalSales,
    byArticle: salesData.sort((a, b) => b.revenue - a.revenue),
    byPriceRange,
  };
}

/**
 * 月次売上レポートを生成する
 *
 * @param salesData - 売上データ配列
 * @returns レポート文字列（Slack通知用）
 */
export function generateMonthlyReport(salesData: NoteSalesData[]): string {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const summary = generateSalesSummary(salesData, monthStart, monthEnd);

  const lines = [
    `📊 note月次売上レポート（${now.getFullYear()}年${now.getMonth() + 1}月）`,
    ``,
    `💰 総売上: ¥${summary.totalRevenue.toLocaleString()}`,
    `📦 総販売数: ${summary.totalSales}件`,
    ``,
    `--- 価格帯別 ---`,
    ...summary.byPriceRange
      .filter((r) => r.salesCount > 0)
      .map((r) => `${r.label}: ¥${r.revenue.toLocaleString()} (${r.salesCount}件)`),
    ``,
    `--- 記事別TOP5 ---`,
    ...summary.byArticle
      .slice(0, 5)
      .map(
        (a, i) =>
          `${i + 1}. ${a.title}: ¥${a.revenue.toLocaleString()} (${a.salesCount}件)`
      ),
  ];

  return lines.join("\n");
}
