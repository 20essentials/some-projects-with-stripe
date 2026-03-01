export type CreateStripeCustomerState = {
  success: string | null;
  error: string | null;
  email?: string;
  username?: string;
};