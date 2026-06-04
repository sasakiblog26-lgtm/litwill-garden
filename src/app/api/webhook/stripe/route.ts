import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

const PLAN_LABELS: Record<string, string> = {
  soul: "魂のテーマリーディング",
  love: "恋愛リーディング",
  premium: "人生の星図 フル鑑定",
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { plan, name, birthdate, birthtime, birthplace, concern } = session.metadata ?? {};
    const email = session.customer_email ?? "";
    const planLabel = PLAN_LABELS[plan ?? ""] ?? plan;
    // JPY はゼロ十進通貨なので amount_total は既に「円」単位（/100 不要）
    const amount = (session.amount_total ?? 0).toLocaleString("ja-JP");

    const resend = getResend();
    await Promise.all([
      // オーナーへの通知
      resend.emails.send({
        from: "Litwill Garden <noreply@litwillgarden.com>",
        to: process.env.OWNER_EMAIL!,
        subject: `【新規申し込み】${planLabel} — ${name} 様`,
        html: `
          <h2>新規鑑定申し込みがありました</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">プラン</td><td style="padding:8px;border:1px solid #ddd">${planLabel}（¥${amount}）</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">お名前</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">メール</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">生年月日</td><td style="padding:8px;border:1px solid #ddd">${birthdate}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">出生時刻</td><td style="padding:8px;border:1px solid #ddd">${birthtime || "未記入"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">出生地</td><td style="padding:8px;border:1px solid #ddd">${birthplace}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">お悩み・ご要望</td><td style="padding:8px;border:1px solid #ddd">${concern || "なし"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">StripeセッションID</td><td style="padding:8px;border:1px solid #ddd">${session.id}</td></tr>
          </table>
        `,
      }),
      // 顧客への受付確認
      resend.emails.send({
        from: "Litwill Garden <noreply@litwillgarden.com>",
        to: email,
        subject: "【Litwill Garden】鑑定お申し込みを受け付けました",
        html: `
          <div style="max-width:560px;margin:0 auto;font-family:'Noto Sans JP',sans-serif;color:#333">
            <div style="text-align:center;padding:40px 0 24px">
              <p style="font-size:32px;margin:0">✦</p>
              <h1 style="font-size:22px;font-weight:700;margin:16px 0 0">お申し込みありがとうございます</h1>
            </div>
            <p style="line-height:1.8">${name} 様<br><br>
            <strong>${planLabel}</strong> のご申し込みを受け付けました。<br>
            通常 <strong>3〜5営業日以内</strong> にこのメールアドレスへ鑑定レポートをお届けします。</p>
            <table style="border-collapse:collapse;width:100%;margin:24px 0">
              <tr><td style="padding:10px;border:1px solid #e0e0e0;font-weight:bold;background:#f9f9f9;width:40%">ご購入プラン</td><td style="padding:10px;border:1px solid #e0e0e0">${planLabel}</td></tr>
              <tr><td style="padding:10px;border:1px solid #e0e0e0;font-weight:bold;background:#f9f9f9">お支払い金額</td><td style="padding:10px;border:1px solid #e0e0e0">¥${amount}（税込）</td></tr>
            </table>
            <p style="line-height:1.8;font-size:13px;color:#666">
              ✦ キャンセル・ご変更はお申し込みから24時間以内にご連絡ください。<br>
              ✦ ご不明な点は <a href="https://www.litwillgarden.com/contact">お問い合わせフォーム</a> からご連絡ください。
            </p>
            <div style="text-align:center;padding:32px 0;border-top:1px solid #eee;margin-top:32px;font-size:13px;color:#999">
              Litwill Garden — 星と心理学が解き明かす、あなたの物語
            </div>
          </div>
        `,
      }),
    ]);
  }

  return NextResponse.json({ received: true });
}
