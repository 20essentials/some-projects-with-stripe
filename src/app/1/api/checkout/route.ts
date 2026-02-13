import { BASE_URL } from '@/globalConsts';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export default async function POST(request: NextRequest, response: NextResponse) {
  const { productPriceId } = await request.json();
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  if (!productPriceId) throw new Error('Please Give me productPriceId 🐼');
  const stripe = new Stripe(secret);
  const stripeResponse = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price: productPriceId
      }
    ],
    success_url: `${BASE_URL}/1/success`,
    cancel_url: `${BASE_URL}/1`
  });
}
