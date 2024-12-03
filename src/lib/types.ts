import { Tables, Enums } from '@/lib/supabase/database.types'

export type Projects = Tables<'projects'>
export type Phase = Tables<'phases'>
export type Phases = Enums<'project_phase'>
export type Task = Tables<'tasks'>
