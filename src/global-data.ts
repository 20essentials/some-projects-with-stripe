import type { Route } from 'next';

type ItemProject = {
  href: Route;
  nameProject: string;
};

export const arrayOfProjects: ItemProject[] = [
  { href: '/1', nameProject: 'Recurring Pricing Plans' },
  { href: '/2', nameProject: 'Single Payment' }
] as const;
