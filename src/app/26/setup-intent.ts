import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** SETUP INTENTS ************* */

export async function createSetupIntent({
  customer,
  paymentMethod,
  confirm,
  description,
  metadata,
  returnUrl,
  usage,
  automaticPaymentMethods
}: {
  customer?: string;
  paymentMethod?: string;
  confirm?: boolean;
  description?: string;
  metadata?: Record<string, string>;
  returnUrl?: string;
  usage?: Stripe.SetupIntentCreateParams.Usage;
  automaticPaymentMethods?: Stripe.SetupIntentCreateParams.AutomaticPaymentMethods;
}): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer,
      payment_method: paymentMethod,
      confirm,
      description,
      metadata,
      return_url: returnUrl,
      usage,
      automatic_payment_methods: automaticPaymentMethods
    });

    return setupIntent;

    /* {
      "id": "seti_123",
      "object": "setup_intent",
      "status": "requires_payment_method",
      "client_secret": "seti_123_secret_abc",
      "customer": "cus_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating setup intent');
  }
}

export async function retrieveSetupIntent({
  setupIntentId
}: {
  setupIntentId: string;
}): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.retrieve(
      setupIntentId
    );

    return setupIntent;

    /* {
      "id": "seti_123",
      "object": "setup_intent",
      "status": "succeeded",
      "customer": "cus_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving setup intent');
  }
}

export async function updateSetupIntent({
  setupIntentId,
  customer,
  description,
  metadata,
  paymentMethod
}: {
  setupIntentId: string;
  customer?: string;
  description?: string;
  metadata?: Record<string, string>;
  paymentMethod?: string;
}): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.update(
      setupIntentId,
      {
        customer,
        description,
        metadata,
        payment_method: paymentMethod
      }
    );

    return setupIntent;

    /* {
      "id": "seti_123",
      "object": "setup_intent",
      "status": "requires_confirmation",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating setup intent');
  }
}

export async function confirmSetupIntent({
  setupIntentId,
  paymentMethod,
  returnUrl
}: {
  setupIntentId: string;
  paymentMethod?: string;
  returnUrl?: string;
}): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.confirm(
      setupIntentId,
      {
        payment_method: paymentMethod,
        return_url: returnUrl
      }
    );

    return setupIntent;

    /* {
      "id": "seti_123",
      "object": "setup_intent",
      "status": "succeeded",
      "payment_method": "pm_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed confirming setup intent');
  }
}

export async function cancelSetupIntent({
  setupIntentId,
  cancellationReason
}: {
  setupIntentId: string;
  cancellationReason?: Stripe.SetupIntentCancelParams.CancellationReason;
}): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.cancel(
      setupIntentId,
      {
        cancellation_reason: cancellationReason
      }
    );

    return setupIntent;

    /* {
      "id": "seti_123",
      "object": "setup_intent",
      "status": "canceled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed canceling setup intent');
  }
}

export async function listSetupIntents({
  customer,
  limit = 10
}: {
  customer?: string;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.SetupIntent>> {
  try {
    const setupIntents = await stripe.setupIntents.list({
      customer,
      limit
    });

    return setupIntents;

    /* {
      "object": "list",
      "data": [
        {
          "id": "seti_123",
          "status": "succeeded",
          "customer": "cus_123"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing setup intents');
  }
}