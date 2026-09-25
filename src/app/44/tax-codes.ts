import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** TAX CODES ************* */

export async function retrieveTaxCode({
  taxCodeId
}: {
  taxCodeId: string;
}): Promise<Stripe.TaxCode> {
  try {
    const taxCode = await stripe.taxCodes.retrieve(taxCodeId);

    return taxCode;

    /* {
      "id": "txcd_99999999",
      "object": "tax_code",
      "description": "Any tangible or physical good. For jurisdictions that impose a tax, the standard rate is applied.",
      "name": "General - Tangible Goods"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving tax code');
  }
}

export async function listTaxCodes({
  limit = 10,
  startingAfter,
  endingBefore
}: {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
} = {}): Promise<Stripe.ApiList<Stripe.TaxCode>> {
  try {
    const taxCodes = await stripe.taxCodes.list({
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    });

    return taxCodes;

    /* {
      "object": "list",
      "url": "/v1/tax_codes",
      "has_more": false,
      "data": [
        {
          "id": "txcd_99999999",
          "object": "tax_code",
          "description": "Any tangible or physical good. For jurisdictions that impose a tax, the standard rate is applied.",
          "name": "General - Tangible Goods"
        }
      ]
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing tax codes');
  }
}