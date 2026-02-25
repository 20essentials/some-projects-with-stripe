export const dollarsToCents = (num: number) => num * 100;

export type Pricing = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export const plans: Pricing[] = [
  {
    id: 'plus',
    title: 'Plus',
    description: 'For individuals and small teams.',
    price: 19
  },
  {
    id: 'pro',
    title: 'Pro',
    description: 'For growing businesses.',
    price: 49
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'For large teams and enterprises.',
    price: 99
  }
];
