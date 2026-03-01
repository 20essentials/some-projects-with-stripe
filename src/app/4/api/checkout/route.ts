import { BASE_URL } from '@/globalConsts';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCT_MOCKUP } from '@/app/2/lib';

export async function POST() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const { url } = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          product_data: {
            name: PRODUCT_MOCKUP.name,
            description: 'Just a random Phone 🐼',
            images: [PRODUCT_MOCKUP.urlImage]
          },
          currency: 'usd',
          unit_amount: PRODUCT_MOCKUP.priceInCents
        },
        quantity: 1
      }
    ],
    success_url: `${BASE_URL}/2/success/`,
    cancel_url: `${BASE_URL}/2/`
  });

  return NextResponse.json({ url }, { status: 200 });
}
