import 'server-only';
import Stripe from 'stripe';

export async function getPricingCards() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const pricingPlans = await stripe.prices.list();
  return pricingPlans.data;
}
