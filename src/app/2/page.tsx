import { PayButton } from './componets/PayButton';
import { getPricingCards } from './lib';

export default async function Page() {
  const pricingCards = await getPricingCards();
  const orderPricingCards = pricingCards.toSorted(
    (a, b) => a.unit_amount! - b.unit_amount!
  );
  return (
    <section className='w-full h-screen flex flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg2.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover'
      />
      {orderPricingCards.map(({ nickname, unit_amount, id }, i) => (
        <aside
          key={i}
          className='border-[0.1vmax] border-white-200 border-solid p-[1vmax] flex flex-col gap-1 text-center relative z-10 bg-[#fff2]'
        >
          <h3>{nickname}</h3>
          <h4>{(unit_amount ?? 0) / 100}$</h4>
          <PayButton i={i} priceId={id} />
        </aside>
      ))}
    </section>
  );
}
