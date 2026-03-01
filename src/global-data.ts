import type { Route } from 'next';

type ItemProject = {
  href: Route;
  nameProject: string;
  realHref?: string;
  srcImage: string;
};

export const arrayOfProjects: ItemProject[] = [
  {
    href: '/1',
    nameProject: 'Recurring Pricing Plans',
    srcImage: '/assets/projects/1.avif'
  },
  {
    href: '/2',
    nameProject: 'Single Payment',
    srcImage: '/assets/projects/2.avif'
  },

  {
    href: '/3',
    nameProject: 'Webhooks',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/3/api/webhook/route.ts',
    srcImage: '/assets/projects/3.avif'
  },
  {
    href: '/4',
    nameProject: 'Creating an Stripe Customer',
    srcImage: '/assets/projects/4.avif'
  }
] as const;
