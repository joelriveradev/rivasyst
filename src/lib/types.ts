import { Tables, Enums } from '@/lib/supabase/database.types'

export type Project = Tables<'projects'>
export type Phase = Tables<'phases'>
export type Phases = Enums<'project_phase'>
export type Task = Tables<'tasks'>
