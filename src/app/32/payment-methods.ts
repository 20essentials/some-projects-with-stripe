import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PAYMENT METHODS ************* */

export async function createPaymentMethod({
  type,
  billingDetails,
  card,
  metadata
}: {
  type: Stripe.PaymentMethodCreateParams.Type;
  billingDetails?: Stripe.PaymentMethodCreateParams.BillingDetails;
  card?: Stripe.PaymentMethodCreateParams.Card;
  metadata?: Record<string, string>;
}): Promise<Stripe.PaymentMethod> {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type,
      billing_details: billingDetails,
      card,
      metadata
    });

    return paymentMethod;

    /* {
      "id": "pm_123",
      "object": "payment_method",
      "type": "card",
      "card": {
        "brand": "visa",
        "last4": "4242"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating payment method');
  }
}

export async function retrievePaymentMethod({
  paymentMethodId
}: {
  paymentMethodId: string;
}): Promise<Stripe.PaymentMethod> {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId
    );

    return paymentMethod;

    /* {
      "id": "pm_123",
      "object": "payment_method",
      "type": "card",
      "customer": "cus_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving payment method');
  }
}

export async function updatePaymentMethod({
  paymentMethodId,
  billingDetails,
  metadata,
  card
}: {
  paymentMethodId: string;
  billingDetails?: Stripe.PaymentMethodUpdateParams.BillingDetails;
  metadata?: Record<string, string>;
  card?: Stripe.PaymentMethodUpdateParams.Card;
}): Promise<Stripe.PaymentMethod> {
  try {
    const paymentMethod = await stripe.paymentMethods.update(
      paymentMethodId,
      {
        billing_details: billingDetails,
        metadata,
        card
      }
    );

    return paymentMethod;

    /* {
      "id": "pm_123",
      "object": "payment_method",
      "billing_details": {},
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating payment method');
  }
}

export async function listPaymentMethods({
  customer,
  type,
  limit = 10
}: {
  customer?: string;
  type?: Stripe.PaymentMethodListParams.Type;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer,
      type,
      limit
    });

    return paymentMethods;

    /* {
      "object": "list",
      "data": [
        {
          "id": "pm_123",
          "object": "payment_method",
          "type": "card"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing payment methods');
  }
}

export async function attachPaymentMethod({
  paymentMethodId,
  customer
}: {
  paymentMethodId: string;
  customer: string;
}): Promise<Stripe.PaymentMethod> {
  try {
    const paymentMethod =
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer
      });

    return paymentMethod;

    /* {
      "id": "pm_123",
      "object": "payment_method",
      "customer": "cus_123",
      "type": "card"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed attaching payment method');
  }
}

export async function detachPaymentMethod({
  paymentMethodId
}: {
  paymentMethodId: string;
}): Promise<Stripe.PaymentMethod> {
  try {
    const paymentMethod =
      await stripe.paymentMethods.detach(paymentMethodId);

    return paymentMethod;

    /* {
      "id": "pm_123",
      "object": "payment_method",
      "customer": null,
      "type": "card"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed detaching payment method');
  }
}