import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE BILLING CREDIT GRANT **************/

export async function createBillingCreditGrant(
  params: Parameters<typeof stripe.billing.creditGrants.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.create>>> {
  try {
    const creditGrant = await stripe.billing.creditGrants.create(params)

    /*
    {
      "id": "credgr_test_61R9a6NUWsRmOW3RM41L6nFOS1ekDGHo",
      "object": "billing.credit_grant",
      "amount": {
        "monetary": {
          "currency": "usd",
          "value": 1000
        },
        "type": "monetary"
      },
      "applicability_config": {
        "scope": {
          "price_type": "metered"
        }
      },
      "category": "paid",
      "created": 1726620803,
      "customer": "cus_QrvQguzkIK8zTj",
      "effective_at": 1729297860,
      "expires_at": null,
      "livemode": false,
      "metadata": {},
      "name": "Purchased Credits",
      "priority": 50,
      "test_clock": null,
      "updated": 1726620803
    }
    */

    return creditGrant
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create billing credit grant')
  }
}

/************** UPDATE BILLING CREDIT GRANT **************/

export async function updateBillingCreditGrant(
  creditGrantId: string,
  params: Parameters<typeof stripe.billing.creditGrants.update>[1]
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.update>>> {
  try {
    const creditGrant = await stripe.billing.creditGrants.update(creditGrantId, params)

    /*
    {
      "id": "credgr_test_61R9rpFu8SZkXPTkU41L6nFOS1ekDKoa",
      "object": "billing.credit_grant",
      "amount": {
        "monetary": {
          "currency": "usd",
          "value": 1000
        },
        "type": "monetary"
      },
      "applicability_config": {
        "scope": {
          "price_type": "metered"
        }
      },
      "category": "paid",
      "created": 1726688933,
      "customer": "cus_QsEHa3GKweMwih",
      "effective_at": 1726688933,
      "expires_at": 1759302000,
      "livemode": false,
      "metadata": {
        "cost_basis": "0.9"
      },
      "name": "Purchased Credits",
      "priority": 50,
      "test_clock": null,
      "updated": 1726688977,
      "voided_at": null
    }
    */

    return creditGrant
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to update billing credit grant')
  }
}

/************** RETRIEVE BILLING CREDIT GRANT **************/

export async function retrieveBillingCreditGrant(
  creditGrantId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.retrieve>>> {
  try {
    const creditGrant = await stripe.billing.creditGrants.retrieve(creditGrantId)

    /*
    {
      "id": "credgr_test_61R9a6NUWsRmOW3RM41L6nFOS1ekDGHo",
      "object": "billing.credit_grant",
      "amount": {
        "monetary": {
          "currency": "usd",
          "value": 1000
        },
        "type": "monetary"
      },
      "applicability_config": {
        "scope": {
          "price_type": "metered"
        }
      },
      "category": "paid",
      "created": 1726620803,
      "customer": "cus_QrvQguzkIK8zTj",
      "effective_at": 1729297860,
      "expires_at": null,
      "livemode": false,
      "metadata": {},
      "name": "Purchased Credits",
      "priority": 50,
      "test_clock": null,
      "updated": 1726620803
    }
    */

    return creditGrant
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve billing credit grant')
  }
}

/************** LIST BILLING CREDIT GRANTS **************/

export async function listBillingCreditGrants(
  params?: Parameters<typeof stripe.billing.creditGrants.list>[0]
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.list>>> {
  try {
    const creditGrants = await stripe.billing.creditGrants.list(params)

    /*
    {
      "object": "list",
      "data": [
        {
          "id": "credgr_test_61R9a6NUWsRmOW3RM41L6nFOS1ekDGHo",
          "object": "billing.credit_grant",
          "amount": {
            "monetary": {
              "currency": "usd",
              "value": 1000
            },
            "type": "monetary"
          },
          "applicability_config": {
            "scope": {
              "price_type": "metered"
            }
          },
          "category": "paid",
          "created": 1726620803,
          "customer": "cus_QrvQguzkIK8zTj",
          "effective_at": 1729297860,
          "expires_at": null,
          "livemode": false,
          "metadata": {},
          "name": "Purchased Credits",
          "priority": 50,
          "test_clock": null,
          "updated": 1726620803,
          "voided_at": null
        }
      ],
      "has_more": false,
      "url": "/v1/billing/credit_grants"
    }
    */

    return creditGrants
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list billing credit grants')
  }
}

/************** EXPIRE BILLING CREDIT GRANT **************/

export async function expireBillingCreditGrant(
  creditGrantId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.expire>>> {
  try {
    const creditGrant = await stripe.billing.creditGrants.expire(creditGrantId)

    /*
    {
      "id": "credgr_test_61R9rm9vto9SMMvt041L6nFOS1ekDCim",
      "object": "billing.credit_grant",
      "amount": {
        "monetary": {
          "currency": "usd",
          "value": 1000
        },
        "type": "monetary"
      },
      "applicability_config": {
        "scope": {
          "price_type": "metered"
        }
      },
      "category": "paid",
      "created": 1726688741,
      "customer": "cus_QsEHa3GKweMwih",
      "effective_at": 1726688741,
      "expires_at": 1726688796,
      "livemode": false,
      "metadata": {},
      "name": "Purchased Credits",
      "priority": 50,
      "test_clock": null,
      "updated": 1726688796,
      "voided_at": null
    }
    */

    return creditGrant
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to expire billing credit grant')
  }
}

/************** VOID BILLING CREDIT GRANT **************/

export async function voidBillingCreditGrant(
  creditGrantId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.creditGrants.voidGrant>>> {
  try {
    const creditGrant = await stripe.billing.creditGrants.voidGrant(creditGrantId)

    /*
    {
      "id": "credgr_test_61R9rnNTDmZ657a2r41L6nFOS1ekD5Ae",
      "object": "billing.credit_grant",
      "amount": {
        "monetary": {
          "currency": "usd",
          "value": 1000
        },
        "type": "monetary"
      },
      "applicability_config": {
        "scope": {
          "price_type": "metered"
        }
      },
      "category": "paid",
      "created": 1726688817,
      "customer": "cus_QsEHa3GKweMwih",
      "effective_at": 1726688817,
      "expires_at": null,
      "livemode": false,
      "metadata": {},
      "name": "Purchased Credits",
      "priority": 50,
      "test_clock": null,
      "updated": 1726688829,
      "voided_at": 1726688829
    }
    */

    return creditGrant
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to void billing credit grant')
  }
}
