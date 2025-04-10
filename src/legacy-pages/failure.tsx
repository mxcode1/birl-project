import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function FailurePage() {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const queryId = router.query.productId;
      if (typeof queryId === 'string') {
        setProductId(queryId);
        console.log('[FailurePage] Loaded with productId:', queryId);
      } else {
        console.warn('[FailurePage] No valid productId in query');
      }
    }
  }, [router.isReady, router.query]);

  const handleRetry = async () => {
    if (!productId) {
      console.warn('[Retry] Missing productId, redirecting to catalog');
      return router.push('/');
    }

    setIsRetrying(true);
    console.log('[Retry] Attempting to re-initiate checkout for:', productId);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      console.log('[Retry] /api/checkout response status:', res.status);
      const data = await res.json();

      if (data.url) {
        console.log('[Retry] Redirecting to Stripe Checkout:', data.url);
        window.location.href = data.url;
      } else {
        console.warn('[Retry] No URL returned from Stripe session response:', data);
        alert('Could not create checkout session. Please try again later.');
        setIsRetrying(false);
      }
    } catch (err) {
      console.error('[Retry] Request to /api/checkout failed:', err);
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Payment Canceled</h1>
        <p className="text-gray-700 text-lg mb-6">
          It looks like your transaction was canceled or didn’t complete.
          You can retry your purchase below.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying || !productId}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-xl transition disabled:opacity-50"
          >
            {isRetrying ? 'Reconnecting...' : 'Retry Purchase'}
          </button>
          <Link
            href="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-xl transition"
          >
            Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}