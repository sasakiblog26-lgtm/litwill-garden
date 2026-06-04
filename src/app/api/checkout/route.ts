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
  soul: { name: "魂のテーマリーディング", amount: 3300 },
  love: { name: "恋愛リーディング", amount: 3300 },
  premium: { name: "人生の星図 フル鑑定", amount: 11000 },
};

export async function POST(req: NextRequest) {
  const { plan, name, email, birthdate, birthtime, birthplace, concern } =
    await req.json();

  const product = PRODUCTS[plan];
  if (!product) {
    return NextResponse.json({ error: "invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "jpy",
          unit_amount: product.amount,
          product_data: { name: product.name },
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: { plan, name, birthdate, birthtime: birthtime ?? "", birthplace, concern: concern ?? "" },
    success_url: `${origin}/readings/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/readings/apply?plan=${plan}`,
  });

  return NextResponse.json({ url: session.url });
}
