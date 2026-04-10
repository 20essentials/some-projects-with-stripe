import { BASE_URL } from '@/globalConsts';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cookies } from 'next/headers';
import {
  COOKIE_CONFIG,
  COOKIE_KEY,
  CUSTOMER_SUBSCRIPTION_PRICEID,
  SEARCH_PARAMS_KEY
} from '@/lib/const';

export async function POST(request: NextRequest) {
  const { productPriceId, customerId } = await request.json();
  const secret = process.env.STRIPE_API_SECRET;
  const urlOrigin = request.headers.get('referer');
  const searchParams = new URL(urlOrigin!).searchParams;
  const redirectTo = searchParams.get(SEARCH_PARAMS_KEY.redirectTo);
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
    success_url: redirectTo
      ? `${BASE_URL}${redirectTo}`
      : `${BASE_URL}/5/success/`,
    cancel_url: `${BASE_URL}/5/`
  });

  const cookieStore = await cookies();
  const customer = cookieStore.get(COOKIE_KEY.CUSTOMER_KEY)?.value;
  const customerParsedData = JSON.parse(customer!);
  cookieStore.set(
    COOKIE_KEY.CUSTOMER_KEY,
    JSON.stringify({
      ...customerParsedData,
      CUSTOMER_SUBSCRIPTION_PRICEID: productPriceId
    }),
    COOKIE_CONFIG
  );

  return NextResponse.json({ sessionURL: url }, { status: 200 });
}
