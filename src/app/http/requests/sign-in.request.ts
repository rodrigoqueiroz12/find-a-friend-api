import { FastifyRequest } from 'fastify'
import z from 'zod'

const schema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(3).max(64)
}, {
  message: 'Invalid credentials.'
})

export type SignInRequestBody = z.infer<typeof schema>

export async function signInRequest(req: FastifyRequest) {
  req.body = schema.parse(req.body)
}
