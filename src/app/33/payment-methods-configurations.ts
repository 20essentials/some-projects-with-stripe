import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PAYMENT METHOD CONFIGURATIONS ************* */

export async function createPaymentMethodConfiguration(
  params: Stripe.PaymentMethodConfigurationCreateParams
): Promise<Stripe.PaymentMethodConfiguration> {
  try {
    const configuration =
      await stripe.paymentMethodConfigurations.create(params);

    return configuration;

    /* {
      "id": "pmc_123",
      "object": "payment_method_configuration",
      "active": true,
      "name": "Default configuration"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating payment method configuration');
  }
}

export async function retrievePaymentMethodConfiguration({
  configurationId
}: {
  configurationId: string;
}): Promise<Stripe.PaymentMethodConfiguration> {
  try {
    const configuration =
      await stripe.paymentMethodConfigurations.retrieve(
        configurationId
      );

    return configuration;

    /* {
      "id": "pmc_123",
      "object": "payment_method_configuration",
      "active": true,
      "name": "Default configuration"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving payment method configuration');
  }
}

export async function updatePaymentMethodConfiguration({
  configurationId,
  params
}: {
  configurationId: string;
  params: Stripe.PaymentMethodConfigurationUpdateParams;
}): Promise<Stripe.PaymentMethodConfiguration> {
  try {
    const configuration =
      await stripe.paymentMethodConfigurations.update(
        configurationId,
        params
      );

    return configuration;

    /* {
      "id": "pmc_123",
      "object": "payment_method_configuration",
      "active": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating payment method configuration');
  }
}

export async function listPaymentMethodConfigurations({
  active,
  application,
  limit = 10
}: {
  active?: boolean;
  application?: string;
  limit?: number;
} = {}): Promise<
  Stripe.ApiList<Stripe.PaymentMethodConfiguration>
> {
  try {
    const configurations =
      await stripe.paymentMethodConfigurations.list({
        active,
        application,
        limit
      });

    return configurations;

    /* {
      "object": "list",
      "data": [
        {
          "id": "pmc_123",
          "object": "payment_method_configuration",
          "active": true
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing payment method configurations');
  }
}