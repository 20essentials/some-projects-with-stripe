import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** SHIPPING RATES ************* */

export async function createShippingRate({
  displayName,
  type,
  fixedAmount,
  deliveryEstimate,
  taxBehavior,
  taxCode,
  metadata
}: {
  displayName: string;
  type?: Stripe.ShippingRateCreateParams.Type;
  fixedAmount?: Stripe.ShippingRateCreateParams.FixedAmount;
  deliveryEstimate?: Stripe.ShippingRateCreateParams.DeliveryEstimate;
  taxBehavior?: Stripe.ShippingRateCreateParams.TaxBehavior;
  taxCode?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.ShippingRate> {
  try {
    const shippingRate = await stripe.shippingRates.create({
      display_name: displayName,
      type,
      fixed_amount: fixedAmount,
      delivery_estimate: deliveryEstimate,
      tax_behavior: taxBehavior,
      tax_code: taxCode,
      metadata
    });

    return shippingRate;

    /* {
      "id": "shr_123",
      "object": "shipping_rate",
      "active": true,
      "display_name": "Ground shipping",
      "fixed_amount": {
        "amount": 500,
        "currency": "usd"
      },
      "tax_behavior": "unspecified",
      "type": "fixed_amount"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating shipping rate');
  }
}

export async function updateShippingRate({
  shippingRateId,
  active,
  displayName,
  metadata,
  taxBehavior,
  taxCode
}: {
  shippingRateId: string;
  active?: boolean;
  displayName?: string;
  metadata?: Record<string, string>;
  taxBehavior?: Stripe.ShippingRateUpdateParams.TaxBehavior;
  taxCode?: string;
}): Promise<Stripe.ShippingRate> {
  try {
    const shippingRate = await stripe.shippingRates.update(
      shippingRateId,
      {
        active,
        display_name: displayName,
        metadata,
        tax_behavior: taxBehavior,
        tax_code: taxCode
      }
    );

    return shippingRate;

    /* {
      "id": "shr_123",
      "object": "shipping_rate",
      "active": false,
      "display_name": "Ground shipping",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating shipping rate');
  }
}

export async function retrieveShippingRate({
  shippingRateId
}: {
  shippingRateId: string;
}): Promise<Stripe.ShippingRate> {
  try {
    const shippingRate =
      await stripe.shippingRates.retrieve(shippingRateId);

    return shippingRate;

    /* {
      "id": "shr_123",
      "object": "shipping_rate",
      "active": true,
      "display_name": "Ground shipping",
      "fixed_amount": {
        "amount": 500,
        "currency": "usd"
      },
      "type": "fixed_amount"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving shipping rate');
  }
}

export async function listShippingRates({
  active,
  type,
  limit = 10,
  startingAfter,
  endingBefore
}: {
  active?: boolean;
  type?: Stripe.ShippingRateListParams.Type;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
} = {}): Promise<Stripe.ApiList<Stripe.ShippingRate>> {
  try {
    const shippingRates = await stripe.shippingRates.list({
      active,
      type,
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    });

    return shippingRates;

    /* {
      "object": "list",
      "data": [
        {
          "id": "shr_123",
          "object": "shipping_rate",
          "active": true,
          "display_name": "Ground shipping",
          "type": "fixed_amount"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing shipping rates');
  }
}