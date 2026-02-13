import Stripe from 'stripe';

export async function getPricingCards() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const strapi = new Stripe(secret);
  const pricingPlans = await strapi.prices.list();
  return pricingPlans;
}
