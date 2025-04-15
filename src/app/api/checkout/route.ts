// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProduct } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-03-31.basil',
});

const extendedAuthSupported = process.env.EXTENDED_AUTH_ENABLED === 'true';

export async function POST(req: NextRequest) {
  try {
    console.log("Nonsense 1")
    const { productId } = await req.json();
    if (!productId) {
      console.warn('[API Checkout] Missing productId in request body');
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    console.log("Nonsense 1.5")
    const product = getProduct(productId);
    console.log("Nonsense 2")

    if (!product) {
      console.warn(`[API Checkout] Invalid product ID: ${productId}`);
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    console.log("Nonsense 3")
    console.log(`[API Checkout] Creating Stripe session for: ${product.title} (${product.id})`);

    const session = await stripe.checkout.sessions.create({
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
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual',
        description: `Extended hold for ${product.title} - ${product.id}`,
        metadata: {
          product_id: product.id,
          product_title: product.title,
        },
      },
      // Use extended authorization if supported (Requires Account Approval From Stripe)
      ...(extendedAuthSupported && {
        payment_method_options: {
            card:{
              request_extended_authorization: 'if_available',
            },
          },
        }),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/failure?productId=${product.id}`,
    });
    
    console.log('[API Checkout] Stripe session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API Checkout] Unexpected error:', message);
    return NextResponse.json(
      { error: 'Internal server error', detail: message },
      { status: 500 }
    );
  }
}