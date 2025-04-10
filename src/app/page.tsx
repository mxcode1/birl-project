// src/app/page.tsx
'use client';

import { useState, useTransition } from 'react';
import SearchBar from '@/app/components/SearchBar';
import ProductGrid from '@/app/components/ProductGrid';
import useProducts from '@/app/hooks/useProducts';
import { createCheckoutSession } from '@/app/actions/checkout';

export default function Home() {
  const {filteredProducts, searchTerm, setSearchTerm } = useProducts();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending] = useTransition();

  const handlePurchase = async (productId: string) => {
    setLoadingId(productId);
    try {
      const url = await createCheckoutSession(productId);
      if (url) {
        window.location.href = url;
        return;
      }
    } catch (err) {
      console.warn('Server Action failed, falling back to API:', err);
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (typeof data.url === 'string') {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session');
        setLoadingId(null);
      }
    } catch (err) {
      alert('Network error while creating checkout session');
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Catalog</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductGrid
          products={filteredProducts}
          loadingId={loadingId}
          isPending={isPending}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
}
