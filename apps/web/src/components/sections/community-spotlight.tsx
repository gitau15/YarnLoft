import Link from 'next/link';
import { Button } from '@yarnloft/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@yarnloft/ui';
import { Heart, MessageCircle, User } from 'lucide-react';

// Mock data - this will come from the API
const featuredProjects = [
  {
    id: '1',
    title: 'Ocean Waves Sweater',
    description: 'Used the beautiful Ocean Blue merino worsted for this top-down raglan. So soft and cozy!',
    author: {
      name: 'Sarah Knits',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
    },
    image: 'https://images.unsplash.com/photo-1584985052428-1a252c671e44?w=400&h=300&fit=crop&auto=format',
    likes: 42,
    comments: 8,
    status: 'finished',
  },
  {
    id: '2',
    title: 'Lacy Shawl Adventure',
    description: 'My first lace project! Used silk lace yarn and it was worth every penny.',
    author: {
      name: 'Emma Crochets',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c954?w=100&h=100&fit=crop&auto=format',
    },
    image: 'https://images.unsplash.com/photo-1574376833295-1e0c8273a1a5?w=400&h=300&fit=crop&auto=format',
    likes: 38,
    comments: 12,
    status: 'finished',
  },
  {
    id: '3',
    title: 'Baby Blanket Gift',
    description: 'Made for a friend\'s baby shower. The organic cotton is perfect for sensitive skin.',
    author: {
      name: 'Mike Crafts',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
    },
    image: 'https://images.unsplash.com/photo-1610035849948-68385845e729?w=400&h=300&fit=crop&auto=format',
    likes: 27,
    comments: 5,
    status: 'finished',
  },
];

export function CommunitySpotlight() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Community Spotlight
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Get inspired by amazing projects created by our community members
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredProjects.map((project) => (
            <Card key={project.id} className='group overflow-hidden hover:shadow-lg transition-shadow'>
              <CardHeader className='p-0'>
                <div className='aspect-video overflow-hidden bg-gray-100'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='absolute top-4 left-4'>
                  <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800'>
                    {project.status === 'finished' ? 'Finished' : 'In Progress'}
                  </span>
                </div>
              </CardHeader>

              <CardContent className='p-6'>
                <CardTitle className='text-lg leading-tight mb-2'>
                  <Link href={`/projects/${project.id}`} className='hover:text-yarn-600'>
                    {project.title}
                  </Link>
                </CardTitle>

                <CardDescription className='text-sm mb-4 leading-relaxed'>
                  {project.description}
                </CardDescription>

                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-gray-100'>
                    {project.author.avatar ? (
                      <img
                        src={project.author.avatar}
                        alt={project.author.name}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <User className='h-4 w-4 text-gray-500' />
                    )}
                  </div>
                  <span className='text-sm font-medium text-gray-900'>
                    {project.author.name}
                  </span>
                </div>

                <div className='flex items-center gap-4 text-sm text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <Heart className='h-4 w-4' />
                    {project.likes}
                  </div>
                  <div className='flex items-center gap-1'>
                    <MessageCircle className='h-4 w-4' />
                    {project.comments}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Link href='/gallery'>
            <Button variant='outline' size='lg'>
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}