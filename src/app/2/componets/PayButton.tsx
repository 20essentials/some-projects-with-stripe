'use client';

import { BASE_URL } from '@/globalConsts';
import { useRouter } from 'next/navigation';

export function PayButton() {
  const router = useRouter();

  async function openCheckoutStripe() {
    const res = await fetch(`${BASE_URL}/2/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await res.json();
    router.push(data.url);
  }

  return (
    <button
      className={`bg-blue-900 rounded-2xl px-2 py-0.5 relative z-20 active:opacity-50 transition-opacity`}
      onClick={openCheckoutStripe}
    >
      Buy!
    </button>
  );
}
