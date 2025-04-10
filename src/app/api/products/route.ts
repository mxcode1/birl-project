import { PRODUCTS } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(PRODUCTS);
}