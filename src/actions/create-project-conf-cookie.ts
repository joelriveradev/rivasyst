'use server'

import { cookies } from 'next/headers'

export async function createProjectConfCookie(projectId: string) {
  const store = await cookies()
  const name = `toast-received-${projectId}`

  store.set({
    name,
    value: 'true',
  })
}
