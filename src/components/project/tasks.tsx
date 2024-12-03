import { fetchTasks } from '@/actions/fetch-tasks'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Show } from '../show'

interface Props {
  phaseId: string
}

export async function Tasks({ phaseId }: Props) {
  const tasks = await fetchTasks(phaseId)

  const sorted = tasks.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  return (
    <div>
      <small className='ml-11 mb-2 block'>Tasks</small>

      <ol className='list-disc'>
        {sorted.map(({ id, completed, title, owner }) => {
          return (
            <li
              key={id}
              className={cn(
                'text-base list-decimal list-inside ml-11 py-4 border-t items-center justify-between',
                {
                  'line-through opacity-70': completed,
                }
              )}
            >
              {title}

              <Show when={owner === 'USER'}>
                <Badge
                  className='ml-4 capitalize bg-stone-200 rounded-full border border-stone-300 hover:bg-stone=200 text-stone-500'
                  variant='secondary'
                >
                  Action Required
                </Badge>
              </Show>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
