import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });
}

const PRODUCTS: Record<string, { name: string; amount: number }> = {
  otameshi: { name: "お試しプラン（占いレポート）", amount: 1000 },
  standard: { name: "スタンダードプラン（占いレポート）", amount: 2500 },
  shikkari: { name: "しっかりプラン（占いレポート）", amount: 3500 },
};

const THEME_LABELS: Record<string, string> = {
  love: "恋愛・結婚",
  work: "仕事・転職",
  life: "人生・運勢",
  tarot: "タロット占い",
};

export async function POST(req: NextRequest) {
  const { plan, theme, name, email, birthdate, birthtime, birthplace, concern } =
    await req.json();

  const product = PRODUCTS[plan];
  if (!product) {
    return NextResponse.json({ error: "invalid plan" }, { status: 400 });
  }
  const themeLabel = THEME_LABELS[theme] ?? "";

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "jpy",
          unit_amount: product.amount,
          product_data: {
            name: themeLabel ? `${product.name}｜${themeLabel}` : product.name,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: { plan, theme: theme ?? "", name, birthdate, birthtime: birthtime ?? "", birthplace, concern: concern ?? "" },
    success_url: `${origin}/readings/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/readings/apply?plan=${plan}`,
  });

  return NextResponse.json({ url: session.url });
}
