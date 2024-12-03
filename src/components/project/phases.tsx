import { Loader, ArrowRight, Blocks, Zap, CheckCircle2 } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Badge } from '@/components/ui/badge'
import { Show } from '@/components/show'
import { cn } from '@/lib/utils'
import { Phases } from '@/lib/types'
import { fetchPhases } from '@/actions/fetch-phases'
import { Tasks } from './tasks'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  projectId: string
}

type PhaseMap = {
  [P in Phases]: {
    icon: typeof Loader
    description: string
  }
}

const phaseMap: PhaseMap = {
  DISCOVERY: {
    icon: Loader,
    description: 'Initial project review and planning',
  },
  PROPOSAL: {
    icon: ArrowRight,
    description: 'Scope of work, timeline, and estimated cost',
  },
  DEVELOPMENT: {
    icon: Blocks,
    description: 'UI/UX Design, technical design, Implementation and testing',
  },
  LAUNCH: {
    icon: Zap,
    description: 'Deployment, monitoring, and maintenance',
  },
}

export async function ProjectPhases({ projectId }: Props) {
  const phases = await fetchPhases(projectId)
  const sortedPhases = phases.sort((a, b) => a.sequence - b.sequence)

  const currentPhase =
    sortedPhases.find(({ status }) => status === 'IN_PROGRESS') ??
    sortedPhases[0]

  return (
    <div className='w-full'>
      <Accordion type='single' collapsible defaultValue={currentPhase.type}>
        {sortedPhases.map((phase) => {
          const { description, icon: Icon } = phaseMap[phase.type]

          const isCompleted = phase.status === 'COMPLETED'
          const isCurrent = phase.id === currentPhase.id
          const isDisabled = !isCurrent && !isCompleted

          return (
            <AccordionItem
              key={phase.id}
              value={phase.type}
              disabled={isDisabled}
              className={cn(
                'border border-stone-300 rounded-xl lg:rounded-3xl mb-3 bg-stone-50',
                {
                  'opacity-40': isDisabled,
                }
              )}
            >
              <AccordionTrigger
                className={cn('p-4 lg:p-8', {
                  'cursor-not-allowed': isDisabled,
                })}
              >
                <div>
                  <div className='flex items-center capitalize font-semibold text-xl sm:text-2xl'>
                    <Show when={isCompleted}>
                      <CheckCircle2 className='mr-5 text-green-400' size={25} />
                    </Show>

                    <Show when={!isCompleted}>
                      <Icon className='mr-5' size={25} />
                    </Show>

                    <p> {phase.type.toLowerCase()}</p>

                    <Show when={isCompleted}>
                      <Badge className='text-xs bg-green-100 text-green-600 border border-green-300 px-2 py-0.5 rounded-full ml-3 shadow-none'>
                        Completed
                      </Badge>
                    </Show>
                  </div>

                  <p className='ml-[46px] lg:text-lg'>{description}</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className='px-4 pb-2 lg:px-8 lg:pb-6'>
                <Tasks phaseId={phase.id} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
