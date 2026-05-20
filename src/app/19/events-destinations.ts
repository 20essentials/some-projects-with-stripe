import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** V2 CORE EVENT DESTINATIONS ************* */

export async function createEventDestination({
  name,
  type,
  enabledEvents,
  eventPayload,
  webhookEndpoint,
  amazonEventbridge,
  description,
  metadata
}: {
  name: string;
  type: Stripe.V2.Core.EventDestinationCreateParams.Type;
  enabledEvents: string[];
  eventPayload: Stripe.V2.Core.EventDestinationCreateParams.EventPayload;
  webhookEndpoint?: {
    url: string;
  };
  amazonEventbridge?: {
    aws_account_id: string;
    aws_region: string;
  };
  description?: string;
  metadata?: Record<string, string>;
}) {
  try {
    const destination = await stripe.v2.core.eventDestinations.create({
      name,
      type,
      enabled_events: enabledEvents,
      event_payload: eventPayload,
      webhook_endpoint: webhookEndpoint,
      amazon_eventbridge: amazonEventbridge,
      description,
      metadata
    });

    return destination;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "name": "Production Webhooks",
      "type": "webhook_endpoint",
      "status": "enabled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating event destination');
  }
}

export async function retrieveEventDestination({
  eventDestinationId
}: {
  eventDestinationId: string;
}) {
  try {
    const destination =
      await stripe.v2.core.eventDestinations.retrieve(
        eventDestinationId
      );

    return destination;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "name": "Production Webhooks",
      "type": "webhook_endpoint",
      "status": "enabled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving event destination');
  }
}

export async function updateEventDestination({
  eventDestinationId,
  name,
  description,
  enabledEvents,
  metadata
}: {
  eventDestinationId: string;
  name?: string;
  description?: string;
  enabledEvents?: string[];
  metadata?: Record<string, string>;
}) {
  try {
    const destination =
      await stripe.v2.core.eventDestinations.update(
        eventDestinationId,
        {
          name,
          description,
          enabled_events: enabledEvents,
          metadata
        }
      );

    return destination;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "name": "Updated Destination",
      "status": "enabled",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating event destination');
  }
}

export async function listEventDestinations({
  limit
}: {
  limit?: number;
} = {}) {
  try {
    const destinations =
      await stripe.v2.core.eventDestinations.list({
        limit
      });

    return destinations;

    /* {
      "data": [
        {
          "id": "ed_123",
          "name": "Production Webhooks",
          "status": "enabled"
        }
      ],
      "next_page_url": null,
      "previous_page_url": null
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing event destinations');
  }
}

export async function deleteEventDestination({
  eventDestinationId
}: {
  eventDestinationId: string;
}) {
  try {
    const deleted =
      await stripe.v2.core.eventDestinations.del(
        eventDestinationId
      );

    return deleted;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting event destination');
  }
}

export async function enableEventDestination({
  eventDestinationId
}: {
  eventDestinationId: string;
}) {
  try {
    const destination =
      await stripe.v2.core.eventDestinations.enable(
        eventDestinationId
      );

    return destination;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "status": "enabled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed enabling event destination');
  }
}

export async function disableEventDestination({
  eventDestinationId
}: {
  eventDestinationId: string;
}) {
  try {
    const destination =
      await stripe.v2.core.eventDestinations.disable(
        eventDestinationId
      );

    return destination;

    /* {
      "id": "ed_123",
      "object": "v2.core.event_destination",
      "status": "disabled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed disabling event destination');
  }
}

export async function pingEventDestination({
  eventDestinationId
}: {
  eventDestinationId: string;
}) {
  try {
    const ping =
      await stripe.v2.core.eventDestinations.ping(
        eventDestinationId
      );

    return ping;

    /* {
      "object": "v2.core.event_destination_ping",
      "status": "ok"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed pinging event destination');
  }
}