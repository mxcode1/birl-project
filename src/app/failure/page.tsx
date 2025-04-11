// src/app/failure/page.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition, Suspense } from 'react';
import { createCheckoutSession } from '@/app/actions/checkout';

function FailureInner() {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const idFromUrl = searchParams.get('productId');
    if (idFromUrl) {
      setProductId(idFromUrl);
      localStorage.setItem('lastProductId', idFromUrl);
    } else {
      const fallback = localStorage.getItem('lastProductId');
      if (fallback) setProductId(fallback);
    }
  }, [searchParams]);

  const handleRetry = () => {
    if (!productId) return;
    startTransition(() => {
      createCheckoutSession(productId);
    });
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Payment Canceled</h1>
        <p className="text-gray-700 text-lg mb-6">
          It looks like your transaction was canceled or didn’t complete. You can retry your purchase below.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRetry}
            disabled={isPending || !productId}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-xl transition disabled:opacity-50"
          >
            {isPending ? 'Reconnecting...' : 'Retry Purchase'}
          </button>
          <Link href="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-xl transition">
            Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<div>Loading failure screen...</div>}>
      <FailureInner />
    </Suspense>
  );
}
