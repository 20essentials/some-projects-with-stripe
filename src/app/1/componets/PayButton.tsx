'use client';

import { BASE_URL } from '@/globalConsts';
import { useRouter } from 'next/navigation';
const colors = ['bg-blue-900', 'bg-blue-600', 'bg-blue-400'];

export function PayButton({ i, priceId }: { i: number; priceId: string }) {
  const router = useRouter();

  async function openCheckoutStripe() {
    const res = await fetch(`${BASE_URL}/1/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ productPriceId: priceId })
    });

    const data = await res.json();
    router.push(data.url);
  }

  return (
    <button
      className={`${colors[i]} rounded-2xl px-2 py-0.5 relative z-20 active:opacity-50 transition-opacity`}
      onClick={openCheckoutStripe}
    >
      Buy Now
    </button>
  );
}
