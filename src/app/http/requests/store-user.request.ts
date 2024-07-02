import { Role } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import z from 'zod'

import { validStates } from '@/utils/valid-states'

const contactRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/
const zipCodeRegex = /^\d{5}-\d{3}$/

const schema = z.object({
  name: z.string().min(3).max(100),
  role: z.nativeEnum(Role).default('user').optional(),
  email: z.string().email().max(254),
  password: z.string().min(3).max(64),
  passwordConfirmation: z.string(),

  contact: z.string().regex(contactRegex, 'Contact must be in the format (00) 0 0000-0000'),

  zipCode: z.string().regex(zipCodeRegex, 'Zip code must be in the format 00000-000'),
  street: z.string().max(100),
  number: z.string().max(25),
  neighborhood: z.string().max(50),
  city: z.string().max(50),
  state: z.enum(validStates, {
    message: 'State must be one of the valid two-letter codes'
  })
}).refine(({ password, passwordConfirmation }) => {
  return password === passwordConfirmation 
}, {
  message: "Passwords don't match",
  path: ['passwordConfirmation']
}).transform((data) => {
  // Remove special characters
  const contact = data.contact.replace(/\D/g, '')
  const zipCode = data.zipCode.replace(/\D/g, '')
  
  return {
    ...data,
    contact,
    zipCode
  }
})

export type StoreUserRequestBody = z.infer<typeof schema>

export async function storeUserRequest(req: FastifyRequest) {
  req.body = schema.parse(req.body)
}
