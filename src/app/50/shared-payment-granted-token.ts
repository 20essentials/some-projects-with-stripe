import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** RETRIEVE SHARED PAYMENT GRANTED TOKEN **************/

export async function retrieveSharedPaymentGrantedToken(
  tokenId: string
): Promise<Awaited<ReturnType<typeof stripe.sharedPayment.grantedTokens.retrieve>>> {
  try {
    const token = await stripe.sharedPayment.grantedTokens.retrieve(tokenId)

    /*
    {
      "id": "spt_1RgaZcFPC5QUO6ZCDVZuVA8q",
      "object": "shared_payment.granted_token",
      "created": 1751500820,
      "deactivated_at": null,
      "deactivated_reason": null,
      "livemode": false,
      "shared_metadata": {},
      "usage_details": {
        "amount_captured": {
          "value": 0,
          "currency": "usd"
        }
      },
      "usage_limits": {
        "currency": "usd",
        "expires_at": 1751587220,
        "max_amount": 1000
      }
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve shared payment granted token')
  }
}

/************** CREATE TEST SHARED PAYMENT GRANTED TOKEN **************/

export async function createTestSharedPaymentGrantedToken(
  params: Parameters<typeof stripe.testHelpers.sharedPayment.grantedTokens.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.testHelpers.sharedPayment.grantedTokens.create>>> {
  try {
    const token = await stripe.testHelpers.sharedPayment.grantedTokens.create(params)

    /*
    {
      "id": "spt_1RgaZcFPC5QUO6ZCDVZuVA8q",
      "object": "shared_payment.granted_token",
      "deactivated_at": null,
      "deactivated_reason": null,
      "livemode": false,
      "shared_metadata": {},
      "usage_details": {
        "amount_captured": {
          "value": 0,
          "currency": "usd"
        }
      },
      "usage_limits": {
        "currency": "usd",
        "expires_at": 1751587220,
        "max_amount": 1000
      }
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create test shared payment granted token')
  }
}

/************** REVOKE TEST SHARED PAYMENT GRANTED TOKEN **************/

export async function revokeTestSharedPaymentGrantedToken(
  tokenId: string
): Promise<Awaited<ReturnType<typeof stripe.testHelpers.sharedPayment.grantedTokens.revoke>>> {
  try {
    const token = await stripe.testHelpers.sharedPayment.grantedTokens.revoke(tokenId)

    /*
    {
      "id": "spt_1RgaZcFPC5QUO6ZCDVZuVA8q",
      "object": "shared_payment.granted_token",
      "deactivated_at": 1751587220,
      "deactivated_reason": "revoked",
      "livemode": false,
      "shared_metadata": {},
      "usage_details": {
        "amount_captured": {
          "value": 0,
          "currency": "usd"
        }
      },
      "usage_limits": {
        "currency": "usd",
        "expires_at": 1751587220,
        "max_amount": 1000
      }
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to revoke test shared payment granted token')
  }
}