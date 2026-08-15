import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CASH BALANCE TRANSACTIONS ************* */

export async function createOrRetrieveFundingInstructions({
  customerId,
  currency,
  bankTransfer
}: {
  customerId: string;
  currency: string;
  bankTransfer: Stripe.CustomerCreateFundingInstructionsParams.BankTransfer;
}): Promise<Stripe.CustomerCashBalanceFundingInstructions> {
  try {
    const fundingInstructions =
      await stripe.customers.createFundingInstructions(
        customerId,
        {
          funding_type: 'bank_transfer',
          currency,
          bank_transfer: bankTransfer
        }
      );

    return fundingInstructions;

    /* {
      "object": "funding_instructions",
      "bank_transfer": {
        "country": "DE",
        "financial_addresses": [
          {
            "iban": {
              "account_holder_name": "Merchant name",
              "bic": "SOGEDEFFXXX",
              "country": "DE",
              "iban": "DE006847740991234567890"
            },
            "supported_networks": [
              "sepa",
              "swift"
            ],
            "type": "iban"
          }
        ],
        "type": "eu_bank_transfer"
      },
      "currency": "eur",
      "funding_type": "bank_transfer",
      "livemode": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error(
      'Failed creating or retrieving funding instructions'
    );
  }
}

export async function retrieveCashBalanceTransaction({
  customerId,
  transactionId
}: {
  customerId: string;
  transactionId: string;
}): Promise<Stripe.CashBalanceTransaction> {
  try {
    const transaction =
      await stripe.customers.retrieveCashBalanceTransaction(
        customerId,
        transactionId
      );

    return transaction;

    /* {
      "id": "ccsbtxn_1Na16B2eZvKYlo2CUhyw3dsF",
      "object": "customer_cash_balance_transaction",
      "created": 1690829143,
      "currency": "eur",
      "customer": "cus_123",
      "ending_balance": 10000,
      "net_amount": 5000,
      "type": "funded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error(
      'Failed retrieving cash balance transaction'
    );
  }
}

export async function listCashBalanceTransactions({
  customerId,
  limit = 10,
  startingAfter,
  endingBefore
}: {
  customerId: string;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
}): Promise<Stripe.ApiList<Stripe.CashBalanceTransaction>> {
  try {
    const transactions =
      await stripe.customers.listCashBalanceTransactions(
        customerId,
        {
          limit,
          starting_after: startingAfter,
          ending_before: endingBefore
        }
      );

    return transactions;

    /* {
      "object": "list",
      "url": "/v1/customers/cus_123/cash_balance_transactions",
      "has_more": false,
      "data": [
        {
          "id": "ccsbtxn_123",
          "object": "customer_cash_balance_transaction",
          "created": 1690829143,
          "currency": "eur",
          "customer": "cus_123",
          "ending_balance": 10000,
          "net_amount": 5000,
          "type": "funded"
        }
      ]
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error(
      'Failed listing cash balance transactions'
    );
  }
}

export async function fundTestCashBalance({
  customerId,
  amount,
  currency,
  reference
}: {
  customerId: string;
  amount: number;
  currency: string;
  reference?: string;
}): Promise<Stripe.CashBalanceTransaction> {
  try {
    const transaction =
      await stripe.testHelpers.customers.fundCashBalance(
        customerId,
        {
          amount,
          currency,
          reference
        }
      );

    return transaction;

    /* {
      "id": "ccsbtxn_123",
      "object": "customer_cash_balance_transaction",
      "created": 1690829143,
      "currency": "usd",
      "customer": "cus_123",
      "ending_balance": 1000,
      "net_amount": 1000,
      "type": "funded"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed funding test cash balance');
  }
}