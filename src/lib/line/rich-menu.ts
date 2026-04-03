/**
 * LINEリッチメニュー設定
 *
 * LINE公式アカウントのリッチメニュー構成を管理する。
 */

import { notifySlack } from "@/lib/notifications/slack";

/** リッチメニュー項目 */
export type RichMenuItem = {
  /** メニュー項目名 */
  label: string;
  /** アクションタイプ */
  type: "uri" | "message" | "postback";
  /** アクション値 */
  value: string;
  /** エリア定義（位置・サイズ） */
  area: { x: number; y: number; width: number; height: number };
};

/** リッチメニュー設定 */
export type RichMenuConfig = {
  /** メニュー名 */
  name: string;
  /** チャットバーテキスト */
  chatBarText: string;
  /** サイズ */
  size: { width: number; height: number };
  /** メニュー項目 */
  items: RichMenuItem[];
};

/** デフォルトリッチメニュー設定 */
export const defaultRichMenu: RichMenuConfig = {
  name: "Litwill Garden メインメニュー",
  chatBarText: "メニューを開く",
  size: { width: 2500, height: 1686 },
  items: [
    {
      label: "攻略記事",
      type: "uri",
      value: "https://litwill-garden.com/guides",
      area: { x: 0, y: 0, width: 833, height: 843 },
    },
    {
      label: "無料ガイド",
      type: "message",
      value: "無料ガイドが欲しい",
      area: { x: 833, y: 0, width: 834, height: 843 },
    },
    {
      label: "有料コンテンツ",
      type: "uri",
      value: "https://note.com/litwill_garden",
      area: { x: 1667, y: 0, width: 833, height: 843 },
    },
    {
      label: "YouTube",
      type: "uri",
      value: "https://www.youtube.com/@litwill-garden",
      area: { x: 0, y: 843, width: 1250, height: 843 },
    },
    {
      label: "チーム情報",
      type: "uri",
      value: "https://litwill-garden.com/team",
      area: { x: 1250, y: 843, width: 1250, height: 843 },
    },
  ],
};

/**
 * LINE Messaging APIでリッチメニューを作成する
 *
 * @param config - リッチメニュー設定
 * @returns リッチメニューID
 */
export async function createRichMenu(config: RichMenuConfig): Promise<string> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  }

  try {
    const body = {
      size: config.size,
      selected: true,
      name: config.name,
      chatBarText: config.chatBarText,
      areas: config.items.map((item) => ({
        bounds: item.area,
        action:
          item.type === "uri"
            ? { type: "uri", uri: item.value, label: item.label }
            : item.type === "message"
              ? { type: "message", text: item.value, label: item.label }
              : { type: "postback", data: item.value, label: item.label },
      })),
    };

    const response = await fetch("https://api.line.me/v2/bot/richmenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`LINE API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as { richMenuId: string };
    return data.richMenuId;
  } catch (error) {
    await notifySlack(
      `LINEリッチメニュー作成エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}
