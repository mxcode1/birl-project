// src/app/components/ProductCard.tsx
import React from 'react';
import type { Product } from '@/data/products';
import Image from 'next/image'

type Props = {
  product: Product;
  loadingId: string | null;
  isPending: boolean;
  onPurchase: (productId: string) => void;
};

export default function ProductCard({ product, loadingId, isPending, onPurchase }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition p-4 flex flex-col">
      <Image
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <div className="mt-auto">
        <p className="text-sm text-gray-500">ID: {product.id}</p>
        <p className="text-md font-medium text-gray-800">
          Paid: £{product.price_paid.toFixed(2)} | Credit: £{product.max_credit.toFixed(2)}
        </p>
        <button
          onClick={() => onPurchase(product.id)}
          className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
          disabled={isPending || loadingId === product.id}
        >
          {loadingId === product.id ? 'Redirecting…' : `Purchase for £${product.max_credit.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
