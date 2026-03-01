import type { Route } from 'next';

type ItemProject = {
  href: Route;
  nameProject: string;
  realHref?: string;
};

export const arrayOfProjects: ItemProject[] = [
  { href: '/1', nameProject: 'Recurring Pricing Plans' },
  { href: '/2', nameProject: 'Single Payment' },
  {
    href: '/3',
    nameProject: 'Webhooks',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/3/api/webhook/route.ts'
  },
  { href: '/4', nameProject: 'Creating an Stripe Customer' },
] as const;
