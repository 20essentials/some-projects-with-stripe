import { BASE_URL } from '@/globalConsts';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const { productPriceId, customerId } = await request.json();
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  if (!productPriceId) throw new Error('Please Give me productPriceId 🐼');
  if (!customerId) throw new Error(`CustomerId don't find it 🧐`);
  const stripe = new Stripe(secret);
  const { url } = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price: productPriceId
      }
    ],
    success_url: `${BASE_URL}/5/success/`,
    cancel_url: `${BASE_URL}/5/`
  });

  return NextResponse.json({ sessionURL: url }, { status: 200 });
}
