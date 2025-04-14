// src/actions/checkout.ts
'use server';

import Stripe from 'stripe';
import { getProduct } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-03-31.basil',
});

export async function createCheckoutSession(productId: string): Promise<string | null> {
  const product = getProduct(productId);
  if (!product) return null;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_intent_data: {
      capture_method: 'manual',
    },
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: Math.round(product.max_credit * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/failure?productId=${product.id}`,
  });

  return session.url ?? null; // ✅ Return session URL instead of redirect()
}
