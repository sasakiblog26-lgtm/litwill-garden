import { NextRequest, NextResponse } from "next/server";
import { computeOccultData } from "@/lib/kantei/engine";
import { buildBasicReading } from "@/lib/kantei/basic-reading";

// エンジンは astronomy-engine / lunar-javascript（Node依存）を使うため Node ランタイム必須。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { birthdate, birthtime, birthplace } = await req.json();

    if (!birthdate || !/^\d{4}-\d{1,2}-\d{1,2}$/.test(String(birthdate))) {
      return NextResponse.json(
        { error: "生年月日を正しく入力してください（YYYY-MM-DD）" },
        { status: 400 },
      );
    }
    if (!birthplace) {
      return NextResponse.json({ error: "出生地を選択してください" }, { status: 400 });
    }

    const occult = computeOccultData({
      birth_date: String(birthdate),
      birth_time: birthtime ? String(birthtime) : "unknown",
      birth_place: String(birthplace),
    });

    const reading = buildBasicReading(occult);

    // 無料パートは reading のみ返す。occult_data（生の算出値）は有料側の燃料なので返さない。
    return NextResponse.json({ reading });
  } catch (err) {
    console.error("[/api/diagnosis]", err);
    return NextResponse.json(
      { error: "鑑定の計算中にエラーが発生しました。入力をご確認ください。" },
      { status: 500 },
    );
  }
}
