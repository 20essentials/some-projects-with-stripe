import { BASE_URL } from '@/globalConsts';
import 'server-only';
import Stripe from 'stripe';

export const PATH_TO_CREATE_CUSTOMER = '/4?redirectTo=/9';

export async function getAccountLink({ accountId }: { accountId: string }) {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const response = await stripe.v2.core.accountLinks.create({
    account: accountId,
    use_case: {
      type: 'account_update',
      account_update: {
        configurations: ['customer'],
        return_url: `${BASE_URL}/9/success/`,
        refresh_url: `${BASE_URL}/9/`
      }
    }
  });

  return response.url;
}
