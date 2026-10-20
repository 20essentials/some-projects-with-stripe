import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE SHARED PAYMENT ISSUED TOKEN **************/

export async function createSharedPaymentIssuedToken(
  params: Parameters<typeof stripe.sharedPayment.issuedTokens.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.sharedPayment.issuedTokens.create>>> {
  try {
    const token = await stripe.sharedPayment.issuedTokens.create(params)

    /*
    {
      "id": "spi_123",
      "object": "shared_payment.issued_token"
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create shared payment issued token')
  }
}

/************** RETRIEVE SHARED PAYMENT ISSUED TOKEN **************/

export async function retrieveSharedPaymentIssuedToken(
  tokenId: string
): Promise<Awaited<ReturnType<typeof stripe.sharedPayment.issuedTokens.retrieve>>> {
  try {
    const token = await stripe.sharedPayment.issuedTokens.retrieve(tokenId)

    /*
    {
      "id": "spi_123",
      "object": "shared_payment.issued_token"
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve shared payment issued token')
  }
}

/************** REVOKE SHARED PAYMENT ISSUED TOKEN **************/

export async function revokeSharedPaymentIssuedToken(
  tokenId: string
): Promise<Awaited<ReturnType<typeof stripe.sharedPayment.issuedTokens.revoke>>> {
  try {
    const token = await stripe.sharedPayment.issuedTokens.revoke(tokenId)

    /*
    {
      "id": "spi_123",
      "object": "shared_payment.issued_token"
    }
    */

    return token
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to revoke shared payment issued token')
  }
}