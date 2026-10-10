import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE TRIAL OFFER **************/

export async function createTrialOffer(
  params: Parameters<typeof stripe.productCatalog.trialOffers.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.productCatalog.trialOffers.create>>> {
  try {
    const trialOffer = await stripe.productCatalog.trialOffers.create(params)

    /*
    {
      "id": "trial_offer_123",
      "object": "product_catalog.trial_offer"
    }
    */

    return trialOffer
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create trial offer')
  }
}

/************** UPDATE TRIAL OFFER **************/

export async function updateTrialOffer(
  trialOfferId: string,
  params: Parameters<typeof stripe.productCatalog.trialOffers.update>[1]
): Promise<Awaited<ReturnType<typeof stripe.productCatalog.trialOffers.update>>> {
  try {
    const trialOffer = await stripe.productCatalog.trialOffers.update(
      trialOfferId,
      params
    )

    /*
    {
      "id": "trial_offer_123",
      "object": "product_catalog.trial_offer"
    }
    */

    return trialOffer
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to update trial offer')
  }
}

/************** RETRIEVE TRIAL OFFER **************/

export async function retrieveTrialOffer(
  trialOfferId: string
): Promise<Awaited<ReturnType<typeof stripe.productCatalog.trialOffers.retrieve>>> {
  try {
    const trialOffer = await stripe.productCatalog.trialOffers.retrieve(
      trialOfferId
    )

    /*
    {
      "id": "trial_offer_123",
      "object": "product_catalog.trial_offer"
    }
    */

    return trialOffer
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve trial offer')
  }
}

/************** LIST TRIAL OFFERS **************/

export async function listTrialOffers(
  params: Parameters<typeof stripe.productCatalog.trialOffers.list>[0] = {}
): Promise<Awaited<ReturnType<typeof stripe.productCatalog.trialOffers.list>>> {
  try {
    const trialOffers = await stripe.productCatalog.trialOffers.list(params)

    /*
    {
      "object": "list",
      "data": [],
      "has_more": false
    }
    */

    return trialOffers
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list trial offers')
  }
}