import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Testimonials } from '@/components/testimonials'
import { LogoCloud } from '@/components/logo-cloud'

import Image from 'next/image'
import Link from 'next/link'

import {
  Star,
  PersonStanding,
  ShieldCheck,
  GitCompareArrows,
  Layers2,
  CircleDashed,
  Loader,
  ArrowLeftRight,
  SquareChevronRight,
  Zap,
  MoveRight,
} from 'lucide-react'

interface SectionData {
  title: string
  description: string
  features: Array<{
    icon: typeof Star
    title: string
    description: string
  }>
}

const aboutData: SectionData = {
  title: 'About',
  description: `
      I'm a senior software engineer with deep expertise in web
      development and AI integration, now focused on making
      enterprise-grade technology accessible to people and organizations
      that matter.
    `,
  features: [
    {
      icon: Star,
      title: 'Technical Excellence',
      description:
        'A decade of experience building applications and AI solutions at Fortune 500 companies.',
    },

    {
      icon: PersonStanding,
      title: 'People-First Approach',
      description:
        'Translating technical complexity into human-focused solutions that actually work for you.',
    },

    {
      icon: ShieldCheck,
      title: 'Proven Experience',
      description:
        'Led development teams and delivered high-impact solutions for organizations of all sizes.',
    },
  ],
}

const servicesData: SectionData = {
  title: 'Services',
  description: `
      I'm your complete technology partner, handling everything 
      from design to code to deployment to maintenance. Get the benefit of professional 
      expertise in a way that's accessible, maintainable, and that actually 
      works for your needs and budget.
    `,
  features: [
    {
      icon: GitCompareArrows,
      title: 'Applications',
      description:
        'Custom software solutions to meet your unique business needs.',
    },

    {
      icon: Layers2,
      title: 'Creative Design',
      description:
        'Tailor-made software solutions to meet your unique business needs.',
    },

    {
      icon: CircleDashed,
      title: 'Infrastructure Management',
      description:
        'Led development teams and delivered high-impact solutions for organizations of all sizes.',
    },
  ],
}

const process = [
  {
    icon: Loader,
    title: 'Discovery',
    description: `You'll chat with my AI assistant about your project. We'll then have a follow up call to confirm details.`,
  },
  {
    icon: ArrowLeftRight,
    title: 'Proposal',
    description: `Once I have requirements, I'll send you a proposal with an estimated cost and timeline.`,
  },
  {
    icon: SquareChevronRight,
    title: 'Development',
    description: `Once I receive your deposit, I'll get to work on your project and keep you updated along the way.`,
  },
  {
    icon: Zap,
    title: 'Launch!',
    description: `Once development is done and you approve, I'll deploy and manage your project in production.`,
  },
]

interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  featureClassName?: string
  data: SectionData
}

