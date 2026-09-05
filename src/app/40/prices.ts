import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PRICES ************* */

export async function createPrice({
  currency,
  product,
  active,
  billingScheme,
  customUnitAmount,
  metadata,
  nickname,
  recurring,
  taxBehavior,
  tiers,
  tiersMode,
  transformQuantity,
  unitAmount,
  unitAmountDecimal
}: {
  currency: string;
  product?: string;
  active?: boolean;
  billingScheme?: Stripe.PriceCreateParams.BillingScheme;
  customUnitAmount?: Stripe.PriceCreateParams.CustomUnitAmount;
  metadata?: Record<string, string>;
  nickname?: string;
  recurring?: Stripe.PriceCreateParams.Recurring;
  taxBehavior?: Stripe.PriceCreateParams.TaxBehavior;
  tiers?: Stripe.PriceCreateParams.Tier[];
  tiersMode?: Stripe.PriceCreateParams.TiersMode;
  transformQuantity?: Stripe.PriceCreateParams.TransformQuantity;
  unitAmount?: number;
  unitAmountDecimal?: string;
}): Promise<Stripe.Price> {
  try {
    const price = await stripe.prices.create({
      currency,
      product,
      active,
      billing_scheme: billingScheme,
      custom_unit_amount: customUnitAmount,
      metadata,
      nickname,
      recurring,
      tax_behavior: taxBehavior,
      tiers,
      tiers_mode: tiersMode,
      transform_quantity: transformQuantity,
      unit_amount: unitAmount,
      unit_amount_decimal: unitAmountDecimal
    });

    return price;

    /* {
      "id": "price_123",
      "object": "price",
      "active": true,
      "billing_scheme": "per_unit",
      "currency": "usd",
      "livemode": false,
      "nickname": null,
      "product": "prod_123",
      "recurring": {
        "interval": "month",
        "interval_count": 1,
        "usage_type": "licensed"
      },
      "type": "recurring",
      "unit_amount": 1000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating price');
  }
}

export async function updatePrice({
  priceId,
  active,
  metadata,
  nickname,
  taxBehavior
}: {
  priceId: string;
  active?: boolean;
  metadata?: Record<string, string>;
  nickname?: string;
  taxBehavior?: Stripe.PriceUpdateParams.TaxBehavior;
}): Promise<Stripe.Price> {
  try {
    const price = await stripe.prices.update(
      priceId,
      {
        active,
        metadata,
        nickname,
        tax_behavior: taxBehavior
      }
    );

    return price;

    /* {
      "id": "price_123",
      "object": "price",
      "active": false,
      "metadata": {},
      "nickname": "Updated price"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating price');
  }
}

export async function retrievePrice({
  priceId
}: {
  priceId: string;
}): Promise<Stripe.Price> {
  try {
    const price = await stripe.prices.retrieve(priceId);

    return price;

    /* {
      "id": "price_123",
      "object": "price",
      "active": true,
      "billing_scheme": "per_unit",
      "currency": "usd",
      "product": "prod_123",
      "type": "recurring",
      "unit_amount": 1000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving price');
  }
}

export async function listPrices({
  active,
  currency,
  product,
  type,
  limit = 10,
  startingAfter,
  endingBefore,
  lookupKeys
}: {
  active?: boolean;
  currency?: string;
  product?: string;
  type?: Stripe.PriceListParams.Type;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  lookupKeys?: string[];
} = {}): Promise<Stripe.ApiList<Stripe.Price>> {
  try {
    const prices = await stripe.prices.list({
      active,
      currency,
      product,
      type,
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore,
      lookup_keys: lookupKeys
    });

    return prices;

    /* {
      "object": "list",
      "data": [
        {
          "id": "price_123",
          "object": "price",
          "active": true,
          "currency": "usd",
          "product": "prod_123",
          "type": "recurring",
          "unit_amount": 1000
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing prices');
  }
}

export async function searchPrices({
  query,
  limit = 10,
  page
}: {
  query: string;
  limit?: number;
  page?: string;
}): Promise<Stripe.ApiSearchResult<Stripe.Price>> {
  try {
    const prices = await stripe.prices.search({
      query,
      limit,
      page
    });

    return prices;

    /* {
      "object": "search_result",
      "data": [
        {
          "id": "price_123",
          "object": "price",
          "active": true,
          "currency": "usd",
          "product": "prod_123",
          "type": "recurring",
          "unit_amount": 1000
        }
      ],
      "has_more": false,
      "next_page": null
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed searching prices');
  }
}