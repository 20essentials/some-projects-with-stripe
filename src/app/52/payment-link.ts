import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE PAYMENT LINK **************/

export async function createPaymentLink(
  params: Parameters<typeof stripe.paymentLinks.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.paymentLinks.create>>> {
  try {
    const paymentLink = await stripe.paymentLinks.create(params)

    /*
    {
      "id": "plink_1MoC3ULkdIwHu7ixZjtGpVl2",
      "object": "payment_link",
      "active": true,
      "after_completion": {
        "hosted_confirmation": {
          "custom_message": null
        },
        "type": "hosted_confirmation"
      },
      "allow_promotion_codes": false,
      "application_fee_amount": null,
      "application_fee_percent": null,
      "automatic_tax": {
        "enabled": false,
        "liability": null
      },
      "billing_address_collection": "auto",
      "consent_collection": null,
      "currency": "usd",
      "custom_fields": [],
      "custom_text": {
        "shipping_address": null,
        "submit": null
      },
      "customer_creation": "if_required",
      "invoice_creation": {
        "enabled": false,
        "invoice_data": {
          "account_tax_ids": null,
          "custom_fields": null,
          "description": null,
          "footer": null,
          "issuer": null,
          "metadata": {},
          "rendering_options": null
        }
      },
      "livemode": false,
      "metadata": {},
      "on_behalf_of": null,
      "payment_intent_data": null,
      "payment_method_collection": "always",
      "payment_method_types": null,
      "phone_number_collection": {
        "enabled": false
      },
      "shipping_address_collection": null,
      "shipping_options": [],
      "submit_type": "auto",
      "subscription_data": {
        "description": null,
        "invoice_settings": {
          "issuer": {
            "type": "self"
          }
        },
        "trial_period_days": null
      },
      "tax_id_collection": {
        "enabled": false
      },
      "transfer_data": null,
      "url": "https://buy.stripe.com/test_cN25nr0iZ7bUa7meUY"
    }
    */

    return paymentLink
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create payment link')
  }
}

/************** UPDATE PAYMENT LINK **************/

export async function updatePaymentLink(
  id: string,
  params: Parameters<typeof stripe.paymentLinks.update>[1]
): Promise<Awaited<ReturnType<typeof stripe.paymentLinks.update>>> {
  try {
    const paymentLink = await stripe.paymentLinks.update(id, params)

    /*
    {
      "id": "plink_1MoC3ULkdIwHu7ixZjtGpVl2",
      "object": "payment_link",
      "active": true,
      "after_completion": {
        "hosted_confirmation": {
          "custom_message": null
        },
        "type": "hosted_confirmation"
      },
      "allow_promotion_codes": false,
      "application_fee_amount": null,
      "application_fee_percent": null,
      "automatic_tax": {
        "enabled": false,
        "liability": null
      },
      "billing_address_collection": "auto",
      "consent_collection": null,
      "currency": "usd",
      "custom_fields": [],
      "custom_text": {
        "shipping_address": null,
        "submit": null
      },
      "customer_creation": "if_required",
      "invoice_creation": {
        "enabled": false,
        "invoice_data": {
          "account_tax_ids": null,
          "custom_fields": null,
          "description": null,
          "footer": null,
          "issuer": null,
          "metadata": {},
          "rendering_options": null
        }
      },
      "livemode": false,
      "metadata": {
        "order_id": "6735"
      },
      "on_behalf_of": null,
      "payment_intent_data": null,
      "payment_method_collection": "always",
      "payment_method_types": null,
      "phone_number_collection": {
        "enabled": false
      },
      "shipping_address_collection": null,
      "shipping_options": [],
      "submit_type": "auto",
      "subscription_data": {
        "description": null,
        "invoice_settings": {
          "issuer": {
            "type": "self"
          }
        },
        "trial_period_days": null
      },
      "tax_id_collection": {
        "enabled": false
      },
      "transfer_data": null,
      "url": "https://buy.stripe.com/test_cN25nr0iZ7bUa7meUY"
    }
    */

    return paymentLink
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to update payment link')
  }
}

/************** RETRIEVE PAYMENT LINK **************/

export async function retrievePaymentLink(
  id: string
): Promise<Awaited<ReturnType<typeof stripe.paymentLinks.retrieve>>> {
  try {
    const paymentLink = await stripe.paymentLinks.retrieve(id)

    /*
    {
      "id": "plink_1MoC3ULkdIwHu7ixZjtGpVl2",
      "object": "payment_link",
      "active": true,
      "after_completion": {
        "hosted_confirmation": {
          "custom_message": null
        },
        "type": "hosted_confirmation"
      },
      "allow_promotion_codes": false,
      "application_fee_amount": null,
      "application_fee_percent": null,
      "automatic_tax": {
        "enabled": false,
        "liability": null
      },
      "billing_address_collection": "auto",
      "consent_collection": null,
      "currency": "usd",
      "custom_fields": [],
      "custom_text": {
        "shipping_address": null,
        "submit": null
      },
      "customer_creation": "if_required",
      "invoice_creation": {
        "enabled": false,
        "invoice_data": {
          "account_tax_ids": null,
          "custom_fields": null,
          "description": null,
          "footer": null,
          "issuer": null,
          "metadata": {},
          "rendering_options": null
        }
      },
      "livemode": false,
      "metadata": {},
      "on_behalf_of": null,
      "payment_intent_data": null,
      "payment_method_collection": "always",
      "payment_method_types": null,
      "phone_number_collection": {
        "enabled": false
      },
      "shipping_address_collection": null,
      "shipping_options": [],
      "submit_type": "auto",
      "subscription_data": {
        "description": null,
        "invoice_settings": {
          "issuer": {
            "type": "self"
          }
        },
        "trial_period_days": null
      },
      "tax_id_collection": {
        "enabled": false
      },
      "transfer_data": null,
      "url": "https://buy.stripe.com/test_cN25nr0iZ7bUa7meUY"
    }
    */

    return paymentLink
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve payment link')
  }
}

/************** RETRIEVE PAYMENT LINK LINE ITEMS **************/

export async function retrievePaymentLinkLineItems(
  id: string,
  params: Stripe.PaymentLinkListLineItemsParams
): Promise<Awaited<ReturnType<typeof stripe.paymentLinks.listLineItems>>> {
  try {
    const lineItems = await stripe.paymentLinks.listLineItems(id, params)

    /*
    {
      "object": "list",
      "data": [
        {
          "id": "li_NpsHNiHSaDeU0X",
          "object": "item",
          "amount_discount": 0,
          "amount_subtotal": 1099,
          "amount_tax": 0,
          "amount_total": 1099,
          "currency": "usd",
          "description": "T-shirt",
          "price": {
            "id": "price_1N4AEsLkdIwHu7ix7Ssho8Cl",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1683237782,
            "currency": "usd",
            "custom_unit_amount": null,
            "livemode": false,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_NppuJWzzNnD5Ut",
            "recurring": null,
            "tax_behavior": "unspecified",
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "one_time",
            "unit_amount": 1099,
            "unit_amount_decimal": "1099"
          },
          "quantity": 1
        }
      ],
      "has_more": false,
      "url": "/v1/payment_links/plink_1N4CWjLkdIwHu7ix2Y2F1kqb/line_items"
    }
    */

    return lineItems
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve payment link line items')
  }
}

/************** LIST PAYMENT LINKS **************/

export async function listPaymentLinks(
  params: Stripe.PaymentLinkListParams
): Promise<Awaited<ReturnType<typeof stripe.paymentLinks.list>>> {
  try {
    const paymentLinks = await stripe.paymentLinks.list(params)

    /*
    {
      "object": "list",
      "url": "/v1/payment_links",
      "has_more": false,
      "data": [
        {
          "id": "plink_1MoC3ULkdIwHu7ixZjtGpVl2",
          "object": "payment_link",
          "active": true,
          "after_completion": {
            "hosted_confirmation": {
              "custom_message": null
            },
            "type": "hosted_confirmation"
          },
          "allow_promotion_codes": false,
          "application_fee_amount": null,
          "application_fee_percent": null,
          "automatic_tax": {
            "enabled": false,
            "liability": null
          },
          "billing_address_collection": "auto",
          "consent_collection": null,
          "currency": "usd",
          "custom_fields": [],
          "custom_text": {
            "shipping_address": null,
            "submit": null
          },
          "customer_creation": "if_required",
          "invoice_creation": {
            "enabled": false,
            "invoice_data": {
              "account_tax_ids": null,
              "custom_fields": null,
              "description": null,
              "footer": null,
              "issuer": null,
              "metadata": {},
              "rendering_options": null
            }
          },
          "livemode": false,
          "metadata": {},
          "on_behalf_of": null,
          "payment_intent_data": null,
          "payment_method_collection": "always",
          "payment_method_types": null,
          "phone_number_collection": {
            "enabled": false
          },
          "shipping_address_collection": null,
          "shipping_options": [],
          "submit_type": "auto",
          "subscription_data": {
            "description": null,
            "invoice_settings": {
              "issuer": {
                "type": "self"
              }
            },
            "trial_period_days": null
          },
          "tax_id_collection": {
            "enabled": false
          },
          "transfer_data": null,
          "url": "https://buy.stripe.com/test_cN25nr0iZ7bUa7meUY"
        }
      ]
    }
    */

    return paymentLinks
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list payment links')
  }
}
