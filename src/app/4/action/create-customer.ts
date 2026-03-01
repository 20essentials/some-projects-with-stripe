'use server';
import Stripe from 'stripe';

export const createStripeCustomer = async (formData: FormData) => {
  const secret = process.env.STRIPE_API_SECRET;
  if (!secret) throw new Error('Stripe Api Key not defined!');
  const stripe = new Stripe(secret);
};
