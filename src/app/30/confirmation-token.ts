import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CONFIRMATION TOKENS ************* */

export async function retrieveConfirmationToken({
  confirmationTokenId
}: {
  confirmationTokenId: string;
}): Promise<Stripe.ConfirmationToken> {
  try {
    const confirmationToken =
      await stripe.confirmationTokens.retrieve(
        confirmationTokenId
      );

    return confirmationToken;

    /* {
      "id": "ctoken_123",
      "object": "confirmation_token",
      "created": 1694025025,
      "expires_at": 1694068225,
      "livemode": false,
      "payment_intent": null,
      "payment_method": null,
      "setup_intent": null,
      "return_url": "https://example.com/return"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving confirmation token');
  }
}