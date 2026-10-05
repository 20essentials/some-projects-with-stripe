import { HeroSection } from './hero-section';
import { ListOfProjects } from './list-of-projects';
import HalftoneNebula from '@/components/ui/halftone-nebula';

// The planet moves right, out from under the headline.
const SKY = {
  planetX: 0.74,
  planetY: 0.2
};

export default function Home() {
  return (
    <div className='relative isolate'>
      <HalftoneNebula
        params={SKY}
        className='fixed inset-0 -z-10 h-screen w-screen font-sans'
      ></HalftoneNebula>
      <HeroSection />
      <ListOfProjects />
    </div>
  );
}
