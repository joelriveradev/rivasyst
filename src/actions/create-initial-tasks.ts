import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function createInitialTasks(
  discoveryPhaseId: string,
  proposalPhaseId: string
) {
  const supabase = createClient(cookies())

  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title: 'Project requirements gathering',
        completed: true,
        phase_id: discoveryPhaseId,
        owner: 'ADMIN',
        complexity: 1,
      },
      {
        title: 'Initial discovery call',
        completed: false,
        phase_id: discoveryPhaseId,
        owner: 'ADMIN',
        complexity: 1,
      },
      {
        title: 'Scope of work draft',
        completed: false,
        phase_id: proposalPhaseId,
        owner: 'ADMIN',
        complexity: 1,
      },
      {
        title: 'Project cost estimation',
        completed: false,
        phase_id: proposalPhaseId,
        owner: 'ADMIN',
        complexity: 1,
      },
      {
        title: 'Timeline estimation',
        completed: false,
        phase_id: proposalPhaseId,
        owner: 'ADMIN',
        complexity: 1,
      },
      {
        title: 'Submit initial deposit',
        completed: false,
        phase_id: proposalPhaseId,
        owner: 'USER',
        complexity: 1,
      },
    ])
    .select()

  if (error) {
    console.error({ error })
    throw new Error('Failed to create initial tasks')
  }

  return data
}
