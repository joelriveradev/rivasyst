'use server'

import { Resend } from 'resend'
import type { ProjectConfirmationProps } from '@/lib/emails/project-confirmation'

import ProjectConfirmation from '@/lib/emails/project-confirmation'

interface SendEmailProps extends ProjectConfirmationProps {
  type: 'confirmation' | 'notification' | 'milestone'
}

export async function SendEmail({ type, details }: SendEmailProps) {
  const { email, full_name, reference_number, timeline, budget } = details
  const resend = new Resend(process.env.RESEND_API_KEY)

  if (type === 'confirmation') {
    const { error: ResendError } = await resend.emails.send({
      from: 'no-reply@rivasyst.com',
      to: email,
      subject: `Welcome to Rivasyst - Your Project Dashboard is Ready`,
      react: ProjectConfirmation({
        details: {
          full_name,
          email,
          budget,
          reference_number,
          timeline,
        },
      }),
      scheduledAt: 'In 3 minutes',
    })

    if (ResendError) {
      console.error({ ResendError })
      throw new Error('Failed to send confirmation email')
    }
  }
}
