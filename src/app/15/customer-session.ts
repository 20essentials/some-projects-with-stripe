import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CUSTOMER SESSIONS ************* */
/*
Use a Customer Session when you need to securely provide short-lived, client-side access to a Stripe Customer for UI components like the Payment Element. It enables managing saved payment methods and customer data without exposing sensitive credentials, and is ideal for authenticated user flows requiring temporary, scoped access from your frontend.
*/

export async function createCustomerSession({
  customerId,
  components
}: {
  customerId: string;
  components: Stripe.CustomerSessionCreateParams.Components;
}): Promise<Stripe.CustomerSession> {
  try {
    const session = await stripe.customerSessions.create({
      customer: customerId,
      components
    });
    return session;

    /* {
      "id": "cs_123",
      "object": "customer_session",
      "customer": "cus_123",
      "client_secret": "cs_test_...",
      "components": {
        "payment_element": {
          "enabled": true
        }
      },
      "expires_at": 1710000000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating customer session');
  }
}