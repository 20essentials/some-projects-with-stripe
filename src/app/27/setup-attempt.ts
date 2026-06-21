import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** SETUP ATTEMPTS ************* */

export async function listSetupAttempts({
  setupIntent,
  limit = 10
}: {
  setupIntent: string;
  limit?: number;
}): Promise<Stripe.ApiList<Stripe.SetupAttempt>> {
  try {
    const setupAttempts = await stripe.setupAttempts.list({
      setup_intent: setupIntent,
      limit
    });

    return setupAttempts;

    /* {
      "object": "list",
      "data": [
        {
          "id": "setatt_123",
          "object": "setup_attempt",
          "setup_intent": "seti_123",
          "status": "succeeded",
          "payment_method": "pm_123",
          "created": 1710000000
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing setup attempts');
  }
}