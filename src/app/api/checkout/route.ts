// API is available for integration / development however Server Actions is preferred by system
// System uses /app/actions/checkout.ts but can also request to API checkout endpoint as needed
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProduct } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const product = getProduct(productId);

  if (!product) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_intent_data: {
      capture_method: 'manual',
      setup_future_usage: 'off_session',
      description: `Extended hold for ${product.title} - ${product.id}`,
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: Math.round(product.max_credit * 100),
        },
        
        quantity: 1,
      },
    ],
    payment_method_options: {
          card:{
            request_extended_authorization: 'if_available',
          },
        },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/failure?productId=${product.id}`,
  });

  return NextResponse.json({ url: session.url });
}