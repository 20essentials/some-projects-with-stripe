import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** CUSTOMER BANK ACCOUNTS ************* */

export async function createCustomerBankAccount({
  customerId,
  source
}: {
  customerId: string;
  source: string;
}): Promise<Stripe.BankAccount> {
  try {
    const bankAccount = await stripe.customers.createSource(
      customerId,
      {
        source
      }
    );

    return bankAccount as Stripe.BankAccount;

    /* {
      "id": "ba_123",
      "object": "bank_account",
      "bank_name": "STRIPE TEST BANK",
      "country": "US",
      "currency": "usd",
      "last4": "6789",
      "status": "new"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating customer bank account');
  }
}

export async function retrieveCustomerBankAccount({
  customerId,
  bankAccountId
}: {
  customerId: string;
  bankAccountId: string;
}): Promise<Stripe.BankAccount> {
  try {
    const bankAccount = await stripe.customers.retrieveSource(
      customerId,
      bankAccountId
    );

    return bankAccount as Stripe.BankAccount;

    /* {
      "id": "ba_123",
      "object": "bank_account",
      "bank_name": "STRIPE TEST BANK",
      "status": "verified"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving customer bank account');
  }
}

export async function updateCustomerBankAccount({
  customerId,
  bankAccountId,
  accountHolderName,
  accountHolderType,
  metadata
}: {
  customerId: string;
  bankAccountId: string;
  accountHolderName?: string;
  accountHolderType?: Stripe.BankAccountUpdateParams.AccountHolderType;
  metadata?: Record<string, string>;
}): Promise<Stripe.BankAccount> {
  try {
    const bankAccount = await stripe.customers.updateSource(
      customerId,
      bankAccountId,
      {
        account_holder_name: accountHolderName,
        account_holder_type: accountHolderType,
        metadata
      }
    );

    return bankAccount as Stripe.BankAccount;

    /* {
      "id": "ba_123",
      "object": "bank_account",
      "account_holder_name": "Jenny Rosen",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating customer bank account');
  }
}

export async function listCustomerBankAccounts({
  customerId,
  limit = 10
}: {
  customerId: string;
  limit?: number;
}): Promise<Stripe.ApiList<Stripe.BankAccount>> {
  try {
    const bankAccounts = await stripe.customers.listSources(
      customerId,
      {
        object: 'bank_account',
        limit
      }
    );

    return bankAccounts as Stripe.ApiList<Stripe.BankAccount>;

    /* {
      "object": "list",
      "data": [
        {
          "id": "ba_123",
          "object": "bank_account",
          "status": "verified"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing customer bank accounts');
  }
}

export async function deleteCustomerBankAccount({
  customerId,
  bankAccountId
}: {
  customerId: string;
  bankAccountId: string;
}): Promise<Stripe.DeletedBankAccount> {
  try {
    const deleted = await stripe.customers.deleteSource(
      customerId,
      bankAccountId
    );

    return deleted as Stripe.DeletedBankAccount;

    /* {
      "id": "ba_123",
      "object": "bank_account",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting customer bank account');
  }
}

export async function verifyCustomerBankAccount({
  customerId,
  bankAccountId,
  amounts
}: {
  customerId: string;
  bankAccountId: string;
  amounts: [number, number];
}): Promise<Stripe.BankAccount> {
  try {
    const bankAccount =
      await stripe.customers.verifySource(
        customerId,
        bankAccountId,
        {
          amounts
        }
      );

    return bankAccount as Stripe.BankAccount;

    /* {
      "id": "ba_123",
      "object": "bank_account",
      "status": "verified"
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed verifying customer bank account');
  }
}