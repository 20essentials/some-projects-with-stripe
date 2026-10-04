import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { arrayOfProjects } from '@/global-data';
import { Card, CardTitle } from '@/components/ui/card';

const CARD_LINK =
  'group/link flex min-h-24 items-center justify-between gap-4 p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)] sm:p-6';

function ProjectTitle({ nameProject }: { nameProject: string }) {
  return (
    <>
      <CardTitle className='text-pretty text-base leading-snug text-[#f6e2e8] sm:text-lg'>
        {nameProject}
      </CardTitle>
      <ArrowUpRight
        className='size-4 shrink-0 text-[#f6e2e8]/30 transition-colors duration-300 group-hover/link:text-[var(--color-primary)]'
        aria-hidden
      />
    </>
  );
}

export function ListOfProjects() {
  return (
    <section className='relative w-full'>
      <ul className='grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:p-10'>
        {arrayOfProjects.map(({ href, id, nameProject, realHref }) => (
          <li key={id}>
            <Card className='group gap-0 overflow-hidden border-white/10 bg-white/5 py-0 shadow-none backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-primary)]/50 hover:bg-white/10'>
              {realHref ? (
                <a
                  href={realHref}
                  target='_blank'
                  rel='noreferrer'
                  className={CARD_LINK}
                >
                  <ProjectTitle nameProject={nameProject} />
                </a>
              ) : (
                <Link href={href} className={CARD_LINK}>
                  <ProjectTitle nameProject={nameProject} />
                </Link>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}