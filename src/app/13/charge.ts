import 'server-only';
import Stripe from 'stripe';
const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret, {
  apiVersion: '2026-01-28.clover'
});

/************** LEGACY ************* */
export async function createCharge({
  amount,
  currency
}: {
  amount: number;
  currency: string;
}): Promise<Stripe.Charge> {
  try {
    const charge = await stripe.charges.create({
      amount,
      currency
    });
    return charge;

    /* {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "object": "charge",
      "amount": 1099,
      "amount_captured": 0,
      "amount_refunded": 0,
      "captured": false,
      "currency": "usd",
      "paid": true,
      "status": "succeeded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating charge');
  }
}

export async function retrieveCharge({
  chargeId
}: {
  chargeId: string;
}): Promise<Stripe.Charge> {
  try {
    const charge = await stripe.charges.retrieve(chargeId);
    return charge;

    /* {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "object": "charge",
      "amount": 1099,
      "amount_captured": 1099,
      "amount_refunded": 0,
      "captured": true,
      "currency": "usd",
      "paid": true,
      "status": "succeeded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving charge');
  }
}

export async function updateCharge({
  chargeId,
  description
}: {
  chargeId: string;
  description?: string;
}): Promise<Stripe.Charge> {
  try {
    const charge = await stripe.charges.update(chargeId, {
      description
    });
    return charge;

    /* {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "object": "charge",
      "description": "Updated description",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating charge');
  }
}

export async function listCharges({
  limit = 10
}: {
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.Charge>> {
  try {
    const charges = await stripe.charges.list({ limit });
    return charges;

    /* {
      "object": "list",
      "data": [
        {
          "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
          "amount": 1099,
          "currency": "usd",
          "status": "succeeded"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing charges');
  }
}

export async function captureCharge({
  chargeId,
  amount
}: {
  chargeId: string;
  amount?: number;
}): Promise<Stripe.Charge> {
  try {
    const charge = await stripe.charges.capture(chargeId, {
      amount
    });
    return charge;

    /* {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "captured": true,
      "amount_captured": 1099,
      "status": "succeeded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed capturing charge');
  }
}

export async function searchCharges({
  query,
  limit = 10
}: {
  query: string;
  limit?: number;
}): Promise<Stripe.ApiSearchResult<Stripe.Charge>> {
  try {
    const result = await stripe.charges.search({
      query,
      limit
    });
    return result;

    /* {
      "object": "search_result",
      "data": [
        {
          "id": "ch_123",
          "amount": 1000,
          "currency": "usd",
          "status": "succeeded"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed searching charges');
  }
}
