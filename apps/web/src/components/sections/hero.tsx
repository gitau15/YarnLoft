import Link from 'next/link';
import { Button } from '@yarnloft/ui';
import { ArrowRight, Package, Users, Heart } from 'lucide-react';

export function Hero() {
  return (
    <div className='relative bg-gradient-to-br from-yarn-50 to-pink-50 py-20 sm:py-32'>
      <div className='absolute inset-0 bg-[url(/hero-pattern.svg)] opacity-10' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            The Global Hub for
            <span className='block text-yarn-600'>Fiber Artists</span>
          </h1>

          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600'>
            YarnLoft combines a curated marketplace, powerful creative tools,
            and a vibrant community for knitters and crocheters worldwide.
          </p>

          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link href='/products'>
              <Button size='lg' className='text-sm'>
                Shop Yarn
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>

            <Link href='/gallery'>
              <Button variant='outline' size='lg'>
                View Gallery
              </Button>
            </Link>
          </div>
        </div>

        <div className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3'>
          <div className='text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yarn-100 text-yarn-600'>
              <Package className='h-8 w-8' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>Curated Marketplace</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Premium yarns and patterns from indie dyers and designers
            </p>
          </div>

          <div className='text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600'>
              <Users className='h-8 w-8' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>Vibrant Community</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Connect with fiber artists, share projects, get inspired
            </p>
          </div>

          <div className='text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
              <Heart className='h-8 w-8' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>Creative Tools</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Stash manager, project planner, and intelligent yarn substitution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}