import { Suspense } from 'react';
import { Formulario } from './componets/formulario';
export default async function Page() {
  return (
    <section className='w-full h-screen flex flex-wrap place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg4.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover'
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Formulario />
      </Suspense>
    </section>
  );
}
