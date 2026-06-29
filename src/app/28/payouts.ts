import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PAYOUTS ************* */

/**
 * CREATE PAYOUT
 * Sends funds to a bank account or debit card (Connect / balance payout)
 */
export async function createPayout({
  amount,
  currency,
  method,
  destination,
  description,
  metadata
}: {
  amount: number;
  currency: string;
  method?: Stripe.PayoutCreateParams.Method;
  destination?: string;
  description?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Payout> {
  try {
    const payout = await stripe.payouts.create({
      amount,
      currency,
      method,
      destination,
      description,
      metadata
    });

    return payout;

    /* {
      "id": "po_123",
      "object": "payout",
      "amount": 1100,
      "currency": "usd",
      "arrival_date": 1680652800,
      "automatic": false,
      "method": "standard",
      "status": "pending",
      "type": "bank_account",
      "destination": "ba_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating payout');
  }
}

/**
 * RETRIEVE PAYOUT
 */
export async function retrievePayout({
  payoutId
}: {
  payoutId: string;
}): Promise<Stripe.Payout> {
  try {
    const payout = await stripe.payouts.retrieve(payoutId);

    return payout;

    /* {
      "id": "po_123",
      "object": "payout",
      "amount": 1100,
      "currency": "usd",
      "status": "paid",
      "arrival_date": 1680652800,
      "automatic": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving payout');
  }
}

/**
 * LIST PAYOUTS
 */
export async function listPayouts({
  limit = 10,
  status,
  destination
}: {
  limit?: number;
  status?: string;
  destination?: string;
} = {}): Promise<Stripe.ApiList<Stripe.Payout>> {
  try {
    const payouts = await stripe.payouts.list({
      limit,
      status,
      destination
    });

    return payouts;

    /* {
      "object": "list",
      "data": [
        {
          "id": "po_123",
          "amount": 1100,
          "currency": "usd",
          "status": "paid"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing payouts');
  }
}

/**
 * CANCEL PAYOUT
 */
export async function cancelPayout({
  payoutId
}: {
  payoutId: string;
}): Promise<Stripe.Payout> {
  try {
    const payout = await stripe.payouts.cancel(payoutId);

    return payout;

    /* {
      "id": "po_123",
      "object": "payout",
      "status": "canceled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed canceling payout');
  }
}

/**
 * REVERSE PAYOUT
 * Used when payout already sent but needs rollback
 */
export async function reversePayout({
  payoutId
}: {
  payoutId: string;
}): Promise<Stripe.Payout> {
  try {
    const payout = await stripe.payouts.reverse(payoutId);

    return payout;

    /* {
      "id": "po_123",
      "object": "payout",
      "status": "pending"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed reversing payout');
  }
}
