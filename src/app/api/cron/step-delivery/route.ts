import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { executeStepDelivery } from "@/lib/line-marketing/step-delivery";

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

  const sentCount = await executeStepDelivery(getDb());

  return NextResponse.json({
    ok: true,
    sentCount,
    executedAt: new Date().toISOString(),
  });
}
