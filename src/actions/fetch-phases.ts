import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchPhases(id: string) {
  const supabase = createClient(cookies())

  const { data, error } = await supabase
    .from('phases')
    .select('*, tasks(*)')
    .eq('project_id', id)

  if (error) {
    throw error
  }
  return data
}
