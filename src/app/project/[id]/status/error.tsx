'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error.message)
  }, [error])

  return (
    <main className='w-full min-h-dvh'>
      <h2 className='font-bold font-serif text-2xl lg:text-3xl'>
        Something went wrong.
      </h2>

      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  )
}
