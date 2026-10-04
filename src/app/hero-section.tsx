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
            <span>stripe some projects</span>
            <span className='hidden sm:inline'>stripe • projects</span>
          </div>

          <div className='max-w-xl'>
            <p className='mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--color-primary)]'>
              <Sparkles className='size-3.5' aria-hidden />
              stripe experiments
            </p>
            <h1 className='text-5xl font-semibold leading-[0.95] tracking-tight text-[#f6e2e8] sm:text-7xl'>
              {TOTAL} Projects With Stripe
            </h1>
            <p className='mt-5 max-w-sm text-sm leading-relaxed text-[#f6e2e8]/60'>
              A collection of small projects built to practice with Stripe.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Button
                asChild
                className='pointer-events-auto rounded-none border border-[var(--color-primary)] bg-[var(--color-primary)]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#f6e2e8] shadow-none hover:bg-[var(--color-primary)] hover:text-[#050309] dark:bg-[var(--color-primary)]/10 dark:hover:bg-[var(--color-primary)] dark:hover:text-[#050309]'
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