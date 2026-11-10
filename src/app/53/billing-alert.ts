import 'server-only'

import Stripe from 'stripe'

const secret = process.env.STRIPE_API_SECRET

if (!secret) throw new Error('Missing Stripe secret key')

const stripe = new Stripe(secret)

/************** CREATE BILLING ALERT **************/

export async function createBillingAlert(
  params: Parameters<typeof stripe.billing.alerts.create>[0]
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.create>>> {
  try {
    const alert = await stripe.billing.alerts.create(params)

    /*
    {
      "id": "alrt_12345",
      "object": "billing.alert",
      "title": "API Request usage alert",
      "livemode": true,
      "alert_type": "usage_threshold",
      "usage_threshold": {
        "gte": 10000,
        "meter": "mtr_12345",
        "recurrence": "one_time"
      },
      "status": "active"
    }
    */

    return alert
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to create billing alert')
  }
}

/************** RETRIEVE BILLING ALERT **************/

export async function retrieveBillingAlert(
  alertId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.retrieve>>> {
  try {
    const alert = await stripe.billing.alerts.retrieve(alertId)

    /*
    {
      "id": "alrt_12345",
      "object": "billing.alert",
      "title": "API Request usage alert",
      "livemode": true,
      "alert_type": "usage_threshold",
      "usage_threshold": {
        "gte": 10000,
        "meter": "mtr_12345",
        "recurrence": "one_time"
      },
      "status": "active"
    }
    */

    return alert
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to retrieve billing alert')
  }
}

/************** LIST BILLING ALERT NOTIFICATIONS **************/

type BillingAlertNotificationListParams = {
  id: string
  customer: string
  action?: 'recovered' | 'triggered'
  billing_group?: string
  cadence?: string
  ending_before?: string
  limit?: number
  meter?: string
  notified_at?: number | Record<string, string | number>
  starting_after?: string
  subscription?: string
}

export async function listBillingAlertNotifications({
  id,
  ...params
}: BillingAlertNotificationListParams): Promise<unknown> {
  try {
    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue

      if (key === 'notified_at' && typeof value === 'object') {
        for (const [range, rangeValue] of Object.entries(value)) {
          query.set(`notified_at[${range}]`, String(rangeValue))
        }
      } else {
        query.set(key, String(value))
      }
    }

    const response = await fetch(
      `https://api.stripe.com/v1/billing/alerts/${encodeURIComponent(id)}/notifications?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          'Stripe-Version': '2026-10-28.endive'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Stripe API request failed: ${response.status}`)
    }

    const notifications: unknown = await response.json()

    /*
    The documentation describes the response as a list of billing alert
    notification history entries, but does not include an example response.
    */

    return notifications
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list billing alert notifications')
  }
}

/************** LIST BILLING ALERTS **************/

export async function listBillingAlerts(
  params: Parameters<typeof stripe.billing.alerts.list>[0] = {}
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.list>>> {
  try {
    const alerts = await stripe.billing.alerts.list(params)

    /*
    {
      "data": [
        {
          "id": "alrt_12345",
          "object": "billing.alert",
          "title": "API Request usage alert",
          "livemode": true,
          "alert_type": "usage_threshold",
          "usage_threshold": {
            "gte": 10000,
            "meter": "mtr_12345",
            "recurrence": "one_time"
          },
          "status": "active"
        },
        {
          "id": "alrt_67890",
          "object": "billing.alert",
          "title": "API Request usage alert",
          "livemode": true,
          "alert_type": "usage_threshold",
          "usage_threshold": {
            "gte": 120,
            "meter": "mtr_67890",
            "recurrence": "one_time"
          },
          "status": "active"
        }
      ]
    }
    */

    return alerts
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to list billing alerts')
  }
}

/************** ACTIVATE BILLING ALERT **************/

export async function activateBillingAlert(
  alertId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.activate>>> {
  try {
    const alert = await stripe.billing.alerts.activate(alertId)

    /*
    {
      "id": "alrt_12345",
      "object": "billing.alert",
      "title": "API Request usage alert",
      "livemode": true,
      "alert_type": "usage_threshold",
      "usage_threshold": {
        "gte": 10000,
        "meter": "mtr_12345",
        "recurrence": "one_time"
      },
      "status": "active"
    }
    */

    return alert
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to activate billing alert')
  }
}

/************** ARCHIVE BILLING ALERT **************/

export async function archiveBillingAlert(
  alertId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.archive>>> {
  try {
    const alert = await stripe.billing.alerts.archive(alertId)

    /*
    {
      "id": "alrt_12345",
      "object": "billing.alert",
      "title": "API Request usage alert",
      "livemode": true,
      "alert_type": "usage_threshold",
      "usage_threshold": {
        "gte": 10000,
        "meter": "mtr_12345",
        "recurrence": "one_time"
      },
      "status": "archived"
    }
    */

    return alert
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to archive billing alert')
  }
}

/************** DEACTIVATE BILLING ALERT **************/

export async function deactivateBillingAlert(
  alertId: string
): Promise<Awaited<ReturnType<typeof stripe.billing.alerts.deactivate>>> {
  try {
    const alert = await stripe.billing.alerts.deactivate(alertId)

    /*
    {
      "id": "alrt_12345",
      "object": "billing.alert",
      "title": "API Request usage alert",
      "livemode": true,
      "alert_type": "usage_threshold",
      "usage_threshold": {
        "gte": 10000,
        "meter": "mtr_12345",
        "recurrence": "one_time"
      },
      "status": "inactive"
    }
    */

    return alert
  } catch (error) {
    console.error('Stripe error', error)
    throw new Error('Failed to deactivate billing alert')
  }
}
