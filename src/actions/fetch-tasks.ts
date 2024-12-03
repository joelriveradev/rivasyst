import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchTasks(phaseId: string) {
  const supabase = createClient(cookies())

  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('phase_id', phaseId)

  if (error) {
    throw error
  }
  return data
}
