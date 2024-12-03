import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function createProjectPhases(projectId: string) {
  const supabase = createClient(cookies())

  const { data, error } = await supabase
    .from('phases')
    .insert([
      {
        type: 'DISCOVERY',
        project_id: projectId,
        status: 'NOT_STARTED',
        sequence: 1,
      },
      {
        type: 'PROPOSAL',
        project_id: projectId,
        status: 'NOT_STARTED',
        sequence: 2,
      },
      {
        type: 'DEVELOPMENT',
        project_id: projectId,
        status: 'NOT_STARTED',
        sequence: 3,
      },
      {
        type: 'LAUNCH',
        project_id: projectId,
        status: 'NOT_STARTED',
        sequence: 4,
      },
    ])
    .eq('type', ['DISCOVERY', 'PROPOSAL'])
    .select('id, sequence')

  if (error) {
    throw new Error('Failed to create project phases:', error)
  }

  return data.sort((a, b) => a.sequence - b.sequence)
}
