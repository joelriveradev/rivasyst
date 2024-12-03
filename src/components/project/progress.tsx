import { fetchProgress } from '@/actions/fetch-progress'

interface Props {
  projectId: string
}

export async function ProjectProgress({ projectId }: Props) {
  const progress = await fetchProgress(projectId)

  return (
    <div className='w-full my-6 mb-8'>
      <header className='w-full flex items-center justify-between text-base lg:text-xl'>
        <p className='font-semibold'>Project Progress</p>
        <output>{progress}%</output>
      </header>

      <div className='w-full h-5 rounded-full bg-stone-200 mt-2'>
        <div
          className='h-full bg-stone-400 rounded-full'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