function Section({ data, className, featureClassName }: SectionProps) {
  const { title, description, features } = data,
    id = title.toLowerCase()

  return (
    <section id={id} key={id} className='mb-1.5'>
      <Card
        className={cn(
          'p-6 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] text-stone-500 bg-stone-100',
          className,
        )}
      >
        <h1 className='mb-5 font-medium text-lg'>{title}</h1>

        <p className='text-lg lg:text-2xl md:max-w-3xl lg:max-w-4xl xl:tracking-tight font-serif leading-tight word-spacing-tight mb-24'>
          {description}
        </p>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-8'>
          {features.map(({ title, description, icon: Icon }, i) => {
            return (
              <div
                key={`${id}-feature-${i}`}
                className={cn(
                  'border-t border-t-stone-400 text-stone-400 mb-14 xl:mb-0',
                  featureClassName,
                )}
              >
                <Icon size={24} className='my-8' />
                <p className='mb-3 font-medium text-base lg:text-lg'>{title}</p>
                <p>{description}</p>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}

Section.displayName = 'Section'

export default function Home() {
  return (
    <main className='w-full min-h-dvh'>
      <div className='w-full h-96 lg:h-[450px] xl:h-[550px] flex items-center p-6 lg:p-16 xl:p-24'>
        <div className='w-full flex items-center justify-between xl:mr-10'>
          <div>
            <h1 className='font-bold font-serif mb-4 text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:tracking-tight word-spacing-tight'>
              I'm here to help.
            </h1>

            <p className='text-lg lg:text-2xl md:max-w-md lg:max-w-3xl mb-6 xl:mb-12 leading-snug tracking-tight word-spacing-tight antialiased'>
              Professional solutions that respect your mission, timeline, and
              budget. Technology shouldn't be complicated. Let's make it work
              for you.
            </p>

            <Link
              href='/project/new'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className:
                    'bg-transparent font-semibold hover:text-stone-600 hover:scale-110 text-lg rounded-lg transition-all',
                }),
              )}
              prefetch
            >
              Get Started <MoveRight size={20} />
            </Link>
          </div>

          <Image
            priority
            src='/headshot.png'
            width={375}
            height={375}
            alt='A headshot portrait of a man smiling on a white background in a royal blue suit and a pinstriped dress shirt.'
            className='hidden md:block md:scale-90 xl:scale-100 transition-all'
          />
        </div>
      </div>

      <Section data={aboutData} />

      <section className='p-6 lg:p-16 xl:p-24'>
        <LogoCloud />
      </section>

      <Section
        data={servicesData}
        className='bg-stone-50/10 text-stone-100'
        featureClassName='text-stone-100/80'
      />

      <section className='p-6 lg:p-16 xl:p-24'>
        <Testimonials />
      </section>

      <section id='process' className='mb-1.5'>
        <Card className='p-6 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] text-stone-500 bg-stone-200'>
          <h1 className='mb-5 font-medium text-lg'>Process</h1>

          <p className='md:max-w-md lg:max-w-2xl text-xl lg:text-2xl lg:tracking-tighter lg:leading-tight word-spacing-tight font-serif mb-24'>
            I follow a simple and straight-forward approach with every project
            in order to ensure a successful outcome.
          </p>

          <div className='grid md:grid-cols-2 md:gap-x-12 text-stone-500'>
            {process.map(({ title, description, icon: Icon }, i) => {
              return (
                <div
                  key={i}
                  className={cn(
                    'py-10 lg:py-0 border-t border-t-stone-400/60 md:border-t-0',
                    {
                      'md:border-b md:border-b-stone-400/60 lg:pb-12':
                        i + 1 < 3,
                      'lg:pt-12': i + 1 > 2,
                    },
                  )}
                >
                  <span className='opacity-50 ml-1.5'>{i + 1}.</span>

                  <div className='flex items-center gap-x-4 my-4'>
                    <Icon size={24} />

                    <p className='lg:text-3xl'>{title}</p>
                  </div>

                  <p className=' lg:text-xl lg:pl-10'>{description}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      <section>
        <Card className='bg-stone-700 p-7 pb-10 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] border-none flex items-center justify-between text-stone-100'>
          <div>
            <h1 className='font-bold xl:tracking-tighter text-2xl md:text-4xl xl:text-6xl max-w-2xl font-serif word-spacing-tight'>
              Ready to transform your vision into a reality?
            </h1>

            <p className='my-6 xl:my-10 xl:tracking-tight lg:max-w-2xl word-spacing-tight font-serif md:text-2xl max-w-2xl text-stone-300'>
              Let's start with a brief conversation about your goals and how we
              can achieve them together.
            </p>

            <Link
              href='/project/new'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className:
                    'bg-transparent font-semibold hover:text-stone-600 hover:scale-110 text-lg rounded-lg transition-all',
                }),
              )}
              prefetch
            >
              Let's Chat <MoveRight size={20} />
            </Link>
          </div>

          <Image
            src='/forest.png'
            width={400}
            height={400}
            alt='A picture of a forest with a dense fog above it.'
            className='hidden md:block md:scale-75 lg:scale-90 xl:scale-100 transition-all'
            placeholder='blur'
            blurDataURL='/forest.png'
          />
        </Card>
      </section>
    </main>
  )
}
