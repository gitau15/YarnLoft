import {
  Search,
  ShoppingCart,
  Users,
  Heart,
  Package,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yarnloft/ui';

const features = [
  {
    icon: ShoppingCart,
    title: 'Curated Marketplace',
    description: 'Premium yarns, patterns, and tools from indie creators and established brands.',
  },
  {
    icon: Package,
    title: 'Stash Manager',
    description: 'Organize your yarn collection with photos, tags, and detailed inventory tracking.',
  },
  {
    icon: Heart,
    title: 'Project Gallery',
    description: 'Share your creations, get feedback, and inspire the fiber arts community.',
  },
  {
    icon: Search,
    title: 'Intelligent Search',
    description: 'Find the perfect yarn substitute using our advanced matching algorithm.',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Connect with knitters and crocheters worldwide, share patterns and tips.',
  },
  {
    icon: Sparkles,
    title: 'Creative Tools',
    description: 'Project planning, progress tracking, and custom pattern generation.',
  },
];

export function Features() {
  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Everything You Need for Your Craft
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            YarnLoft provides all the tools and community support you need to take your knitting
            and crochet projects to the next level.
          </p>
        </div>

        <div className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <Card key={index} className='border-0 bg-white shadow-sm hover:shadow-md transition-shadow'>
              <CardHeader>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-yarn-100 text-yarn-600'>
                  <feature.icon className='h-6 w-6' />
                </div>
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base leading-relaxed'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}