import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * Stripe Checkout Session Creation
 * Accepts a priceId, userId, and plan to initiate a secure checkout session.
 */
export async function POST(req: Request) {
  try {
    const { priceId, userId, email, plan } = await req.json();

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: priceId or userId" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:9002";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      client_reference_id: userId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        plan: plan || "pro",
      },
      success_url: `${appUrl}/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
