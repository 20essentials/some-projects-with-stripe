import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PRODUCTS ************* */

export async function createProduct({
  name,
  active,
  description,
  metadata,
  images,
  statementDescriptor,
  taxCode,
  unitLabel
}: {
  name: string;
  active?: boolean;
  description?: string;
  metadata?: Record<string, string>;
  images?: string[];
  statementDescriptor?: string;
  taxCode?: string;
  unitLabel?: string;
}): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.create({
      name,
      active,
      description,
      metadata,
      images,
      statement_descriptor: statementDescriptor,
      tax_code: taxCode,
      unit_label: unitLabel
    });

    return product;

    /* {
      "id": "prod_123",
      "object": "product",
      "active": true,
      "created": 1720000000,
      "default_price": null,
      "description": "Premium product",
      "images": [],
      "livemode": false,
      "metadata": {},
      "name": "Premium Product",
      "tax_code": null,
      "type": "service",
      "unit_label": null
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating product');
  }
}

export async function updateProduct({
  productId,
  name,
  active,
  description,
  metadata,
  images,
  statementDescriptor,
  taxCode,
  unitLabel
}: {
  productId: string;
  name?: string;
  active?: boolean;
  description?: string;
  metadata?: Record<string, string>;
  images?: string[];
  statementDescriptor?: string;
  taxCode?: string;
  unitLabel?: string;
}): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.update(
      productId,
      {
        name,
        active,
        description,
        metadata,
        images,
        statement_descriptor: statementDescriptor,
        tax_code: taxCode,
        unit_label: unitLabel
      }
    );

    return product;

    /* {
      "id": "prod_123",
      "object": "product",
      "active": true,
      "name": "Updated Product",
      "description": "Updated description",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating product');
  }
}

export async function retrieveProduct({
  productId
}: {
  productId: string;
}): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.retrieve(productId);

    return product;

    /* {
      "id": "prod_123",
      "object": "product",
      "active": true,
      "name": "Premium Product",
      "description": "Premium product"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving product');
  }
}

export async function listProducts({
  active,
  limit = 10,
  startingAfter,
  endingBefore
}: {
  active?: boolean;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
} = {}): Promise<Stripe.ApiList<Stripe.Product>> {
  try {
    const products = await stripe.products.list({
      active,
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    });

    return products;

    /* {
      "object": "list",
      "data": [
        {
          "id": "prod_123",
          "object": "product",
          "active": true,
          "name": "Premium Product"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing products');
  }
}

export async function deleteProduct({
  productId
}: {
  productId: string;
}): Promise<Stripe.DeletedProduct> {
  try {
    const deleted = await stripe.products.del(productId);

    return deleted;

    /* {
      "id": "prod_123",
      "object": "product",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting product');
  }
}

export async function searchProducts({
  query,
  limit = 10,
  page
}: {
  query: string;
  limit?: number;
  page?: string;
}): Promise<Stripe.ApiSearchResult<Stripe.Product>> {
  try {
    const products = await stripe.products.search({
      query,
      limit,
      page
    });

    return products;

    /* {
      "object": "search_result",
      "data": [
        {
          "id": "prod_123",
          "object": "product",
          "active": true,
          "name": "Premium Product"
        }
      ],
      "has_more": false,
      "next_page": null,
      "url": "/v1/products/search"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed searching products');
  }
}