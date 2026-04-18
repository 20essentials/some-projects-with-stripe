import 'server-only';
import Stripe from 'stripe';

export async function getBalance() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Missing Stripe secret key');
  const stripe = new Stripe(secret);
  try {
    const balance = await stripe.balance.retrieve();
    return balance;
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed getting the balance');
  }
}
