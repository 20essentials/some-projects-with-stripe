import Link from 'next/link';

export default function Page() {
  return (
    <section className='w-full h-screen flex flex-wrap flex-col place-content-center gap-[1vmax]'>
      <img
        src='/assets/bg.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover'
      />
      <h2 className='text-lime-500 p-1.5 bg-[#fff2] border-[0.1vmax] border-white border-solid'>
        Success! Payment Accepted!
        <br />
        <Link href='/1' className='text-lime-500 text-center underline mx-auto'>
          Go to Pricing Plans to buy more!
        </Link>
      </h2>
    </section>
  );
}
