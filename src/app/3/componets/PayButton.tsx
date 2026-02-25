'use client';

import { BASE_URL } from '@/globalConsts';
import { useRouter } from 'next/navigation';
import { Pricing } from '../lib';

export function PayButton({ pricing }: { pricing: Pricing }) {
  const router = useRouter();

  async function openCheckoutStripe() {
    const res = await fetch(`${BASE_URL}/3/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pricing)
    });
    const data = await res.json();
    router.push(data.url);
  }

  return (
    <button
      className={`bg-blue-900 rounded-2xl px-8 py-1.5 relative z-20 active:opacity-50 transition-opacity w-fit mx-auto`}
      onClick={openCheckoutStripe}
    >
      Buy!
    </button>
  );
}
