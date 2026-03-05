import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/5');
  return <></>;
}
