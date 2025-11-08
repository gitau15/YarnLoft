import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'YarnLoft - The Global Hub for the Fiber Arts Community',
    template: '%s | YarnLoft',
  },
  description: 'YarnLoft is a comprehensive digital platform for knitters and crocheters that combines a curated marketplace, powerful creative tools, and a vibrant community.',
  keywords: [
    'yarn',
    'knitting',
    'crochet',
    'fiber arts',
    'crafts',
    'ecommerce',
    'community',
    'stash manager',
    'patterns',
  ],
  authors: [{ name: 'YarnLoft Team' }],
  creator: 'YarnLoft',
  publisher: 'YarnLoft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'YarnLoft - The Global Hub for the Fiber Arts Community',
    description: 'YarnLoft is a comprehensive digital platform for knitters and crocheters that combines a curated marketplace, powerful creative tools, and a vibrant community.',
    siteName: 'YarnLoft',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YarnLoft - The Global Hub for the Fiber Arts Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YarnLoft - The Global Hub for the Fiber Arts Community',
    description: 'YarnLoft is a comprehensive digital platform for knitters and crocheters that combines a curated marketplace, powerful creative tools, and a vibrant community.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}