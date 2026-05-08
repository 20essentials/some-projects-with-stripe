import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** DISPUTES ************* */

export async function retrieveDispute({
  disputeId
}: {
  disputeId: string;
}): Promise<Stripe.Dispute> {
  try {
    const dispute = await stripe.disputes.retrieve(disputeId);
    return dispute;

    /* {
      "id": "du_123",
      "object": "dispute",
      "amount": 1000,
      "currency": "usd",
      "charge": "ch_123",
      "status": "needs_response"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving dispute');
  }
}

export async function updateDispute({
  disputeId,
  evidence,
  metadata,
  submit
}: {
  disputeId: string;
  evidence?: Stripe.DisputeUpdateParams.Evidence;
  metadata?: Record<string, string>;
  submit?: boolean;
}): Promise<Stripe.Dispute> {
  try {
    const dispute = await stripe.disputes.update(disputeId, {
      evidence,
      metadata,
      submit
    });
    return dispute;

    /* {
      "id": "du_123",
      "object": "dispute",
      "evidence": {
        "customer_email_address": "user@example.com",
        "product_description": "Premium subscription"
      },
      "status": "under_review",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating dispute');
  }
}

export async function listDisputes({
  chargeId,
  paymentIntentId,
  limit = 10
}: {
  chargeId?: string;
  paymentIntentId?: string;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.Dispute>> {
  try {
    const disputes = await stripe.disputes.list({
      charge: chargeId,
      payment_intent: paymentIntentId,
      limit
    });
    return disputes;

    /* {
      "object": "list",
      "data": [
        {
          "id": "du_123",
          "amount": 1000,
          "currency": "usd",
          "status": "needs_response"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing disputes');
  }
}

export async function closeDispute({
  disputeId
}: {
  disputeId: string;
}): Promise<Stripe.Dispute> {
  try {
    const dispute = await stripe.disputes.close(disputeId);
    return dispute;

    /* {
      "id": "du_123",
      "object": "dispute",
      "status": "lost",
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed closing dispute');
  }
}
