import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CASH BALANCE ************* */

export async function retrieveCashBalance({
  customerId
}: {
  customerId: string;
}): Promise<Stripe.CashBalance> {
  try {
    const cashBalance =
      await stripe.customers.retrieveCashBalance(customerId);

    return cashBalance;

    /* {
      "id": "cash_balance_123",
      "object": "cash_balance",
      "available": {},
      "customer": "cus_123",
      "livemode": false,
      "settings": {
        "reconciliation_mode": "automatic"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving cash balance');
  }
}

export async function updateCashBalance({
  customerId,
  reconciliationMode
}: {
  customerId: string;
  reconciliationMode?: Stripe.CashBalanceUpdateParams.Settings.ReconciliationMode;
}): Promise<Stripe.CashBalance> {
  try {
    const cashBalance =
      await stripe.customers.updateCashBalance(
        customerId,
        {
          settings: reconciliationMode
            ? {
                reconciliation_mode: reconciliationMode
              }
            : undefined
        }
      );

    return cashBalance;

    /* {
      "id": "cash_balance_123",
      "object": "cash_balance",
      "customer": "cus_123",
      "settings": {
        "reconciliation_mode": "manual"
      }
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating cash balance');
  }
}