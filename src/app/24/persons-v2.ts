import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PERSONS ************* */

type CreatePersonParams = Parameters<
  typeof stripe.accounts.createPerson
>[1];

type UpdatePersonParams = Parameters<
  typeof stripe.accounts.updatePerson
>[2];

export async function createPerson({
  accountId,
  firstName,
  lastName,
  email,
  phone,
  relationship
}: {
  accountId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  relationship?: CreatePersonParams['relationship'];
}): Promise<Stripe.Person> {
  try {
    const person = await stripe.accounts.createPerson(
      accountId,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        relationship
      }
    );

    return person;

    /* {
      "id": "person_123",
      "object": "person",
      "first_name": "Jenny",
      "last_name": "Rosen",
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
}): Promise<Stripe.Person> {
  try {
    const person = await stripe.accounts.retrievePerson(
      accountId,
      personId
    );

    return person;

    /* {
      "id": "person_123",
      "object": "person",
      "first_name": "Jenny",
      "last_name": "Rosen",
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
  firstName,
  lastName,
  email,
  phone,
  relationship
}: {
  accountId: string;
  personId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  relationship?: UpdatePersonParams['relationship'];
}): Promise<Stripe.Person> {
  try {
    const person = await stripe.accounts.updatePerson(
      accountId,
      personId,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        relationship
      }
    );

    return person;

    /* {
      "id": "person_123",
      "object": "person",
      "first_name": "Jennifer",
      "last_name": "Rosen"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating person');
  }
}

export async function listPersons({
  accountId,
  limit = 10
}: {
  accountId: string;
  limit?: number;
}): Promise<Stripe.ApiList<Stripe.Person>> {
  try {
    const persons = await stripe.accounts.listPersons(
      accountId,
      {
        limit
      }
    );

    return persons;

    /* {
      "object": "list",
      "data": [
        {
          "id": "person_123",
          "first_name": "Jenny",
          "last_name": "Rosen"
        }
      ],
      "has_more": false
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
    const deleted = await stripe.accounts.deletePerson(
      accountId,
      personId
    );

    return deleted;

    /* {
      "id": "person_123",
      "object": "person",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting person');
  }
}