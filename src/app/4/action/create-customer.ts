'use server';

import Stripe from 'stripe';
import { CreateStripeCustomerState } from '../types/types';

export const createStripeCustomer = async (
  prevState: CreateStripeCustomerState,
  formData: FormData
): Promise<CreateStripeCustomerState> => {
  const secret = process.env.STRIPE_API_SECRET;

  if (!secret) {
    return {
      ...prevState,
      error: 'Stripe Api Key not defined',
      success: null
    };
  }

  const username = formData.get('username');
  const email = formData.get('email');

  if (typeof username !== 'string' || typeof email !== 'string') {
    return {
      ...prevState,
      error: 'Invalid form data',
      success: null
    };
  }

  try {
    const stripe = new Stripe(secret);

    const customerCreated = await stripe.customers.create({
      email,
      description: `Customer created for ${username}`
    });

    return {
      username,
      email,
      success: `Customer created successfully with the ID: ${customerCreated.id}`,
      error: null
    };
  } catch {
    return {
      username,
      email,
      success: null,
      error: 'Failed to create customer'
    };
  }
};
