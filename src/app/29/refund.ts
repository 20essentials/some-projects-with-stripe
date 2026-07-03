import 'server-only';
import Stripe from 'stripe';
const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');
const stripe = new Stripe(secret);

/************** REFUNDS ************* */

export async function createRefund({
  charge,
  paymentIntent,
  amount,
  reason,
  metadata,
  instructionsEmail
}: {
  charge?: string;
  paymentIntent?: string;
  amount?: number;
  reason?: Stripe.RefundCreateParams.Reason;
  metadata?: Record<string, string>;
  instructionsEmail?: string;
}): Promise<Stripe.Refund> {
  try {
    const refund = await stripe.refunds.create({
      charge,
      payment_intent: paymentIntent,
      amount,
      reason,
      metadata,
      instructions_email: instructionsEmail
    });

    return refund;

    /* {
      "id": "re_123",
      "object": "refund",
      "amount": 1000,
      "currency": "usd",
      "charge": "ch_123",
      "payment_intent": "pi_123",
      "status": "pending"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating refund');
  }
}

export async function retrieveRefund({
  refundId
}: {
  refundId: string;
}): Promise<Stripe.Refund> {
  try {
    const refund = await stripe.refunds.retrieve(refundId);

    return refund;

    /* {
      "id": "re_123",
      "object": "refund",
      "amount": 1000,
      "currency": "usd",
      "status": "succeeded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving refund');
  }
}

export async function updateRefund({
  refundId,
  metadata
}: {
  refundId: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Refund> {
  try {
    const refund = await stripe.refunds.update(refundId, {
      metadata
    });

    return refund;

    /* {
      "id": "re_123",
      "object": "refund",
      "metadata": {
        "order_id": "6735"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating refund');
  }
}

export async function listRefunds({
  charge,
  paymentIntent,
  limit = 10
}: {
  charge?: string;
  paymentIntent?: string;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.Refund>> {
  try {
    const refunds = await stripe.refunds.list({
      charge,
      payment_intent: paymentIntent,
      limit
    });

    return refunds;

    /* {
      "object": "list",
      "data": [
        {
          "id": "re_123",
          "amount": 1000,
          "currency": "usd",
          "status": "succeeded"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing refunds');
  }
}

export async function cancelRefund({
  refundId
}: {
  refundId: string;
}): Promise<Stripe.Refund> {
  try {
    const refund = await stripe.refunds.cancel(refundId);

    return refund;

    /* {
      "id": "re_123",
      "object": "refund",
      "status": "canceled",
      "failure_reason": "merchant_request"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed canceling refund');
  }
}
