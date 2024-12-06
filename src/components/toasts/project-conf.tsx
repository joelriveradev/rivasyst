'use client'

import { useEffect, useTransition } from 'react'
import { useToast } from '@/hooks/use-toast'
import { createProjectConfCookie } from '@/actions/create-project-conf-cookie'
import { Check } from 'lucide-react'

interface Props {
  projectId: string
}

export function ProjectConfirmationToast({ projectId }: Props) {
  const { toast } = useToast()
  const [_, startTransition] = useTransition()

  const DURATION = 10000

  useEffect(() => {
    startTransition(() => {
      toast({
        title: (
          <p className='flex items-center gap-x-2'>
            <Check size={16} /> Project Received!
          </p>
        ),
        description: (
          <p className='pl-6'>
            You should receive an email confirmation shortly.
          </p>
        ),
        duration: DURATION,
        variant: 'success',
      })

      setTimeout(async () => {
        // Create a cookie to prevent the toast from showing again
        await createProjectConfCookie(projectId)
      }, DURATION)
    })
  }, [])

  return null
}
