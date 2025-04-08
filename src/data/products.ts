export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price_paid: number;
  max_credit: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'NH8710',
    title: 'Honey-Balsamic Vinaigrette',
    description: 'A sweet and tangy vinaigrette dressing for salads.',
    image: 'http://dummyimage.com/256x256.png/5fa2dd/ffffff',
    price_paid: 13.39,
    max_credit: 2.99,
  },
  {
    id: 'ET8283',
    title: 'Greek Feta Cheese',
    description: 'Creamy and crumbly cheese for salads and dishes.',
    image: 'http://dummyimage.com/256x256.png/ff4444/ffffff',
    price_paid: 14.99,
    max_credit: 5.99,
  },
  {
    id: 'QR5179',
    title: 'Mini Air Hockey Table',
    description: 'Fun tabletop air hockey for home or office.',
    image: 'http://dummyimage.com/256x256.png/ff4444/ffffff',
    price_paid: 39.99,
    max_credit: 12.99,
  },
  {
    id: 'SQ9316',
    title: 'Herb Seasoned Couscous',
    description: 'Fluffy couscous seasoned with a blend of herbs, perfect as a side dish.',
    image: 'http://dummyimage.com/256x256.png/cc0000/ffffff',
    price_paid: 12.49,
    max_credit: 3.99,
  },
  {
    id: 'CX2556',
    title: 'Fitness Resistance Bands Set',
    description: 'Variety of bands suitable for all fitness levels.',
    image: 'http://dummyimage.com/256x256.png/5fa2dd/ffffff',
    price_paid: 34.99,
    max_credit: 9.99,
  },
  {
    id: 'UA3397',
    title: 'Stylish Wireless Earbuds',
    description: 'True wireless earbuds with excellent sound quality.',
    image: 'http://dummyimage.com/256x256.png/cc0000/ffffff',
    price_paid: 59.99,
    max_credit: 14.49,
  },
  {
    id: 'AC5689',
    title: 'Casual Sneakers',
    description: 'Versatile canvas sneakers suitable for everyday wear with a comfortable fit.',
    image: 'http://dummyimage.com/256x256.png/cc0000/ffffff',
    price_paid: 39.99,
    max_credit: 9.99,
  },
  {
    id: 'WN6319',
    title: 'Classic Beef Chili',
    description: 'Hearty chili made with premium ground beef and kidney beans.',
    image: 'http://dummyimage.com/256x256.png/dddddd/000000',
    price_paid: 17.99,
    max_credit: 6.99,
  },
  {
    id: 'UA4868',
    title: 'Yoga Wheel',
    description: 'Supportive yoga wheel for deep stretching and balance.',
    image: 'http://dummyimage.com/256x256.png/dddddd/000000',
    price_paid: 134.99,
    max_credit: 39.99,
  },
  {
    id: 'LA2012',
    title: 'Italian Sausage and Peppers',
    description: 'A flavorful blend of Italian sausage with sautéed peppers and onions.',
    image: 'http://dummyimage.com/256x256.png/dddddd/000000',
    price_paid: 88.99,
    max_credit: 29.99,
  },
];

function getProduct(productId: string): Product | undefined {
  return PRODUCTS.find((tradeIn) => tradeIn.id === productId);
}

function getProductsIn(productIds: string[]): Product[] {
  const ids = new Set(productIds);
  return PRODUCTS.filter((product) => ids.has(product.id));
}

export { getProduct, getProductsIn, PRODUCTS };
