import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** RETRIEVE CREDIT BALANCE SUMMARY **************/

export async function retrieveCreditBalanceSummary(
  params: Parameters<typeof stripe.billing.creditBalanceSummary.retrieve>[0]
): Promise<Awaited<ReturnType<typeof stripe.billing.creditBalanceSummary.retrieve>>> {
  try {
    const summary = await stripe.billing.creditBalanceSummary.retrieve(params)

    /*
    {
      "object": "billing.credit_balance_summary",
      "balances": [
        {
          "available_balance": {
            "monetary": {
              "currency": "usd",
              "value": 1000
            },
            "type": "monetary"
          },
          "ledger_balance": {
            "monetary": {
              "currency": "usd",
              "value": 1000
            },
            "type": "monetary"
          }
        }
      ],
      "customer": "cus_QsEHa3GKweMwih",
      "livemode": false
    }
    */

    return summary
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve credit balance summary')
  }
}
