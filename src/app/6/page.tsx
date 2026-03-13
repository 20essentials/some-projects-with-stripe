import { cookies } from 'next/headers';
import { PayButton } from './componets/PayButton';
import { getPricingCards, PATH_TO_CREATE_CUSTOMER } from './lib';
import { COOKIE_KEY } from '@/lib/const';
import Link from 'next/link';

export default async function Page() {
  const pricingCards = await getPricingCards();
  const orderPricingCards = pricingCards.toSorted(
    (a, b) => a.unit_amount! - b.unit_amount!
  );
  const cookieStore = await cookies();
  const customer = cookieStore.get(COOKIE_KEY.CUSTOMER_KEY)?.value;
  const customerNotExists = !customer;
  let customerId: string;
  if (customer) {
    const customerData = JSON.parse(customer);
    customerId = customerData.id;
  }


  //Todo verificar si el usuario existe
  //Verificar si tiene suscripcion de lo contrario redirigirlo.

  return (
    <section className='w-full h-screen flex flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg6.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover'
      />

      {customerNotExists ? (
        <h1 className='p-[1.4vmax] bg-[#000b] backdrop-blur-sm border border-white/10 rounded-[0.9vmax] relative z-50 text-white text-[1.25vmax] leading-relaxed shadow-lg'>
          <span className='opacity-80'>To prove this project, first</span>{' '}
          <Link
            href={PATH_TO_CREATE_CUSTOMER}
            className='underline underline-offset-4 decoration-white/60 font-semibold hover:decoration-white transition'
          >
            create a customer
          </Link>
        </h1>
      ) : (
        <aside className='p-[1.2vmax] bg-[#000b] rounded-[0.8vmax] flex flex-col gap-[1.2vmax] relative z-50'>
          {orderPricingCards.map(({ productName, unit_amount, id }, i) => (
            <aside
              key={i}
              className='border-[0.1vmax] border-white-200 border-solid p-[1vmax] flex flex-col gap-1 text-center relative z-10 bg-[#fff2] rounded-[1vmax] '
            >
              <h3>{productName}</h3>
              <h4>{(unit_amount ?? 0) / 100}$</h4>
              <PayButton i={i} priceId={id} customerId={customerId} />
            </aside>
          ))}
        </aside>
      )}
    </section>
  );
}
