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
    nameProject: 'Creating a Stripe Customer',
    srcImage: '/assets/projects/4.avif'
  },
  {
    href: '/5',
    nameProject: 'Charge Customer for Stripe Subscription in Next.js',
    srcImage: '/assets/projects/5.avif'
  },
  {
    href: '/6',
    nameProject: 'Allow Customer to Manage Their Subscription with Stripe Customer Portal',
    srcImage: '/assets/projects/6.avif'
  },
] as const;
