import 'server-only';
import Stripe from 'stripe';

export async function getCustomers() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('The stripe secret key is not defined 🙃');
  const stripe = new Stripe(secret);
  const customers = [];
  for await (const customer of stripe.customers.list({
    limit: 10
  })) {
    customers.push(customer);
  }
  return customers;
}

export async function searchCustomersByEmail({ query }: { query: string }) {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('The stripe secret key is not defined 🙃');
  const stripe = new Stripe(secret);
  const customers = [];
  let page = null;

  while (true) {
    const response = await stripe.customers.search({
      query,
      limit: 100,
      ...(page && { page })
    });

    customers.push(...response.data);

    if (!response.has_more) break;

    page = response.next_page;
  }

  return customers;
}
