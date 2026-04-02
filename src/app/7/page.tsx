import { Suspense } from 'react';
import { ListOfCustomers } from './list-of-customers';

export default async function Page() {
  return (
    <section className='w-full h-screen flex relative flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg7.jpeg'
        alt='fondo'
        className='fixed pointer-events-none w-full h-screen object-cover -z-30'
      />
      <aside className='fixed w-full h-screen -z-20 bg-[#000a]'></aside>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ListOfCustomers />
      </Suspense>
    </section>
  );
}
