import Link from 'next/link';
import { ArrowRight, MousePointerClick, Sparkles } from 'lucide-react';
import { arrayOfProjects } from '@/global-data';
import { Button } from '@/components/ui/button';
import HalftoneNebula from '@/components/ui/halftone-nebula';

// The planet moves right, out from under the headline.
const SKY = { planetX: 0.74, planetY: 0.2 };

const TOTAL = arrayOfProjects.length;

export function HeroSection() {
  return (
    <div className='relative w-full'>
      <HalftoneNebula params={SKY} className='font-sans'>
        <div className='flex h-full flex-col justify-between p-6 sm:p-10'>
          <div className='flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-[#f6e2e8]/60'>
            <span>sector 07 / crimson drift</span>
            <span className='hidden sm:inline'>ra 04h 22m · dec −12°</span>
          </div>

          <div className='max-w-xl'>
            <p className='mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.34em] text-[#ff1f5a]'>
              <Sparkles className='size-3.5' aria-hidden />
              transmission received
            </p>
            <h1 className='text-5xl font-semibold leading-[0.95] tracking-tight text-[#f6e2e8] sm:text-7xl'>
              {TOTAL} Projects With Stripe
            </h1>
            <p className='mt-5 max-w-sm text-sm leading-relaxed text-[#f6e2e8]/60'>
              A nebula printed one dot at a time. Move to light the gas — click anywhere to
              hang a star of your own.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Button
                asChild
                className='pointer-events-auto rounded-none border border-[#ff1f5a] bg-[#ff1f5a]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#f6e2e8] shadow-none hover:bg-[#ff1f5a] hover:text-[#050309] dark:bg-[#ff1f5a]/10 dark:hover:bg-[#ff1f5a] dark:hover:text-[#050309]'
              >
                <Link href={arrayOfProjects[0].href}>
                  Begin descent
                  <ArrowRight className='size-3.5' aria-hidden />
                </Link>
              </Button>
              <p className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f6e2e8]/45'>
                <MousePointerClick className='size-3.5' aria-hidden />
                interactive
              </p>
            </div>
          </div>
        </div>
      </HalftoneNebula>
    </div>
  );
}