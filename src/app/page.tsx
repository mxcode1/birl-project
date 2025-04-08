'use client';

import { useEffect, useState, useTransition } from 'react';
import type { Product } from '@/data/products';
import { createCheckoutSession } from '@/app/actions/checkout';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = async (productId: string) => {
    setLoadingId(productId);
    try {
      // First, attempt to use Server Action
      const url = await createCheckoutSession(productId);
      if (url) {
        window.location.href = url;
        return;
      }
    } catch (err) {
      console.warn('Server Action failed, falling back to API:', err);
    }

    try {
      // Fallback to API call if Server Action fails
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

        <input
          type="text"
          placeholder="Search by name, ID, or description..."
          className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 mb-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="mt-auto">
                <p className="text-sm text-gray-500">ID: {product.id}</p>
                <p className="text-md font-medium text-gray-800">
                  Paid: ${product.price_paid.toFixed(2)} | Credit: ${product.max_credit.toFixed(2)}
                </p>
                <button
                  onClick={() => handlePurchase(product.id)}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                  disabled={isPending || loadingId === product.id}
                >
                  {loadingId === product.id ? 'Redirecting…' : `Purchase for $${product.max_credit.toFixed(2)}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}