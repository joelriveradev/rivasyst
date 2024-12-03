import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchProject(ref: string) {
  const supabase = createClient(cookies())

  const { data, error } = await supabase
    .from('projects')
    .select()
    .eq('reference_number', ref)
    .single()

  if (error) {
    throw error
  }
  return data
}
