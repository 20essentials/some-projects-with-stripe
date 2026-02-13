import { getPricingCards } from './lib';

export default async function Page() {
  const pricingCards = await getPricingCards();
  console.log({pricingCards});
  return <div></div>;
}
