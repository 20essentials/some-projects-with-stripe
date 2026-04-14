import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

export async function createAccountToken(
  accountParams: Stripe.V2.Core.AccountTokenCreateParams
) {
  try {
    return await stripe.v2.core.accountTokens.create(accountParams);
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed to create account token');
  }
}

export async function retrieveAccountToken({
  accountTokenId,
}: {
  accountTokenId: string;
}) {
  try {
    return await stripe.v2.core.accountTokens.retrieve(accountTokenId);
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed to retrieve account token');
  }
}
