import { PayButton } from './componets/PayButton';
import { PRODUCT_MOCKUP } from './lib';

export default async function Page() {
  return (
    <section className='w-full h-screen flex flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg2.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover'
      />
      <aside className='border-[0.1vmax] border-white-200 border-solid p-[1vmax] flex flex-col gap-1 text-center relative z-10 bg-[#fff2] rounded-[0.8vmax]'>
        <h3>{PRODUCT_MOCKUP.name}</h3>
        <img
          src={PRODUCT_MOCKUP.urlImage}
          alt='fondo'
          className='pointer-events-none w-[5vmax] object-cover'
        />
        <h4>{(PRODUCT_MOCKUP.priceInCents ?? 0) / 100}$</h4>
        <PayButton />
      </aside>
    </section>
  );
}
