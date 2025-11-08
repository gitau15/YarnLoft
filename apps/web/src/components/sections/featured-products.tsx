import Link from 'next/link';
import { Button } from '@yarnloft/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@yarnloft/ui';
import { Star, ShoppingCart } from 'lucide-react';

// Mock data - this will come from the API
const featuredProducts = [
  {
    id: '1',
    name: 'Merino Worsted',
    brand: 'YarnCo',
    colorway: 'Ocean Blue',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1622445275983-93c608176d3b?w=300&h=300&fit=crop&auto=format',
    weightCategory: 'Worsted',
    fiberContent: '100% Merino Wool',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'Silk Lace',
    brand: 'Luxury Fibers',
    colorway: 'Rose Garden',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1584985052428-1a252c671e44?w=300&h=300&fit=crop&auto=format',
    weightCategory: 'Lace',
    fiberContent: '100% Silk',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Cotton DK',
    brand: 'EcoKnits',
    colorway: 'Forest Green',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1574376833295-1e0c8273a1a5?w=300&h=300&fit=crop&auto=format',
    weightCategory: 'DK',
    fiberContent: '100% Organic Cotton',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '4',
    name: 'Superwash Bulky',
    brand: 'QuickKnits',
    colorway: 'Cozy Gray',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1610035849948-68385845e729?w=300&h=300&fit=crop&auto=format',
    weightCategory: 'Bulky',
    fiberContent: '100% Superwash Wool',
    rating: 4.6,
    inStock: false,
  },
];

export function FeaturedProducts() {
  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Featured Yarns
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Handpicked premium yarns from our favorite indie dyers and brands
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {featuredProducts.map((product) => (
            <Card key={product.id} className='product-card group overflow-hidden'>
              <CardHeader className='p-0'>
                <div className='aspect-square overflow-hidden bg-gray-100'>
                  <img
                    src={product.image}
                    alt={`${product.name} in ${product.colorway}`}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium'>
                  <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  {product.rating}
                </div>
                {!product.inStock && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-900/75'>
                    <span className='rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-white'>
                      Out of Stock
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className='p-4'>
                <div className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='text-lg leading-tight'>
                        <Link href={`/products/${product.id}`} className='hover:text-yarn-600'>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className='text-sm'>
                        {product.brand} • {product.colorway}
                      </CardDescription>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-1'>
                    <span className='rounded-full bg-yarn-100 px-2 py-1 text-xs font-medium text-yarn-800'>
                      {product.weightCategory}
                    </span>
                  </div>

                  <p className='text-xs text-gray-500'>{product.fiberContent}</p>
                </div>
              </CardContent>

              <CardFooter className='flex items-center justify-between p-4 pt-0'>
                <div className='text-lg font-bold text-gray-900'>
                  ${product.price.toFixed(2)}
                </div>
                <Button
                  size='sm'
                  disabled={!product.inStock}
                  className='gap-1'
                >
                  <ShoppingCart className='h-4 w-4' />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Link href='/products'>
            <Button variant='outline' size='lg'>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}