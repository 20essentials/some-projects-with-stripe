import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Pricing } from '../../lib';

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const stripeHeader = (await headers()).get('stripe-signature');
  if (!stripeHeader)
    return NextResponse.json(
      { error: 'The Stripe header is not correct.' },
      { status: 400 }
    );
  const stripeEndpointSignature = process.env.STRIPE_WEBHOOK_SIGNATURE_PROJECT_3;
  if (!stripeEndpointSignature)
    throw new Error('The Stripe Endpoint Signature does not exists 🐼');
  const body = await request.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeHeader,
      stripeEndpointSignature
    );

    if (event.type === 'checkout.session.completed') {
      const data = event.data.object;
      const metadata = data.metadata as { planId: Pricing['id'] };
      const { planId } = metadata;
      console.info({ planId });
      //You can save it in a db
      //You can send an email
      //etc...
    } else {
      console.info('Unknown Event');
    }

    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'An stripe error occured 😅' },
      { status: 500 }
    );
  }
}
