import { cookies as Cookies } from 'next/headers'
import { Slash, SquarePen } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ProjectConfirmationToast } from '@/components/toasts/project-conf'
import { Show } from '@/components/show'
import { ProjectProgress } from '@/components/project/progress'
import { ProjectPhases } from '@/components/project/phases'
import { cn, formatDateCreated } from '@/lib/utils'
import { fetchProject } from '@/actions/fetch-project'

import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}
export default async function ProjectStatusPage({ params }: Props) {
  const { id: ref } = await params
  const { id, status, reference_number, created_at } = await fetchProject(ref)

  const cookies = await Cookies()
  const projectConfirmationSeen = cookies.has(`toast-received-${id}`)

  return (
    <main className='w-full min-h-dvh'>
      <Show when={status === 'RECEIVED' && !projectConfirmationSeen}>
        <ProjectConfirmationToast projectId={id} />
      </Show>

      <Breadcrumb className='mb-7'>
        <BreadcrumbList className='text-stone-50 pl-6 lg:pl-16 xl:pl-24'>
          <BreadcrumbItem>
            <BreadcrumbLink
              className='opacity-50 hover:text-stone-200 hover:opacity-100 hover:underline hover:underline-offset-4 transition-all'
              href='/'
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className='opacity-50'>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink
              className='opacity-50 hover:text-stone-200 hover:opacity-100 hover:underline hover:underline-offset-4 transition-all'
              href='/projects'
            >
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className='opacity-50'>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${reference_number}/status`}
              className='hover:text-stone-100 cursor-default'
            >
              {reference_number}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <Card className='p-6 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] text-stone-500 bg-stone-100 shadow-lg'>
          <small className='block text-stone-500 lg:text-base'>
            Reference Number
          </small>

          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-stone-600 mt-2.5 mb-4'>
            {reference_number}
          </h1>

          <div className='flex items-center'>
            <Badge className='capitalize rounded-full bg-stone-200 text-stone-700 hover:bg-stone-200 font-normal border border-stone-300 shadow-none p-1 px-2.5'>
              {status?.toLowerCase().split('_').join(' ')}
            </Badge>
          </div>

          <div className='w-full flex items-center justify-between mt-14'>
            <span>Submitted {formatDateCreated(created_at)}</span>

            <Show when={status === 'PLANNING'}>
              <Button
                asChild
                className='text-sm rounded-full bg-stone-200 text-stone-700 font-normal border border-stone-300 shadow-none hover:bg-stone-300'
              >
                <Link href={`/project/${id}/edit`} className={cn()}>
                  Edit <SquarePen size={13} />
                </Link>
              </Button>
            </Show>
          </div>

          <Separator className='mt-5' />
          <ProjectProgress projectId={id} />
          <ProjectPhases projectId={id} />
        </Card>
      </section>
    </main>
  )
}
