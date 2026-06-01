/**
 * SNS投稿パフォーマンス自動取得・レポート生成
 *
 * 各プラットフォームの投稿パフォーマンスを取得し、
 * DBに保存・週次レポートを自動生成する。
 */

import { notifySlack } from "@/lib/notifications/slack";

/** プラットフォーム別パフォーマンスデータ */
export type PlatformPerformance = {
  platform: "twitter" | "youtube" | "tiktok";
  period: { start: Date; end: Date };
  metrics: {
    totalPosts: number;
    totalImpressions: number;
    totalEngagements: number;
    engagementRate: number;
    topPost: {
      id: string;
      content: string;
      impressions: number;
      engagements: number;
    } | null;
  };
};

/** 週次レポート */
export type WeeklyReport = {
  weekStart: Date;
  weekEnd: Date;
  platforms: PlatformPerformance[];
  summary: string;
  recommendations: string[];
};

/**
 * 週の開始日と終了日を計算する（月曜始まり）
 */
function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const start = new Date(now);
  start.setDate(now.getDate() + mondayOffset);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/**
 * X（Twitter）のパフォーマンスデータを集計する
 *
 * @param posts - 期間内の投稿データ（DBから取得済み）
 * @returns プラットフォームパフォーマンス
 */
export function aggregateXPerformance(
  posts: Array<{
    id: string;
    content: string;
    engagement: {
      impressions: number;
      likes: number;
      retweets: number;
      replies: number;
      clicks: number;
    } | null;
  }>
): PlatformPerformance {
  const { start, end } = getCurrentWeekRange();

  let totalImpressions = 0;
  let totalEngagements = 0;
  let topPost: PlatformPerformance["metrics"]["topPost"] = null;

  for (const post of posts) {
    if (!post.engagement) continue;
    const impressions = post.engagement.impressions;
    const engagements =
      post.engagement.likes +
      post.engagement.retweets +
      post.engagement.replies +
      post.engagement.clicks;

    totalImpressions += impressions;
    totalEngagements += engagements;

    if (!topPost || impressions > topPost.impressions) {
      topPost = {
        id: post.id,
        content: post.content,
        impressions,
        engagements,
      };
    }
  }

  return {
    platform: "twitter",
    period: { start, end },
    metrics: {
      totalPosts: posts.length,
      totalImpressions,
      totalEngagements,
      engagementRate:
        totalImpressions > 0 ? (totalEngagements / totalImpressions) * 100 : 0,
      topPost,
    },
  };
}

/**
 * 週次レポートを生成する
 *
 * @param platformData - 各プラットフォームのパフォーマンスデータ
 * @returns 週次レポート
 */
export async function generateWeeklyReport(
  platformData: PlatformPerformance[]
): Promise<WeeklyReport> {
  const { start, end } = getCurrentWeekRange();

  const totalImpressions = platformData.reduce(
    (sum, p) => sum + p.metrics.totalImpressions,
    0
  );
  const totalEngagements = platformData.reduce(
    (sum, p) => sum + p.metrics.totalEngagements,
    0
  );
  const totalPosts = platformData.reduce((sum, p) => sum + p.metrics.totalPosts, 0);

  const overallEngagementRate =
    totalImpressions > 0 ? (totalEngagements / totalImpressions) * 100 : 0;

  const summary = [
    `📊 週次SNSレポート（${formatDate(start)}〜${formatDate(end)}）`,
    `総投稿数: ${totalPosts}件`,
    `総インプレッション: ${totalImpressions.toLocaleString()}`,
    `総エンゲージメント: ${totalEngagements.toLocaleString()}`,
    `エンゲージメント率: ${overallEngagementRate.toFixed(2)}%`,
  ].join("\n");

  const recommendations: string[] = [];
  for (const platform of platformData) {
    if (platform.metrics.engagementRate < 2) {
      recommendations.push(
        `${platform.platform} のエンゲージメント率が低下（${platform.metrics.engagementRate.toFixed(2)}%）。投稿内容の見直しを推奨。`
      );
    }
    if (platform.metrics.topPost) {
      recommendations.push(
        `${platform.platform} の最高パフォーマンス投稿を分析し、類似コンテンツの拡充を検討。`
      );
    }
  }

  const report: WeeklyReport = {
    weekStart: start,
    weekEnd: end,
    platforms: platformData,
    summary,
    recommendations,
  };

  try {
    await notifySlack(summary);
  } catch {
    // Slack通知失敗はレポート生成に影響しない
  }

  return report;
}

/**
 * 日付をフォーマットする（YYYY/MM/DD）
 */
function formatDate(date: Date): string {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}
