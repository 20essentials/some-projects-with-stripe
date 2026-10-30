import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE CHECKOUT SESSION **************/

export async function createCheckoutSession(
  params: Parameters<typeof stripe.checkout.sessions.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.create>>> {
  try {
    const session = await stripe.checkout.sessions.create(params)

    /*
    {
      "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
      "object": "checkout.session",
      "amount_subtotal": 2198,
      "amount_total": 2198,
      "created": 1679600215,
      "currency": "usd",
      "customer": null,
      "customer_creation": "if_required",
      "expires_at": 1679686615,
      "livemode": false,
      "metadata": {},
      "mode": "payment",
      "payment_intent": null,
      "payment_status": "unpaid",
      "status": "open",
      "success_url": "https://example.com/success",
      "url": "https://checkout.stripe.com/c/pay/cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u"
    }
    */

    return session
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create checkout session')
  }
}

/************** UPDATE CHECKOUT SESSION **************/

export async function updateCheckoutSession(
  id: string,
  params: Parameters<typeof stripe.checkout.sessions.update>[1]
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.update>>> {
  try {
    const session = await stripe.checkout.sessions.update(id, params)

    /*
    {
      "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
      "object": "checkout.session",
      "amount_subtotal": 2198,
      "amount_total": 2198,
      "created": 1679600215,
      "currency": "usd",
      "metadata": {
        "order_id": "6735"
      },
      "mode": "payment",
      "payment_status": "unpaid",
      "status": "open",
      "success_url": "https://example.com/success"
    }
    */

    return session
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to update checkout session')
  }
}

/************** RETRIEVE CHECKOUT SESSION **************/

export async function retrieveCheckoutSession(
  id: string
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>> {
  try {
    const session = await stripe.checkout.sessions.retrieve(id)

    /*
    {
      "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
      "object": "checkout.session",
      "amount_subtotal": 2198,
      "amount_total": 2198,
      "created": 1679600215,
      "currency": "usd",
      "customer": null,
      "expires_at": 1679686615,
      "livemode": false,
      "metadata": {},
      "mode": "payment",
      "payment_intent": null,
      "payment_status": "unpaid",
      "status": "open",
      "success_url": "https://example.com/success"
    }
    */

    return session
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve checkout session')
  }
}

/************** LIST CHECKOUT SESSION LINE ITEMS **************/

export async function listCheckoutSessionLineItems(
  id: string,
  params: Parameters<typeof stripe.checkout.sessions.listLineItems>[1]
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.listLineItems>>> {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(id, params)

    /*
    {
      "object": "list",
      "data": [
        {
          "id": "li_1N4BEoLkdIwHu7ixWtXug1yk",
          "object": "item",
          "amount_discount": 0,
          "amount_subtotal": 2198,
          "amount_tax": 0,
          "amount_total": 2198,
          "currency": "usd",
          "description": "T-shirt",
          "price": {
            "id": "price_1N4AEsLkdIwHu7ix7Ssho8Cl",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1683237782,
            "currency": "usd",
            "product": "prod_NppuJWzzNnD5Ut",
            "recurring": null,
            "type": "one_time",
            "unit_amount": 1099,
            "unit_amount_decimal": "1099"
          },
          "quantity": 2
        }
      ],
      "has_more": false,
      "url": "/v1/checkout/sessions/cs_test_a1enSAC01IA3Ps2vL32mNoWKMCNmmfUGTeEeHXI5tLCvyFNGsdG2UNA7mr/line_items"
    }
    */

    return lineItems
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list checkout session line items')
  }
}

/************** LIST CHECKOUT SESSIONS **************/

export async function listCheckoutSessions(
  params: Parameters<typeof stripe.checkout.sessions.list>[0]
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.list>>> {
  try {
    const sessions = await stripe.checkout.sessions.list(params)

    /*
    {
      "object": "list",
      "url": "/v1/checkout/sessions",
      "has_more": false,
      "data": [
        {
          "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
          "object": "checkout.session",
          "amount_subtotal": 2198,
          "amount_total": 2198,
          "created": 1679600215,
          "currency": "usd",
          "mode": "payment",
          "payment_status": "unpaid",
          "status": "open",
          "success_url": "https://example.com/success"
        }
      ]
    }
    */

    return sessions
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list checkout sessions')
  }
}

/************** EXPIRE CHECKOUT SESSION **************/

export async function expireCheckoutSession(
  id: string
): Promise<Awaited<ReturnType<typeof stripe.checkout.sessions.expire>>> {
  try {
    const session = await stripe.checkout.sessions.expire(id)

    /*
    {
      "id": "cs_test_a1Ae6ClgOkjygKwrf9B3L6ITtUuZW4Xx9FivL6DZYoYFdfAefQxsYpJJd3",
      "object": "checkout.session",
      "amount_subtotal": 2198,
      "amount_total": 2198,
      "created": 1679434412,
      "currency": "usd",
      "expires_at": 1679520812,
      "livemode": false,
      "metadata": {},
      "mode": "payment",
      "payment_status": "unpaid",
      "status": "expired",
      "success_url": "https://example.com/success",
      "url": null
    }
    */

    return session
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to expire checkout session')
  }
}
