import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CUSTOMERS ************* */

export async function createCustomer({
  email,
  name,
  description,
  metadata
}: {
  email?: string;
  name?: string;
  description?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      description,
      metadata
    });
    return customer;

    /* {
      "id": "cus_123",
      "object": "customer",
      "email": "user@example.com",
      "name": "John Doe",
      "description": "Test customer",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating customer');
  }
}

export async function retrieveCustomer({
  customerId
}: {
  customerId: string;
}): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;

    /* {
      "id": "cus_123",
      "object": "customer",
      "email": "user@example.com",
      "name": "John Doe",
      "deleted": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving customer');
  }
}

export async function updateCustomer({
  customerId,
  email,
  name,
  description,
  metadata
}: {
  customerId: string;
  email?: string;
  name?: string;
  description?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.update(customerId, {
      email,
      name,
      description,
      metadata
    });
    return customer;

    /* {
      "id": "cus_123",
      "object": "customer",
      "email": "updated@example.com",
      "name": "Updated Name",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating customer');
  }
}

export async function deleteCustomer({
  customerId
}: {
  customerId: string;
}): Promise<Stripe.DeletedCustomer> {
  try {
    const deleted = await stripe.customers.del(customerId);
    return deleted;

    /* {
      "id": "cus_123",
      "object": "customer",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting customer');
  }
}

export async function listCustomers({
  limit = 10
}: {
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.Customer>> {
  try {
    const customers = await stripe.customers.list({ limit });
    return customers;

    /* {
      "object": "list",
      "data": [
        {
          "id": "cus_123",
          "email": "user@example.com",
          "name": "John Doe"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing customers');
  }
}

export async function searchCustomers({
  query,
  limit = 10
}: {
  query: string;
  limit?: number;
}): Promise<Stripe.ApiSearchResult<Stripe.Customer>> {
  try {
    const result = await stripe.customers.search({
      query,
      limit
    });
    return result;

    /* {
      "object": "search_result",
      "data": [
        {
          "id": "cus_123",
          "email": "user@example.com",
          "name": "John Doe"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed searching customers');
  }
}