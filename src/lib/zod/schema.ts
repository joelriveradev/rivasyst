import { z } from 'zod'
import { nameValidation, emailValidation, phoneValidation } from './validations'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'This field is required')
    .refine(nameValidation, { message: 'Name cannot contain any numbers' }),

  phone: z
    .string()
    .min(10, 'Phone number must have at least 10 digits')
    .max(15, 'Phone number too long')
    .refine(phoneValidation, 'Please enter a valid phone number')
    .transform((val) => val.replace(/\D/g, '')),

  email: z
    .string()
    .min(1, 'This field is required')
    .email()
    .refine(emailValidation, { message: 'Please enter a valid email address' })
    .transform((val) => val.toLowerCase().trim()),

  company: z.string().optional(),
  context_problem: z.string().min(1, 'This field is required'),
  context_solution: z.string().min(1, 'This field is required'),
  design_branding: z.string().min(1, 'This field is required'),
  design_preferences: z.string().min(1, 'This field is required'),
  design_ux: z.string().min(1, 'This field is required'),
  timeline: z.string().min(1, 'This field is required'),
  budget: z.string().min(1, 'This field is required'),
  additional_info: z.string().optional(),
})

export const initialFormState: z.infer<typeof formSchema> = {
  name: '',
  phone: '',
  email: '',
  company: '',
  context_problem: '',
  context_solution: '',
  design_branding: '',
  design_preferences: '',
  design_ux: '',
  timeline: '',
  budget: '',
  additional_info: '',
}
