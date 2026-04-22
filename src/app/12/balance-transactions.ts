import 'server-only';
import Stripe from 'stripe';

export async function getBalanceTransactions({
  balanceTransactionId
}: {
  balanceTransactionId: string;
}) {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Missing Stripe secret key');
  const stripe = new Stripe(secret);
  try {
    const balanceTransaction = await stripe.balanceTransactions.retrieve(
      balanceTransactionId
    );
    return balanceTransaction;
    /* {
        "id": "txn_1MiN3gLkdIwHu7ixxapQrznl",
        "object": "balance_transaction",
        "amount": -400,
        "available_on": 1678043844,
        "created": 1678043844,
        "currency": "usd",
        "description": null,
        "exchange_rate": null,
        "fee": 0,
        "fee_details": [],
        "net": -400,
        "reporting_category": "transfer",
        "source": "tr_1MiN3gLkdIwHu7ixNCZvFdgA",
        "status": "available",
        "type": "transfer"
      } */  
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed getting balance transactions');
  }
}

