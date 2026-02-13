import { getPricingCards } from './lib';

const colors = ['bg-blue-900', 'bg-blue-600', 'bg-blue-400'];

export default async function Page() {
  const pricingCards = await getPricingCards();
  const orderPricingCards = pricingCards.toSorted(
    (a, b) => a.unit_amount! - b.unit_amount!
  );
  return (
    <section className='w-full h-screen flex flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg.svg'
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
          <button
            className={`${colors[i]} rounded-2xl px-2 py-0.5 relative z-20 active:opacity-50 transition-opacity`}
          >
            Buy Now
          </button>
        </aside>
      ))}
    </section>
  );
}
