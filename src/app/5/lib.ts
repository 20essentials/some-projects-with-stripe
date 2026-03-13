import 'server-only';
import Stripe from 'stripe';

export const PATH_TO_CREATE_CUSTOMER = '/4?redirectTo=/5';

export async function getPricingCards() {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Please give me your secret key! 😉');
  const stripe = new Stripe(secret);
  const pricesList = await stripe.prices.list();
  const pricingPlansData = await Promise.all(
    pricesList.data.map(async price => {
      const product = await stripe.products.retrieve(price.product.toString());
      /*
      ({ productName: product.name });
      { productName: 'Business Plan' }
      { productName: 'Basic Plan' }
      { productName: 'Premium Plan' }
      */

      return {
        productName: product.name,
        unit_amount: price.unit_amount,
        id: price.id
      };
    })
  );

  return pricingPlansData;
}
