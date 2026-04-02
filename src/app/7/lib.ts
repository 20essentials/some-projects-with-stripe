import 'server-only';
import Stripe from 'stripe';

export async function getCustomers() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('The stripe secret key is not defined 🙃');
  const stripe = new Stripe(secret);
  const customers = [];
  for await (const customer of stripe.customers.list({ limit: 10 })) {
    customers.push(customer);
  }

  return customers;
}
