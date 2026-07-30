import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PAYMENT METHOD DOMAINS ************* */

export async function createPaymentMethodDomain({
  domainName,
  enabled
}: {
  domainName: string;
  enabled?: boolean;
}): Promise<Stripe.PaymentMethodDomain> {
  try {
    const paymentMethodDomain =
      await stripe.paymentMethodDomains.create({
        domain_name: domainName,
        enabled
      });

    return paymentMethodDomain;

    /* {
      "id": "pmd_123",
      "object": "payment_method_domain",
      "domain_name": "example.com",
      "enabled": true,
      "apple_pay": {
        "status": "active"
      },
      "google_pay": {
        "status": "active"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating payment method domain');
  }
}

export async function retrievePaymentMethodDomain({
  paymentMethodDomainId
}: {
  paymentMethodDomainId: string;
}): Promise<Stripe.PaymentMethodDomain> {
  try {
    const paymentMethodDomain =
      await stripe.paymentMethodDomains.retrieve(
        paymentMethodDomainId
      );

    return paymentMethodDomain;

    /* {
      "id": "pmd_123",
      "object": "payment_method_domain",
      "domain_name": "example.com",
      "enabled": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving payment method domain');
  }
}

export async function updatePaymentMethodDomain({
  paymentMethodDomainId,
  enabled
}: {
  paymentMethodDomainId: string;
  enabled?: boolean;
}): Promise<Stripe.PaymentMethodDomain> {
  try {
    const paymentMethodDomain =
      await stripe.paymentMethodDomains.update(
        paymentMethodDomainId,
        {
          enabled
        }
      );

    return paymentMethodDomain;

    /* {
      "id": "pmd_123",
      "object": "payment_method_domain",
      "enabled": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating payment method domain');
  }
}

export async function listPaymentMethodDomains({
  domainName,
  enabled,
  limit = 10
}: {
  domainName?: string;
  enabled?: boolean;
  limit?: number;
} = {}): Promise<
  Stripe.ApiList<Stripe.PaymentMethodDomain>
> {
  try {
    const paymentMethodDomains =
      await stripe.paymentMethodDomains.list({
        domain_name: domainName,
        enabled,
        limit
      });

    return paymentMethodDomains;

    /* {
      "object": "list",
      "data": [
        {
          "id": "pmd_123",
          "domain_name": "example.com",
          "enabled": true
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing payment method domains');
  }
}

export async function validatePaymentMethodDomain({
  paymentMethodDomainId
}: {
  paymentMethodDomainId: string;
}): Promise<Stripe.PaymentMethodDomain> {
  try {
    const paymentMethodDomain =
      await stripe.paymentMethodDomains.validate(
        paymentMethodDomainId
      );

    return paymentMethodDomain;

    /* {
      "id": "pmd_123",
      "object": "payment_method_domain",
      "domain_name": "example.com",
      "enabled": true,
      "apple_pay": {
        "status": "active"
      },
      "google_pay": {
        "status": "active"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed validating payment method domain');
  }
}