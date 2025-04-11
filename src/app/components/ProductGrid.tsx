// src/app/components/ProductGrid.tsx
import React from 'react';
import type { Product } from '@/data/products';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  loadingId: string | null;
  isPending: boolean;
  onPurchase: (productId: string) => void;
};

export default function ProductGrid({ products, loadingId, isPending, onPurchase }: Props) {
  if (products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No products found matching your search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          loadingId={loadingId}
          isPending={isPending}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
}
