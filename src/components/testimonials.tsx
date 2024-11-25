'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { StarGroup } from '@/components/stargroup'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  autoplay?: boolean
  interval?: number
}

interface Testimonial {
  id: number
  name: string
  title: string
  company: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 0,
    name: 'Rob Harrigan',
    title: 'Creative Director',
    company: 'JPMorgan Chase & Co.',
    image: 'rob.png',
    quote:
      'Joel is an amazing engineer who works effortlessly with design teams and his unique blend of front-end and back-end expertise is an amazing asset for any team. I worked with him for several years and he is a pleasure to work with and consistently delivers pixel-perfect implementations and is always willing to solve hard problems.',
  },
  {
    id: 1,
    name: 'Dirk DeRoos',
    title: 'WW Technical Sales - Big Data',
    company: 'IBM',
    image: 'dirk.png',
    quote:
      'Joel joined a new demo team that was assembled quickly in January, 2019 and assigned to me. We were fortunate to have a number of people with complementary skills, which was critical for us as we had to come up with a high quality, repeatable, and sustainable set of processes and standards for the demos we were building. Joel was huge for us as he was our most seasoned front-end developer and had the best eye for design. Joel was instrumental in coming up with a visually attractive and usable design template that we used for all our demos, and in establishing a set of design practices. It was a pleasure to work with Joel, and I strongly recommend him.',
  },
  {
    id: 2,
    name: 'Tammy Gill',
    title: 'Head of Development',
    company: 'Endava',
    image: 'tami.png',
    quote:
      "Joel is a standout talent whom I have had the pleasure of working with at Endava the last several years. He has been an integral part of our development team and his technical acumen and dedication to excellence is evident in every project he has been allocated to. Joel possesses a deep understanding of frontend technologies and frameworks which he leveraged to not only deliver high-quality code but also to elevate the performance and usability of our applications. Beyond his technical skills, Joel has been a driving force behind our team's continuous improvement. He consistently shares knowledge and mentors junior and mid-level team members, fostering a culture of learning and growth across our teams. His contributions transcend his stellar coding abilities; he has also played a crucial role in strategic planning and innovation, ensuring our projects are aligned with business objectives while setting standards for optimal user experience. Joel's impact on our team and products has been profound. He is not only an asset to any team from a technical standpoint but also brings a level of enthusiasm and innovation that elevates those around him. I have no doubt that he will continue to drive success wherever his career may lead and I wholeheartedly recommend Joel to any organization fortunate enough to have him as part of their team!",
  },
  {
    id: 3,
    name: 'Gary Storey',
    title: 'Senior Software Engineer',
    company: 'Endava',
    image: 'gary.png',
    quote:
      'I worked with Joel on multiple projects in our time together at both Levvel and Endava North America. If you are looking for a senior front-end engineer, team lead, or need someone to work with AI, he is your guy. And as good of an engineer he is, he is an even better person; Any team will be lucky to have him.',
  },
]

const avatars: Array<Pick<Testimonial, 'id' | 'image'>> = testimonials.map(
  ({ id, image }) => ({
    id,
    image,
  })
)

export function Testimonials({
  autoplay = false,
  interval = 5000,
}: Readonly<Props>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | number>(0)

  useEffect(() => {
    if (autoplay && !intervalID) {
      setIntervalID(createInterval())
      return () => clearInterval(intervalID)
    }
  }, [])

  const { name, title, company, quote } = testimonials[activeIndex]

  function handleAvatarClick(id: number) {
    setActiveIndex(id)

    if (autoplay) {
      clearInterval(intervalID)
      setIntervalID(createInterval())
    }
  }

  function createInterval() {
    return setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)
  }

  return (
    <div className='w-full my-20'>
      <StarGroup />

      <small className='block mt-3 mb-6 text-stone-300'>
        {name}—{title} @ {company}
      </small>

      <blockquote
        className={cn(
          'font-serif text-xl md:text-3xl line-clamp-3 word-spacing-tight',
          {
            'line-clamp-none': expanded,
          }
        )}
      >
        {quote}
      </blockquote>

      <Button
        className='mt-3 text-stone-300 p-0 mb-6'
        variant='link'
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>

      <div className='flex items-center'>
        {avatars.map(({ id, image }) => (
          <Avatar
            key={id}
            onClick={() => handleAvatarClick(id)}
            className={cn(
              'mr-2 hover:scale-110 transition-all hover:cursor-pointer',
              {
                'scale-110': activeIndex === id,
              }
            )}
          >
            <AvatarImage
              src={image}
              alt={name}
              className={cn('opacity-30 transition-all', {
                'opacity-100': activeIndex === id,
              })}
            />
          </Avatar>
        ))}
      </div>
    </div>
  )
}

Testimonials.displayName = 'Testimonials'
