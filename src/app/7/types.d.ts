export type Customer = {
  id: string;
  name: string | null;
  email: string | null;
  description: string | null;
  currency: string | null;
  balance: number;
  created: number;
};
