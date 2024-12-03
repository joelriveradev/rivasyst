import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchProgress(projectId: string) {
  const supabase = createClient(cookies())

  const { data: project, error } = await supabase
    .from('projects')
    .select(
      `phases (
        tasks (
          complexity,
          completed
        )
      )
    `
    )
    .eq('id', projectId)
    .single()

  if (error) {
    throw error
  }

  // Flatten all tasks from all phases
  const tasks = project.phases.flatMap(({ tasks }) => tasks)

  // Calculate total and completed complexity
  const totalComplexity = tasks.reduce(
    (sum, { complexity }) => sum + complexity,
    0
  )

  const completedComplexity = tasks
    .filter((task) => task.completed)
    .reduce((sum, { complexity }) => sum + complexity, 0)

  // Return the percentage, or 0 if no tasks
  return totalComplexity > 0
    ? Math.round((completedComplexity / totalComplexity) * 100)
    : 0
}
