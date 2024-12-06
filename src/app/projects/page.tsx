import { Slash, Plus, ArrowRight } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { fetchProjects } from '@/actions/fetch-projects'
import { formatDateCreated } from '@/lib/utils'

import Link from 'next/link'

export default async function ProjectsPage() {
  const projects = await fetchProjects()

  return (
    <main className='w-full min-h-dvh'>
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
              className='hover:text-stone-100 transition-all'
              href=''
            >
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <Card className='p-6 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] text-stone-500 bg-stone-100 shadow-lg'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-600 mt-2.5 mb-4'>
            Hello, Maria!
          </h1>

          <section className='mt-10'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-semibold min-w-[200px]'>
                    Submitted
                  </TableHead>

                  <TableHead className='font-semibold min-w-[200px]'>
                    ID
                  </TableHead>
                  <TableHead className='font-semibold'>Status</TableHead>
                  <TableHead className='font-semibold'>Progress</TableHead>
                  <TableHead className='font-semibold'>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects.map(
                  ({ id, created_at, status, reference_number, progress }) => {
                    const href = `/project/${reference_number}/status`
                    return (
                      <TableRow key={id} className='hover:bg-stone-200'>
                        <TableCell className='px-3'>
                          {formatDateCreated(created_at)}
                        </TableCell>

                        <TableCell>{reference_number}</TableCell>

                        <TableCell className='capitalize'>
                          {status?.toLowerCase().split('_').join(' ')}
                        </TableCell>

                        <TableCell>{progress}%</TableCell>
                        <TableCell>
                          <Link
                            href={href}
                            prefetch
                            className='flex items-center gap-2'
                          >
                            View <ArrowRight size={14} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  },
                )}
              </TableBody>
            </Table>

            <Button
              className='mt-20 bg-stone-700 font-semibold border border-stone-500 px-4 pl-3'
              asChild
            >
              <Link className='flex items-center' href='/project/new' prefetch>
                <Plus size={18} /> Create Project
              </Link>
            </Button>
          </section>
        </Card>
      </section>
    </main>
  )
}
