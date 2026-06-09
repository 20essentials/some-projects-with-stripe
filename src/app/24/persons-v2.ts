import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** V2 CORE PERSONS ************* */

export async function createPerson({
  accountId,
  givenName,
  surname,
  email,
  phone,
  relationship,
  metadata
}: {
  accountId: string;
  givenName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  relationship?: Record<string, unknown>;
  metadata?: Record<string, string>;
}) {
  try {
    const person = await stripe.v2.core.persons.create(
      accountId,
      {
        given_name: givenName,
        surname,
        email,
        phone,
        relationship,
        metadata
      }
    );

    return person;

    /* {
      "id": "person_123",
      "object": "v2.core.account_person",
      "account": "acct_123",
      "given_name": "Jenny",
      "surname": "Rosen",
      "email": "jenny@example.com"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating person');
  }
}

export async function retrievePerson({
  accountId,
  personId
}: {
  accountId: string;
  personId: string;
}) {
  try {
    const person = await stripe.v2.core.persons.retrieve(
      accountId,
      personId
    );

    return person;

    /* {
      "id": "person_123",
      "object": "v2.core.account_person",
      "account": "acct_123",
      "given_name": "Jenny",
      "surname": "Rosen",
      "email": "jenny@example.com"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving person');
  }
}

export async function updatePerson({
  accountId,
  personId,
  givenName,
  surname,
  email,
  phone,
  relationship,
  metadata
}: {
  accountId: string;
  personId: string;
  givenName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  relationship?: Record<string, unknown>;
  metadata?: Record<string, string>;
}) {
  try {
    const person = await stripe.v2.core.persons.update(
      accountId,
      personId,
      {
        given_name: givenName,
        surname,
        email,
        phone,
        relationship,
        metadata
      }
    );

    return person;

    /* {
      "id": "person_123",
      "object": "v2.core.account_person",
      "given_name": "Jennifer",
      "surname": "Rosen",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating person');
  }
}

export async function listPersons({
  accountId,
  limit
}: {
  accountId: string;
  limit?: number;
}) {
  try {
    const persons = await stripe.v2.core.persons.list(
      accountId,
      {
        limit
      }
    );

    return persons;

    /* {
      "data": [
        {
          "id": "person_123",
          "given_name": "Jenny",
          "surname": "Rosen"
        }
      ],
      "next_page_url": null,
      "previous_page_url": null
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing persons');
  }
}

export async function deletePerson({
  accountId,
  personId
}: {
  accountId: string;
  personId: string;
}) {
  try {
    const deleted = await stripe.v2.core.persons.delete(
      accountId,
      personId
    );

    return deleted;

    /* {
      "id": "person_123",
      "object": "v2.core.account_person",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting person');
  }
}