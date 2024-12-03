import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { fetchProgress } from './fetch-progress'

export async function fetchProjects() {
  const supabase = createClient(cookies())
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    throw error
  }

  return await Promise.all(
    data.map(async (project) => {
      const progress = await fetchProgress(project.id)
      return { ...project, progress }
    })
  )
}
