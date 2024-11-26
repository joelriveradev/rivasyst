'use server'
import { z } from 'zod'
import { formSchema } from '@/app/project/new/page'

export async function submitProject(data: z.infer<typeof formSchema>) {
  console.log('form submitted!', { data })
}
