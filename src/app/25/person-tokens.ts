import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** V2 CORE PERSON TOKENS ************* */

export async function createPersonToken({
  accountId,
  givenName,
  surname,
  email,
  phone,
  address,
  relationship,
  metadata
}: {
  accountId: string;
  givenName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  address?: Record<string, unknown>;
  relationship?: Record<string, unknown>;
  metadata?: Record<string, string>;
}) {
  try {
    const token = await stripe.v2.core.personTokens.create(
      accountId,
      {
        given_name: givenName,
        surname,
        email,
        phone,
        address,
        relationship,
        metadata
      }
    );

    return token;

    /* {
      "id": "perstok_123",
      "object": "v2.core.account_person_token",
      "created": "2025-11-17T14:00:00.000Z",
      "expires_at": "2025-11-17T14:10:00.000Z",
      "livemode": false,
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating person token');
  }
}

export async function retrievePersonToken({
  accountId,
  personTokenId
}: {
  accountId: string;
  personTokenId: string;
}) {
  try {
    const token = await stripe.v2.core.personTokens.retrieve(
      accountId,
      personTokenId
    );

    return token;

    /* {
      "id": "perstok_123",
      "object": "v2.core.account_person_token",
      "created": "2025-11-17T14:00:00.000Z",
      "expires_at": "2025-11-17T14:10:00.000Z",
      "livemode": false,
      "used": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving person token');
  }
}