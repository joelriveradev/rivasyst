'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'

import { formSchema } from '@/lib/zod/schema'
import { createClient } from '@/lib/supabase/server'
import { createProjectPhases } from './create-phases'
import { createReferenceNumber } from './create-ref-number'
import { createInitialTasks } from './create-initial-tasks'
import { SendEmail } from './send-email'

export async function createProject(values: z.infer<typeof formSchema>) {
  const supabase = createClient(cookies())
  const reference_number = await createReferenceNumber()

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      reference_number,
      full_name: values.name,
      phone_number: values.phone,
      email: values.email,
      company: values.company,
      context_problem: values.context_problem,
      context_solution: values.context_solution,
      design_branding: values.design_branding,
      design_preferences: values.design_preferences,
      design_ux: values.design_ux,
      budget: values.budget,
      timeline: values.timeline,
      additional_info: values.additional_info,
      status: 'RECEIVED',
      complete: false,
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create project:', error)
  }

  const [{ id: discoveryPhaseID }, { id: proposalPhaseID }] =
    await createProjectPhases(project.id)

  await createInitialTasks(discoveryPhaseID, proposalPhaseID)

  await SendEmail({
    type: 'confirmation',
    details: {
      full_name: project.full_name,
      email: project.email,
      reference_number,
      budget: project.budget,
      timeline: project.timeline,
    },
  })

  return { ref: project.reference_number }
}
