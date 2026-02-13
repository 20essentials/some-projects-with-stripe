import { redirect } from 'next/navigation';

const arrayOfProjects = [{ href: '/1', nameProject: 'Recurring Pricing Plans' }];

export default function Home() {
  redirect('/1');
  return <></>;
}
