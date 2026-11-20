import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** RETRIEVE CREDIT BALANCE TRANSACTION **************/

export async function retrieveCreditBalanceTransaction(
  transactionId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.creditBalanceTransactions.retrieve>>> {
  try {
    const transaction = await stripe.billing.creditBalanceTransactions.retrieve(transactionId)

    /*
    {
      "id": "cbtxn_test_61R9ZljjaFmdidb6e41L6nFOS1ekD9Ue",
      "object": "billing.credit_balance_transaction",
      "created": 1726619524,
      "credit": null,
      "credit_grant": "credgr_test_61R9ZkIkIzLSp0xze41L6nFOS1ekDTPE",
      "debit": {
        "amount": {
          "monetary": {
            "currency": "usd",
            "value": 1000
          },
          "type": "monetary"
        },
        "credits_applied": {
          "invoice": "in_1Q0BoLL6nFOS1ekDbwBM5ER1",
          "invoice_line_item": "il_1QB443L6nFOS1ekDwRiN3Z4n"
        },
        "type": "credits_applied"
      },
      "effective_at": 1729211351,
      "livemode": false,
      "test_clock": "clock_1Q0BoJL6nFOS1ekDbyYYuseM",
      "type": "debit"
    }
    */

    return transaction
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve credit balance transaction')
  }
}

/************** LIST CREDIT BALANCE TRANSACTIONS **************/

export async function listCreditBalanceTransactions(
  params: Stripe.Billing.CreditBalanceTransactionListParams = {}
): Promise<Awaited<ReturnType<typeof stripe.billing.creditBalanceTransactions.list>>> {
  try {
    const transactions = await stripe.billing.creditBalanceTransactions.list(params)

    /*
    {
      "object": "list",
      "data": [
        {
          "id": "cbtxn_test_61R9ZljjaFmdidb6e41L6nFOS1ekD9Ue",
          "object": "billing.credit_balance_transaction",
          "created": 1726619524,
          "credit": null,
          "credit_grant": "credgr_test_61R9ZkIkIzLSp0xze41L6nFOS1ekDTPE",
          "debit": {
            "amount": {
              "monetary": {
                "currency": "usd",
                "value": 1000
              },
              "type": "monetary"
            },
            "credits_applied": {
              "invoice": "in_1Q0BoLL6nFOS1ekDbwBM5ER1",
              "invoice_line_item": "il_1QB443L6nFOS1ekDwRiN3Z4n"
            },
            "type": "credits_applied"
          },
          "effective_at": 1729211351,
          "livemode": false,
          "test_clock": "clock_1Q0BoJL6nFOS1ekDbyYYuseM",
          "type": "debit"
        },
        {
          "id": "cbtxn_test_61R9ZkIbb17ze4b2s41L6nFOS1ekDXHs",
          "object": "billing.credit_balance_transaction",
          "created": 1726619434,
          "credit": {
            "amount": {
              "monetary": {
                "currency": "usd",
                "value": 1000
              },
              "type": "monetary"
            },
            "type": "credits_granted"
          },
          "credit_grant": "credgr_test_61R9ZkIkIzLSp0xze41L6nFOS1ekDTPE",
          "debit": null,
          "effective_at": 1726619434,
          "livemode": false,
          "test_clock": "clock_1Q0BoJL6nFOS1ekDbyYYuseM",
          "type": "credit"
        }
      ],
      "has_more": false,
      "url": "/v1/billing/credit_grants"
    }
    */

    return transactions
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list credit balance transactions')
  }
}
