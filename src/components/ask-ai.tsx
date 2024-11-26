'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function AskAI() {
  return (
    <Button
      type='button'
      variant='ghost'
      className='flex items-center gap-2 text-stone-500'
    >
      <p>Ask AI</p>
      <Sparkles size={20} />
    </Button>
  )
}
