import { BASE_URL } from '@/globalConsts';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const { customerId } = await request.json();
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  if (!customerId) throw new Error(`CustomerId don't find it 🧐`);
  const stripe = new Stripe(secret);

  const { url } = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${BASE_URL}/6`
  });

  return NextResponse.json({ sessionURL: url }, { status: 200 });
}
