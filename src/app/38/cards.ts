import 'server-only';
import Stripe from 'stripe';

const secret =
  process.env.STRIPE_API_SECRET;
if (!secret)
  throw new Error(
    'Missing Stripe secret key'
  );

const stripe = new Stripe(secret);

/************** CARDS ************* */

export async function createCard({
  customerId,
  source
}: {
  customerId: string;
  source: string;
}): Promise<Stripe.Card> {
  try {
    const card =
      await stripe.customers.createSource(
        customerId,
        {
          source
        }
      );

    return card as Stripe.Card;

    /* {
      "id": "card_123",
      "object": "card",
      "brand": "Visa",
      "country": "US",
      "customer": "cus_123",
      "exp_month": 12,
      "exp_year": 2028,
      "last4": "4242"
    } */
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed creating card'
    );
  }
}

export async function updateCard({
  customerId,
  cardId,
  name,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressZip,
  addressCountry,
  metadata
}: {
  customerId: string;
  cardId: string;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
  addressCountry?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Card> {
  try {
    const card =
      await stripe.customers.updateSource(
        customerId,
        cardId,
        {
          name,
          address_line1: addressLine1,
          address_line2: addressLine2,
          address_city: addressCity,
          address_state: addressState,
          address_zip: addressZip,
          address_country:
            addressCountry,
          metadata
        }
      );

    return card as Stripe.Card;

    /* {
      "id": "card_123",
      "object": "card",
      "brand": "Visa",
      "last4": "4242",
      "name": "Jenny Rosen",
      "metadata": {}
    } */
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed updating card'
    );
  }
}

export async function retrieveCard({
  customerId,
  cardId
}: {
  customerId: string;
  cardId: string;
}): Promise<Stripe.Card> {
  try {
    const card =
      await stripe.customers.retrieveSource(
        customerId,
        cardId
      );

    return card as Stripe.Card;

    /* {
      "id": "card_123",
      "object": "card",
      "brand": "Visa",
      "country": "US",
      "customer": "cus_123",
      "exp_month": 12,
      "exp_year": 2028,
      "last4": "4242"
    } */
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed retrieving card'
    );
  }
}

export async function listCards({
  customerId,
  limit = 10,
  startingAfter,
  endingBefore
}: {
  customerId: string;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
}): Promise<
  Stripe.ApiList<Stripe.Card>
> {
  try {
    const cards =
      await stripe.customers.listSources(
        customerId,
        {
          object: 'card',
          limit,
          starting_after: startingAfter,
          ending_before: endingBefore
        }
      );

    return cards as Stripe.ApiList<Stripe.Card>;

    /* {
      "object": "list",
      "data": [
        {
          "id": "card_123",
          "object": "card",
          "brand": "Visa",
          "last4": "4242"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed listing cards'
    );
  }
}

export async function deleteCard({
  customerId,
  cardId
}: {
  customerId: string;
  cardId: string;
}): Promise<Stripe.DeletedCard> {
  try {
    const deleted =
      await stripe.customers.deleteSource(
        customerId,
        cardId
      );

    return deleted as Stripe.DeletedCard;

    /* {
      "id": "card_123",
      "object": "card",
      "deleted": true
    } */
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed deleting card'
    );
  }
}
