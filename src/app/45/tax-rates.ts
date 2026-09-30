import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** TAX RATES ************* */

export async function createTaxRate({
  displayName,
  percentage,
  inclusive,
  active,
  country,
  description,
  jurisdiction,
  state,
  taxType,
  metadata
}: {
  displayName: string;
  percentage: number;
  inclusive: boolean;
  active?: boolean;
  country?: string;
  description?: string;
  jurisdiction?: string;
  state?: string;
  taxType?: Stripe.TaxRateCreateParams.TaxType;
  metadata?: Record<string, string>;
}): Promise<Stripe.TaxRate> {
  try {
    const taxRate = await stripe.taxRates.create({
      display_name: displayName,
      percentage,
      inclusive,
      active,
      country,
      description,
      jurisdiction,
      state,
      tax_type: taxType,
      metadata
    });

    return taxRate;

    /* {
      "id": "txr_123",
      "object": "tax_rate",
      "active": true,
      "country": "US",
      "created": 1579694831,
      "description": "VAT 20%",
      "display_name": "VAT",
      "inclusive": false,
      "jurisdiction": "EU",
      "livemode": false,
      "metadata": {},
      "percentage": 20,
      "state": null,
      "tax_type": "vat"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating tax rate');
  }
}

export async function updateTaxRate({
  taxRateId,
  active,
  country,
  description,
  displayName,
  jurisdiction,
  metadata,
  state,
  taxType
}: {
  taxRateId: string;
  active?: boolean;
  country?: string;
  description?: string;
  displayName?: string;
  jurisdiction?: string;
  metadata?: Record<string, string>;
  state?: string;
  taxType?: Stripe.TaxRateUpdateParams.TaxType;
}): Promise<Stripe.TaxRate> {
  try {
    const taxRate = await stripe.taxRates.update(
      taxRateId,
      {
        active,
        country,
        description,
        display_name: displayName,
        jurisdiction,
        metadata,
        state,
        tax_type: taxType
      }
    );

    return taxRate;

    /* {
      "id": "txr_123",
      "object": "tax_rate",
      "active": false,
      "display_name": "VAT",
      "percentage": 20,
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating tax rate');
  }
}

export async function retrieveTaxRate({
  taxRateId
}: {
  taxRateId: string;
}): Promise<Stripe.TaxRate> {
  try {
    const taxRate = await stripe.taxRates.retrieve(taxRateId);

    return taxRate;

    /* {
      "id": "txr_123",
      "object": "tax_rate",
      "active": true,
      "country": "US",
      "description": "VAT 20%",
      "display_name": "VAT",
      "inclusive": false,
      "percentage": 20,
      "tax_type": "vat"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving tax rate');
  }
}

export async function listTaxRates({
  active,
  limit = 10,
  startingAfter,
  endingBefore
}: {
  active?: boolean;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
} = {}): Promise<Stripe.ApiList<Stripe.TaxRate>> {
  try {
    const taxRates = await stripe.taxRates.list({
      active,
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    });

    return taxRates;

    /* {
      "object": "list",
      "data": [
        {
          "id": "txr_123",
          "object": "tax_rate",
          "active": true,
          "display_name": "VAT",
          "inclusive": false,
          "percentage": 20
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing tax rates');
  }
}