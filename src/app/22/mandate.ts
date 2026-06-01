import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** MANDATES ************* */

export async function retrieveMandate({
  mandateId
}: {
  mandateId: string;
}): Promise<Stripe.Mandate> {
  try {
    const mandate = await stripe.mandates.retrieve(mandateId);

    return mandate;

    /* {
      "id": "mandate_123",
      "object": "mandate",
      "payment_method": "pm_123",
      "status": "active",
      "type": "multi_use",
      "customer_acceptance": {
        "accepted_at": 123456789,
        "type": "online"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving mandate');
  }
}