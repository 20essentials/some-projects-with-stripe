import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** DISCOUNTS ************* */

export async function deleteCustomerDiscount({
  customerId
}: {
  customerId: string;
}): Promise<Stripe.DeletedDiscount> {
  try {
    const deleted = await stripe.customers.deleteDiscount(
      customerId
    );

    return deleted;

    /* {
      "object": "discount",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting customer discount');
  }
}

export async function deleteSubscriptionDiscount({
  subscriptionId
}: {
  subscriptionId: string;
}): Promise<Stripe.DeletedDiscount> {
  try {
    const deleted = await stripe.subscriptions.deleteDiscount(
      subscriptionId
    );

    return deleted;

    /* {
      "object": "discount",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting subscription discount');
  }
}