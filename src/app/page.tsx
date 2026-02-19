import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/2');
  return <></>;
}
