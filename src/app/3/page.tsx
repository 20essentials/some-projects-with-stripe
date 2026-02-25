import { RadioGroupChoiceCard } from './componets/ChoiceCards';
import { PayButton } from './componets/PayButton';

export default async function Page() {
  return (
    <section className='w-full h-screen flex flex-wrap place-content-center flex-col gap-[1vmax]'>
      <img
        src='/assets/bg3.svg'
        alt='fondo'
        className='absolute pointer-events-none w-full h-screen object-cover -z-1 bg-black'
      />

      <RadioGroupChoiceCard />
      <PayButton />
    </section>
  );
}
