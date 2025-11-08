import { Hero } from '@/components/sections/hero';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CommunitySpotlight } from '@/components/sections/community-spotlight';
import { Features } from '@/components/sections/features';
import { CTA } from '@/components/sections/cta';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Features />
      <CommunitySpotlight />
      <CTA />
    </main>
  );
}