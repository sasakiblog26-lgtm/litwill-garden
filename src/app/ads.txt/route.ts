const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const dynamic = "force-static";

/**
 * /ads.txt を動的生成。AdSense のパブリッシャーIDを
 * NEXT_PUBLIC_ADSENSE_CLIENT（ca-pub-XXXX）から導出する。
 * 未設定時はプレースホルダを返す（審査前でも 200 を返せる）。
 */
export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response(
      "# ads.txt — NEXT_PUBLIC_ADSENSE_CLIENT を設定すると有効化されます\n",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  // ca-pub-1234567890123456 -> pub-1234567890123456
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
