import { NextRequest, NextResponse } from "next/server";
import { computeOccultData } from "@/lib/kantei/engine";
import { buildMeishiki } from "@/lib/kantei/meishiki";

// 四柱推命の算出に lunar-javascript（Node依存）を使うため Node ランタイム必須。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { birthdate, birthtime } = await req.json();

    if (!birthdate || !/^\d{4}-\d{1,2}-\d{1,2}$/.test(String(birthdate))) {
      return NextResponse.json(
        { error: "生年月日を正しく入力してください（YYYY-MM-DD）" },
        { status: 400 },
      );
    }

    // 命式（四柱）は生年月日時（JST）のみで決まり出生地に依存しないため、地名は既定でよい。
    const occult = computeOccultData({
      birth_date: String(birthdate),
      birth_time: birthtime ? String(birthtime) : "unknown",
      birth_place: "東京",
    });

    return NextResponse.json({ meishiki: buildMeishiki(occult) });
  } catch (err) {
    console.error("[/api/meishiki]", err);
    return NextResponse.json(
      { error: "命式の計算中にエラーが発生しました。入力をご確認ください。" },
      { status: 500 },
    );
  }
}
