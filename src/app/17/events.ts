import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** EVENTS ************* */

export async function retrieveEvent({
  eventId
}: {
  eventId: string;
}): Promise<Stripe.Event> {
  try {
    const event = await stripe.events.retrieve(eventId);
    return event;

    /* {
      "id": "evt_123",
      "object": "event",
      "type": "payment_intent.succeeded",
      "api_version": "2025-09-30",
      "created": 1710000000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving event');
  }
}

export async function listEvents({
  type,
  limit = 10
}: {
  type?: string;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.Event>> {
  try {
    const events = await stripe.events.list({
      type,
      limit
    });
    return events;

    /* {
      "object": "list",
      "data": [
        {
          "id": "evt_123",
          "type": "charge.succeeded",
          "created": 1710000000
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing events');
  }
}