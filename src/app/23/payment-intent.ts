import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** PAYMENT INTENTS ************* */

export async function createPaymentIntent({
  amount,
  currency,
  customer,
  paymentMethod,
  automaticPaymentMethods,
  captureMethod,
  confirmationMethod,
  confirm,
  description,
  metadata,
  receiptEmail,
  returnUrl,
  setupFutureUsage,
  shipping,
  statementDescriptor,
  statementDescriptorSuffix,
  transferData,
  applicationFeeAmount
}: {
  amount: number;
  currency: string;
  customer?: string;
  paymentMethod?: string;
  automaticPaymentMethods?: Stripe.PaymentIntentCreateParams.AutomaticPaymentMethods;
  captureMethod?: Stripe.PaymentIntentCreateParams.CaptureMethod;
  confirmationMethod?: Stripe.PaymentIntentCreateParams.ConfirmationMethod;
  confirm?: boolean;
  description?: string;
  metadata?: Record<string, string>;
  receiptEmail?: string;
  returnUrl?: string;
  setupFutureUsage?: Stripe.PaymentIntentCreateParams.SetupFutureUsage;
  shipping?: Stripe.PaymentIntentCreateParams.Shipping;
  statementDescriptor?: string;
  statementDescriptorSuffix?: string;
  transferData?: Stripe.PaymentIntentCreateParams.TransferData;
  applicationFeeAmount?: number;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer,
      payment_method: paymentMethod,
      automatic_payment_methods: automaticPaymentMethods,
      capture_method: captureMethod,
      confirmation_method: confirmationMethod,
      confirm,
      description,
      metadata,
      receipt_email: receiptEmail,
      return_url: returnUrl,
      setup_future_usage: setupFutureUsage,
      shipping,
      statement_descriptor: statementDescriptor,
      statement_descriptor_suffix: statementDescriptorSuffix,
      transfer_data: transferData,
      application_fee_amount: applicationFeeAmount
    });

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "amount": 2000,
      "currency": "usd",
      "status": "requires_payment_method",
      "client_secret": "pi_123_secret_abc",
      "customer": "cus_123"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating payment intent');
  }
}

export async function retrievePaymentIntent({
  paymentIntentId
}: {
  paymentIntentId: string;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "amount": 2000,
      "status": "succeeded",
      "currency": "usd"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving payment intent');
  }
}

export async function updatePaymentIntent({
  paymentIntentId,
  amount,
  currency,
  customer,
  description,
  metadata,
  paymentMethod,
  receiptEmail,
  shipping,
  statementDescriptor,
  statementDescriptorSuffix
}: {
  paymentIntentId: string;
  amount?: number;
  currency?: string;
  customer?: string;
  description?: string;
  metadata?: Record<string, string>;
  paymentMethod?: string;
  receiptEmail?: string;
  shipping?: Stripe.PaymentIntentUpdateParams.Shipping;
  statementDescriptor?: string;
  statementDescriptorSuffix?: string;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount,
      currency,
      customer,
      description,
      metadata,
      payment_method: paymentMethod,
      receipt_email: receiptEmail,
      shipping,
      statement_descriptor: statementDescriptor,
      statement_descriptor_suffix: statementDescriptorSuffix
    });

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "amount": 2500,
      "status": "requires_confirmation",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating payment intent');
  }
}

export async function confirmPaymentIntent({
  paymentIntentId,
  paymentMethod,
  receiptEmail,
  returnUrl,
  mandateData,
  setupFutureUsage
}: {
  paymentIntentId: string;
  paymentMethod?: string;
  receiptEmail?: string;
  returnUrl?: string;
  mandateData?: Stripe.PaymentIntentConfirmParams.MandateData;
  setupFutureUsage?: Stripe.PaymentIntentConfirmParams.SetupFutureUsage;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethod,
      receipt_email: receiptEmail,
      return_url: returnUrl,
      mandate_data: mandateData,
      setup_future_usage: setupFutureUsage
    });

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "status": "succeeded",
      "amount": 2000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed confirming payment intent');
  }
}

export async function cancelPaymentIntent({
  paymentIntentId,
  cancellationReason
}: {
  paymentIntentId: string;
  cancellationReason?: Stripe.PaymentIntentCancelParams.CancellationReason;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId, {
      cancellation_reason: cancellationReason
    });

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "status": "canceled"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed canceling payment intent');
  }
}

export async function capturePaymentIntent({
  paymentIntentId,
  amountToCapture
}: {
  paymentIntentId: string;
  amountToCapture?: number;
}): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
      amount_to_capture: amountToCapture
    });

    return paymentIntent;

    /* {
      "id": "pi_123",
      "object": "payment_intent",
      "status": "succeeded",
      "amount_captured": 2000
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed capturing payment intent');
  }
}

export async function searchPaymentIntents({
  query,
  limit = 10
}: {
  query: string;
  limit?: number;
}): Promise<Stripe.ApiSearchResult<Stripe.PaymentIntent>> {
  try {
    const result = await stripe.paymentIntents.search({
      query,
      limit
    });

    return result;

    /* {
      "object": "search_result",
      "data": [
        {
          "id": "pi_123",
          "amount": 2000,
          "currency": "usd",
          "status": "succeeded"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed searching payment intents');
  }
}
