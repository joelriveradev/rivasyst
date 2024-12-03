import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function createReferenceNumber() {
  const supabase = createClient(cookies())
  const currentYear = new Date().getFullYear()

  const { data: project, error } = await supabase
    .from('projects')
    .select('reference_number')
    .ilike('reference_number', `RVST-${currentYear}-%`)
    .order('reference_number', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error('Failed to create a reference number:', error)
  }

  let nextSequence = 1

  if (project && project.reference_number) {
    const currentSequence = parseInt(project.reference_number.split('-')[2])
    nextSequence = currentSequence + 1
  }

  return `RVST-${currentYear}-${nextSequence.toString().padStart(3, '0')}`
}
