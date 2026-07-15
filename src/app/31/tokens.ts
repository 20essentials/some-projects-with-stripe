import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

export async function createCardToken(
  card: Stripe.TokenCreateParams.Card
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({ card });

    return token;

    /* {
      "id": "tok_123",
      "object": "token",
      "type": "card",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating card token');
  }
}

export async function createBankAccountToken(
  bankAccount: Stripe.TokenCreateParams.BankAccount
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({
      bank_account: bankAccount
    });

    return token;

    /* {
      "id": "btok_123",
      "object": "token",
      "type": "bank_account",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating bank account token');
  }
}

export async function createAccountToken(
  account: Stripe.TokenCreateParams.Account
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({ account });

    return token;

    /* {
      "id": "ct_123",
      "object": "token",
      "type": "account",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating account token');
  }
}

export async function createPersonToken(
  person: Stripe.TokenCreateParams.Person
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({ person });

    return token;

    /* {
      "id": "cpt_123",
      "object": "token",
      "type": "person",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating person token');
  }
}

export async function createPiiToken(
  pii: Stripe.TokenCreateParams.Pii
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({ pii });

    return token;

    /* {
      "id": "pii_123",
      "object": "token",
      "type": "pii",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating PII token');
  }
}

export async function createCvcUpdateToken(
  cvcUpdate: Stripe.TokenCreateParams.CvcUpdate
): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.create({
      cvc_update: cvcUpdate
    });

    return token;

    /* {
      "id": "cvctok_123",
      "object": "token",
      "type": "cvc_update",
      "used": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating CVC update token');
  }
}

export async function retrieveToken({
  tokenId
}: {
  tokenId: string;
}): Promise<Stripe.Token> {
  try {
    const token = await stripe.tokens.retrieve(tokenId);

    return token;

    /* {
      "id": "tok_123",
      "object": "token",
      "type": "card",
      "used": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving token');
  }
}