import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE PROMOTION CODE **************/

export async function createPromotionCode({
  promotion,
  active,
  code,
  customer,
  customerAccount,
  expiresAt,
  maxRedemptions,
  metadata,
  restrictions
}: {
  promotion: Stripe.PromotionCodeCreateParams.Promotion
  active?: boolean
  code?: string
  customer?: string
  customerAccount?: string
  expiresAt?: number
  maxRedemptions?: number
  metadata?: Record<string, string>
  restrictions?: Stripe.PromotionCodeCreateParams.Restrictions
}): Promise<Stripe.PromotionCode> {
  try {
    const promotionCode = await stripe.promotionCodes.create({
      promotion,
      active,
      code,
      customer,
      customer_account: customerAccount,
      expires_at: expiresAt,
      max_redemptions: maxRedemptions,
      metadata,
      restrictions
    })

    /*
    {
      "id": "promo_1MiM6KLkdIwHu7ixrIaX4wgn",
      "object": "promotion_code",
      "active": true,
      "code": "A1H1Q1MG",
      "promotion": {
        "type": "coupon",
        "coupon": "nVJYDOag"
      },
      "created": 1678040164,
      "customer": null,
      "expires_at": null,
      "livemode": false,
      "max_redemptions": null,
      "metadata": {},
      "restrictions": {
        "first_time_transaction": false,
        "minimum_amount": null,
        "minimum_amount_currency": null
      },
      "times_redeemed": 0
    }
    */

    return promotionCode
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create promotion code')
  }
}

/************** UPDATE PROMOTION CODE **************/

export async function updatePromotionCode({
  promotionCodeId,
  active,
  metadata,
  restrictions
}: {
  promotionCodeId: string
  active?: boolean
  metadata?: Record<string, string>
  restrictions?: Stripe.PromotionCodeUpdateParams.Restrictions
}): Promise<Stripe.PromotionCode> {
  try {
    const promotionCode = await stripe.promotionCodes.update(promotionCodeId, {
      active,
      metadata,
      restrictions
    })

    /*
    {
      "id": "promo_1MiM6KLkdIwHu7ixrIaX4wgn",
      "object": "promotion_code",
      "active": true,
      "code": "A1H1Q1MG",
      "promotion": {
        "type": "coupon",
        "coupon": "nVJYDOag"
      },
      "created": 1678040164,
      "customer": null,
      "expires_at": null,
      "livemode": false,
      "max_redemptions": null,
      "metadata": {
        "order_id": "6735"
      },
      "restrictions": {
        "first_time_transaction": false,
        "minimum_amount": null,
        "minimum_amount_currency": null
      },
      "times_redeemed": 0
    }
    */

    return promotionCode
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to update promotion code')
  }
}

/************** RETRIEVE PROMOTION CODE **************/

export async function retrievePromotionCode(
  promotionCodeId: string
): Promise<Stripe.PromotionCode> {
  try {
    const promotionCode = await stripe.promotionCodes.retrieve(promotionCodeId)

    /*
    {
      "id": "promo_1MiM6KLkdIwHu7ixrIaX4wgn",
      "object": "promotion_code",
      "active": true,
      "code": "A1H1Q1MG",
      "promotion": {
        "type": "coupon",
        "coupon": "nVJYDOag"
      },
      "created": 1678040164,
      "customer": null,
      "expires_at": null,
      "livemode": false,
      "max_redemptions": null,
      "metadata": {},
      "restrictions": {
        "first_time_transaction": false,
        "minimum_amount": null,
        "minimum_amount_currency": null
      },
      "times_redeemed": 0
    }
    */

    return promotionCode
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve promotion code')
  }
}

/************** LIST PROMOTION CODES **************/

export async function listPromotionCodes({
  active,
  code,
  coupon,
  created,
  customer,
  customerAccount,
  limit,
  startingAfter,
  endingBefore
}: {
  active?: boolean
  code?: string
  coupon?: string
  created?: Stripe.PromotionCodeListParams.Created
  customer?: string
  customerAccount?: string
  limit?: number
  startingAfter?: string
  endingBefore?: string
} = {}): Promise<Stripe.ApiList<Stripe.PromotionCode>> {
  try {
    const promotionCodes = await stripe.promotionCodes.list({
      active,
      code,
      coupon,
      created,
      customer,
      customer_account: customerAccount,
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    })

    /*
    {
      "object": "list",
      "url": "/v1/promotion_codes",
      "has_more": false,
      "data": [
        {
          "id": "promo_1MiM6KLkdIwHu7ixrIaX4wgn",
          "object": "promotion_code",
          "active": true,
          "code": "A1H1Q1MG",
          "promotion": {
            "type": "coupon",
            "coupon": "nVJYDOag"
          },
          "created": 1678040164,
          "customer": null,
          "expires_at": null,
          "livemode": false,
          "max_redemptions": null,
          "metadata": {},
          "restrictions": {
            "first_time_transaction": false,
            "minimum_amount": null,
            "minimum_amount_currency": null
          },
          "times_redeemed": 0
        }
      ]
    }
    */

    return promotionCodes
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list promotion codes')
  }
}