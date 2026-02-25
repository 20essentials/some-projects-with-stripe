import { BASE_URL } from '@/globalConsts';
import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dollarsToCents, type Pricing } from '@/app/3/lib';

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const plan = (await request.json()) as Pricing;
  const { url } = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          product_data: {
            name: plan.title,
            description: plan.description
          },
          currency: 'usd',
          unit_amount: dollarsToCents(plan.price),
        },
        quantity: 1,
        metadata: {
          planId: plan.id
          /* For example if you want to save it into a Database or something... */
        }
      }
    ],
    success_url: `${BASE_URL}/3/success/`,
    cancel_url: `${BASE_URL}/3/`
  });

  return NextResponse.json({ url }, { status: 200 });
}
