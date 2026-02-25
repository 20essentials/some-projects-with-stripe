import { BASE_URL } from '@/globalConsts';

export const PRODUCT_MOCKUP = {
  name: 'Phone',
  priceInCents: 20000,
  urlImage: `${BASE_URL}/assets/phone.png`
};

export const dollarsToCents = (num: number) => num * 100;

export type Pricing = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export const plans = [
  {
    id: "plus",
    title: "Plus",
    description: "For individuals and small teams.",
    price: 19,
  },
  {
    id: "pro",
    title: "Pro",
    description: "For growing businesses.",
    price: 49,
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large teams and enterprises.",
    price: 99,
  },
];