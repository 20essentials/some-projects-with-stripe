'use client';
import { SEARCH_PARAMS_KEY } from '@/lib/const';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectComponent({ success }: { success: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get(SEARCH_PARAMS_KEY.redirectTo);

  useEffect(() => {
    if (!success) return;

    const timeout = setTimeout(() => {
      if (redirectTo) {
        router.push(redirectTo);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [success, redirectTo, router]);

  if (!success || !redirectTo) return null;

  return (
    <article className='py-0.5 px-2 border-[0.1vmax] border-black border-solid'>
      <p className='success'>Redirecting...</p>
    </article>
  );
}
