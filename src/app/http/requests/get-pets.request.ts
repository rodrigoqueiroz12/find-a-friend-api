import { UF } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import z from 'zod'

import { Age, Ambient, Energy, Independency, Size } from '@/app/enums/pet.enum'

const schema = z.object({
  state: z.nativeEnum(UF),
  city: z.string(),
  age: z.nativeEnum(Age).optional(),
  energy: z.nativeEnum(Energy).optional(),
  ambient: z.nativeEnum(Ambient).optional(),
  size: z.nativeEnum(Size).optional(),
  independency: z.nativeEnum(Independency).optional()
})

export type GetPetsRequestQuery = z.infer<typeof schema>

export async function getPetsRequest(req: FastifyRequest) {
  req.query = schema.parse(req.query)
}
