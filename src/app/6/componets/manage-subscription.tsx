'use client';

import { BASE_URL } from '@/globalConsts';
import { useRouter } from 'next/navigation';
const colors = ['bg-green-900', 'bg-green-600', 'bg-green-400'];

export function ManageSubscription({
  i,
  customerId
}: {
  i: number;
  customerId: string;
}) {
  const router = useRouter();

  async function openCustomerPortal() {
    const res = await fetch(`${BASE_URL}/6/api/subscription`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ customerId })
    });

    const { sessionURL } = await res.json();
    router.push(sessionURL);
  }

  return (
    <button
      className={`${colors[i]} rounded-2xl px-2 py-0.5 relative z-20 active:opacity-50 transition-opacity hover:opacity-75`}
      onClick={openCustomerPortal}
    >
      Manage Subscription
    </button>
  );
}
