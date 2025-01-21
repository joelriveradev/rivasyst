import type { Metadata } from 'next'
import { Inter, Annapurna_SIL } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ScrollTopButton } from '@/components/scroll-top'
import { Toaster } from '@/components/ui/toaster'

import Script from 'next/script'
import Link from 'next/link'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rivasyst.com'),
  title: 'Professional Software Engineering & Design | Rivasyst',
  description:
    "Custom software solutions crafted for your business. We bring Fortune 500 experience to create thoughtful, scalable applications at small business-friendly rates. Let's build something remarkable together.",
  openGraph: {
    title: 'Professional Software Engineering & Design | Rivasyst',
    description:
      'Custom software solutions crafted for your business. We bring Fortune 500 experience to create thoughtful, scalable applications at small business-friendly rates.',
    url: 'https://rivasyst.com',
    siteName: 'Rivasyst',
    images: [
      {
        url: 'https://rivasyst.com/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Software Engineering & Design | Rivasyst',
    description:
      'Custom software solutions crafted for your business. We bring Fortune 500 experience to create thoughtful, scalable applications at small business-friendly rates.',
    images: ['https://rivasyst.com/og.png'],
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const annapurna_sil = Annapurna_SIL({
  weight: ['400', '700'],
  subsets: ['latin', 'devanagari', 'latin-ext'],
  variable: '--font-annapurna-sil',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Rivasyst',
  description:
    'Custom software solutions crafted for your business. We bring Fortune 500 experience to create thoughtful, scalable applications at small business-friendly rates.',
  founder: {
    '@type': 'Person',
    name: 'Joel Rivera',
  },
  url: 'https://rivasyst.com',
  telephone: '(407) 994-8118',
  email: 'joel@rivasyst.com',
  serviceType: [
    'Software Engineering',
    'Application Design',
    'AI Integration',
    'Business Solutions',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'AI Integration',
    'Web Applications',
    'Accessibility',
  ],
  priceRange: '$$',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  function getYear() {
    return new Date().getFullYear()
  }

  return (
    <html lang='en'>
      <Script
        id='structured-data'
        type='application/ld+json'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <body
        className={cn(
          annapurna_sil.variable,
          inter.variable,
          'relative antialiased after:w-full after:h-full after:bg-stone-500 after:left-0 after:top-0 after:absolute after:z-[-50] after:mix-blend-multiply',
        )}
        style={{
          backgroundImage: 'url(/axiom.png)',
          backgroundSize: '50px',
        }}
      >
        <Toaster />

        <div className='w-full min-h-dvh text-stone-50'>
          <div className='w-full max-w-screen-8xl mx-auto'>
            <header className='w-full h-20 flex items-center justify-between p-6 lg:px-16 xl:px-24'>
              <Link
                href='/'
                className='font-bold text-lg xl:text-2xl tracking-tighter hover:opacity-50 transition-all'
              >
                rivasyst
              </Link>
            </header>
            {children}

            <footer className='w-full h-20 mt-96 p-6 lg:px-16 xl:px-24 flex items-center justify-between border-t border-t-stone-400 text-stone-50'>
              <p className='text-sm'>
                © {getYear()} Rivasyst. All rights reserved.
              </p>
              <ScrollTopButton />
            </footer>
          </div>
        </div>

        <script type='application/ld+json'></script>
      </body>
    </html>
  )
}
