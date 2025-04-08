// src/pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PRODUCTS, getProductsIn } from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { ids } = req.query;

    if (ids) {
      // Accept comma-separated list of product IDs
      const idsArray = (Array.isArray(ids) ? ids[0] : ids).split(',');
      const filtered = getProductsIn(idsArray);
      return res.status(200).json(filtered);
    }

    return res.status(200).json(PRODUCTS);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
