'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  FormProvider,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MoveRight, Slash, Loader } from 'lucide-react'
import { AskAI } from '@/components/ask-ai'
import { createProject } from '@/actions/create-project'
import { formSchema, initialFormState } from '@/lib/zod/schema'

export default function NewProjectPage() {
  const [projectRef, setProjectRef] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormState,
  })

  const { isSubmitting, isSubmitted } = form.formState

  useEffect(() => {
    if (isSubmitted && projectRef) {
      router.push(`/project/${projectRef}/status`)
    }
  }, [isSubmitted])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const project = await createProject(values)

      if ('ref' in project) {
        setProjectRef(project.ref)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='w-full min-h-dvh'>
      <section className='w-full h-96 lg:h-[450px] xl:h-[502px] flex flex-col items-start justify-center p-6 lg:p-16 xl:p-24'>
        <h1 className='font-bold font-serif mb-4 text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:tracking-tight word-spacing-tight'>
          Let's Begin your Project
        </h1>

        <p className='text-stone-300 text-lg lg:text-2xl lg:max-w-3xl leading-snug word-spacing-tight antialiased'>
          Let's map out your project together, step by step. Share your ideas
          and don't worry about the technical details, my AI assistant is here
          to help you articulate your vision.
        </p>
      </section>

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
              href='/project/new'
              className='hover:text-stone-100 cursor-default'
            >
              New Project
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <Card className='p-6 lg:p-16 xl:p-24 rounded-2xl xl:rounded-[58px] text-stone-500 bg-stone-100 shadow-lg'>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <section>
                <h1 className='font-serif font-bold text-2xl lg:text-3xl text-stone-500'>
                  1. Contact Information
                </h1>

                <div className='grid md:grid-cols-2 gap-10 mt-10'>
                  <FormField
                    name='name'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Enter your full name'
                              className='border-stone-400 h-16 shadow-sm rounded-xl pl-5 !text-lg'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    name='phone'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder='555-555-5555'
                              className='border-stone-400 h-16 shadow-sm rounded-xl pl-5 !text-lg'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    name='email'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='john@gmail.com'
                              className='border-stone-400 h-16 shadow-sm rounded-xl pl-5 !text-lg'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    name='company'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Company (if applicable)</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              {...field}
                              className='border-stone-400 h-16 shadow-sm rounded-xl pl-5 !text-lg'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </section>

              <Separator className='mt-10 mb-7' />

              <section>
                <h1 className='font-serif font-bold text-2xl lg:text-3xl text-stone-500 mb-10'>
                  2. Project Context
                </h1>

                <FormField
                  name='context_problem'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className='mb-10'>
                        <FormLabel className='flex items-center justify-between'>
                          What problem are you solving? *
                          <AskAI />
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            rows={7}
                            className='border-stone-400 bg-stone-200/50 shadow-sm rounded-xl pl-5 !text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name='context_solution'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='flex items-center justify-between'>
                          What would you like to build? *
                          <AskAI />
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            rows={7}
                            className='border-stone-400 bg-stone-200/50 shadow-sm rounded-xl pl-5 !text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </section>

              <Separator className='mt-10 mb-7' />

              <section>
                <h1 className='font-serif font-bold text-2xl lg:text-3xl text-stone-500 mb-10'>
                  3. Design and Branding
                </h1>

                <FormField
                  name='design_branding'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className='mb-10'>
                        <FormLabel className='flex items-center justify-between'>
                          Do you have an existing branding? *
                          <AskAI />
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            rows={7}
                            className='border-stone-400 bg-stone-200/50 shadow-sm rounded-xl pl-5 !text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name='design_preferences'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className='mb-10'>
                        <FormLabel className='flex items-center justify-between'>
                          Any design preferences? *
                          <AskAI />
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            rows={7}
                            className='border-stone-400 bg-stone-200/50 shadow-sm rounded-xl pl-5 !text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name='design_ux'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='flex items-center justify-between'>
                          Do you have the UI/UX design? *
                          <AskAI />
                        </FormLabel>

                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            {...field}
                          >
                            <div className='w-full flex flex-col md:flex-row md:items-center gap-10'>
                              <FormItem className='flex-1'>
                                <Card className='flex items-center p-4 space-x-5 space-y-0 border-stone-400 bg-transparent'>
                                  <FormControl>
                                    <RadioGroupItem value='yes' />
                                  </FormControl>

                                  <FormLabel className='text-stone-500 text-lg'>
                                    Yes
                                  </FormLabel>
                                </Card>
                                <FormMessage />
                              </FormItem>

                              <FormItem className='flex-1'>
                                <Card className='flex items-center p-4 space-x-5 space-y-0 border-stone-400 bg-transparent'>
                                  <FormControl>
                                    <RadioGroupItem value='no' className='' />
                                  </FormControl>

                                  <FormLabel className='text-stone-500 text-lg'>
                                    No
                                  </FormLabel>
                                </Card>
                                <FormMessage />
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              </section>

              <Separator className='mt-10 mb-7' />

              <section>
                <h1 className='font-serif font-bold text-2xl lg:text-3xl text-stone-500 mb-10'>
                  4. Timeline and Budget
                </h1>

                <div className='w-full flex flex-col md:flex-row md:items-center mb-10 gap-10'>
                  <FormField
                    name='timeline'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem className='flex-1'>
                          <FormLabel className='flex items-center justify-between'>
                            Do you have a timeline in mind? *
                            <div className='p-[18px]' />
                          </FormLabel>

                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className='w-full border-stone-400 h-16 px-6 text-lg rounded-xl'>
                                <SelectValue placeholder='Select an option' />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='1-3 months'>
                                    1-3 months
                                  </SelectItem>
                                  <SelectItem value='3-6 months'>
                                    3-6 months
                                  </SelectItem>
                                  <SelectItem value='6-12 months'>
                                    6-12 months
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    name='budget'
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem className='flex-1'>
                          <FormLabel className='flex items-center justify-between'>
                            What's your budget range? *
                            <AskAI />
                          </FormLabel>

                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className='w-full border-stone-400 h-16 px-6 text-lg rounded-xl'>
                                <SelectValue placeholder='Select an option' />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='$1,500-$3,000'>
                                    $1,500-$3,000
                                  </SelectItem>

                                  <SelectItem value='$3,000-$5,000'>
                                    $3,000-$5,000
                                  </SelectItem>

                                  <SelectItem value='$5,000-$10,000'>
                                    $5,000-$10,000
                                  </SelectItem>

                                  <SelectItem value='$10,000-$20,000+'>
                                    $10,000-$20,000+
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>

                <FormField
                  name='additional_info'
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          Anything else you'd like to share?
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            rows={7}
                            className='border-stone-400 bg-stone-200/50 shadow-sm rounded-xl pl-5 !text-lg'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              </section>

              <div className='w-full flex justify-end'>
                <Button
                  className='mt-16 font-bold hover:scale-110 text-lg rounded-lg transition-all bg-stone-600'
                  size='lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting' : 'Submit'}

                  {isSubmitting ? (
                    <Loader size={20} className='ml-1 animate-spin' />
                  ) : (
                    <MoveRight size={20} className='ml-1' />
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </section>
    </main>
  )
}
