// src/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getProduct } from '@/data/products';

export const config = {
  api: {
    bodyParser: true,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { productId } = req.body;
  const product = getProduct(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Extended hold for 10 days
      },
      payment_method_options: {
        card: {
          request_extended_authorization: 'if_available',
        },
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
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/failure?productId=${product.id}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
