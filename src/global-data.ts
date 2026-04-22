import type { Route } from 'next';

type ItemProject = {
  href: Route;
  nameProject: string;
  realHref?: string;
  srcImage: string;
  id: string;
};

export const arrayOfProjects: ItemProject[] = [
  {
    href: '/1',
    nameProject: 'Recurring Pricing Plans',
    srcImage: '/assets/projects/1.avif',
    id: '01'
  },
  {
    href: '/2',
    nameProject: 'Single Payment',
    srcImage: '/assets/projects/2.avif',
    id: '02'
  },
  {
    href: '/3',
    nameProject: 'Webhooks',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/3/api/webhook/route.ts',
    srcImage: '/assets/projects/3.avif',
    id: '03'
  },
  {
    href: '/4',
    nameProject: 'Creating a Stripe Customer',
    srcImage: '/assets/projects/4.avif',
    id: '04'
  },
  {
    href: '/5',
    nameProject: 'Charge Customer for Stripe Subscription in Next.js',
    srcImage: '/assets/projects/5.avif',
    id: '05'
  },
  {
    href: '/6',
    nameProject:
      'Allow Customer to Manage Their Subscription with Stripe Customer Portal',
    srcImage: '/assets/projects/6.avif',
    id: '06'
  },
  {
    href: '/7',
    nameProject: 'Auto-Pagination and List Customers',
    srcImage: '/assets/projects/7.avif',
    id: '07'
  },
  {
    href: '/7',
    nameProject: 'Search Query Language',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/7/list-of-customers.tsx',
    srcImage: '/assets/projects/8.avif',
    id: '08'
  },
  {
    href: '/8',
    nameProject: 'Accounts V2',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/8/index-accounts-v2.ts',
    srcImage: '/assets/projects/9.avif',
    id: '09'
  },
  {
    href: '/9',
    nameProject: 'Accounts Links V2',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/9/index-account-link-v2.ts',
    srcImage: '/assets/projects/10.avif',
    id: '10'
  },
  {
    href: '/10',
    nameProject: 'Account Tokens V2',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/10/index-account-tokens-v2.ts',
    srcImage: '/assets/projects/11.avif',
    id: '11'
  },
  {
    href: '/11',
    nameProject: 'Balance',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/11/balance.ts',
    srcImage: '/assets/projects/12.avif',
    id: '12'
  },
  {
    href: '/12',
    nameProject: 'Balance Transactions',
    realHref:
      'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/12/balance-transactions.ts',
    srcImage: '/assets/projects/13.avif',
    id: '13'
  },
] as const;
