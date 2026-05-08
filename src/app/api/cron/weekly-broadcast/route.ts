import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { generateWeeklyDigest, sendWeeklyBroadcast } from "@/lib/line-marketing/weekly-broadcast";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const digest = await generateWeeklyDigest(db);
  const sentCount = await sendWeeklyBroadcast(db, digest);

  return NextResponse.json({
    ok: true,
    digest,
    sentCount,
    executedAt: new Date().toISOString(),
  });
}
