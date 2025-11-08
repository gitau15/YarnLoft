import Link from 'next/link';
import { Button } from '@yarnloft/ui';
import { ArrowRight, Mail } from 'lucide-react';

export function CTA() {
  return (
    <div className='bg-yarn-600 py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Ready to Join Our Community?
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-lg text-yarn-100'>
            Start your journey with YarnLoft today. Discover amazing yarns, connect with fellow fiber
            artists, and take your crafting to the next level.
          </p>

          <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <Link href='/register'>
              <Button size='lg' variant='secondary' className='gap-2 bg-white text-yarn-600 hover:bg-gray-100'>
                Get Started Now
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>

            <Link href='/contact'>
              <Button size='lg' variant='outline' className='border-white text-white hover:bg-white hover:text-yarn-600 gap-2'>
                <Mail className='h-4 w-4' />
                Contact Us
              </Button>
            </Link>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white'>10,000+</div>
              <div className='mt-2 text-sm text-yarn-100'>Happy Crafters</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white'>500+</div>
              <div className='mt-2 text-sm text-yarn-100'>Premium Yarns</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white'>1,000+</div>
              <div className='mt-2 text-sm text-yarn-100'>Shared Projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}