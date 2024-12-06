import { Project } from '@/lib/types'

import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

export interface ProjectConfirmationProps {
  details: Pick<
    Project,
    'reference_number' | 'budget' | 'timeline' | 'full_name' | 'email'
  >
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export default function ProjectConfirmation({
  details,
}: ProjectConfirmationProps) {
  const { full_name, reference_number, budget, timeline } = details

  const firstName = full_name.split(' ')[0]
  const link = `${baseUrl}/project/${reference_number}/status`

  const previewText = `
    Your Rivasyst project (${reference_number}) is confirmed!
    Access your dashboard to begin our journey together.
  `

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className='bg-stone-50 my-auto mx-auto font-sans text-stone-700'>
          <Container
            className='border border-solid border-stone-200 rounded-3xl m-[40px] mx-auto max-w-[465px] py-3 px-10 '
            style={{
              backgroundImage: `url(${baseUrl}/axiom.png)`,
              backgroundSize: '50px',
            }}
          >
            <Section className='w-full'>
              <Text className='font-bold text-stone-800 text-3xl text-center'>
                rivasyst
              </Text>
            </Section>

            <Section>
              <Text className='mb-10 text-base antialiased'>
                Dear {firstName},
              </Text>

              <Text className='text-base antialiased'>
                Thank you for choosing Rivasyst for your project! I'm excited to
                begin our work together and wanted to confirm that I've received
                all your project details and requirements.
              </Text>
            </Section>

            <Section>
              <Text className='text-lg font-medium antialiased'>
                Project details:
              </Text>

              <Text className='text-base antialiased !my-0'>
                1. Reference ID:{' '}
                <span className='font-bold'>{reference_number}</span>
              </Text>

              <Text className='text-base antialiased !my-1'>
                2. Budget: {budget}
              </Text>

              <Text className='text-base antialiased !my-1'>
                3. Timeline: {timeline}
              </Text>
            </Section>

            <Section className='w-full'>
              <Text className='text-base antialiased'>
                You can track the status of your project at any time through the
                customer project portal.
              </Text>

              <Link
                href={link}
                className='bg-black text-stone-50 font-bold text-center p-4 mt-10 mb-5 block rounded-md'
                target='_blank'
              >
                View Project Status
              </Link>
            </Section>

            <Section className='m-0 mb-8'>
              <Text className='text-base antialiased'>
                You will need to create an account first before you can access
                your projects.
              </Text>

              <Text className='text-lg font-medium antialiased !mt-6'>
                Next Steps
              </Text>

              <Text className='text-base antialiased !my-0'>
                1. I'll review your project details
              </Text>

              <Text className='text-base antialiased !my-1'>
                2. Initial discovery call to confirm details
              </Text>

              <Text className='text-base antialiased !my-5'>
                For any immediate questions or concerns, you can email me
                directly at{' '}
                <Link
                  href={`mailto:joel@rivasyst.com?subject=Project inquiry - ${reference_number}`}
                  target='_blank'
                  rel='no-referrer'
                  className='underline underline-offset-4'
                >
                  joel@rivasyst.com
                </Link>{' '}
                or call me at{' '}
                <Link
                  href='tel:+14079948118'
                  className='underline underline-offset-4'
                >
                  (407) 994-8118
                </Link>{' '}
                for urgent matters.
              </Text>

              <Text className='text-base antialiased !my-1 !mb-5'>
                Include your reference ID in all communications to ensure the
                fastest possible response, thanks!
              </Text>

              <Text className='!m-0'>Joel</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ProjectConfirmation.PreviewProps = {
  details: {
    full_name: 'Jane Smith',
    email: 'jane@test.io',
    reference_number: 'RVST-2024-002',
    budget: '$3,000-$5,000',
    timeline: '3-6 Months',
  },
} as ProjectConfirmationProps
