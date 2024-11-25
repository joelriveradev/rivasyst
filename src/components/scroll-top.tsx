'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

export function ScrollTopButton() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button variant='ghost' size='icon' onClick={scrollToTop}>
      <ArrowUp size={30} className='shrink-0' />
    </Button>
  )
}
