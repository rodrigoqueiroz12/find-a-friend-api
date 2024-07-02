import { config } from 'dotenv'
import z from 'zod'

config()

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_PORT: z.coerce.number(),
  FASTIFY_JWT_SECRET: z.string()
})

const _env = schema.safeParse(process.env)

if (!_env.success) {
  throw new Error('Missing environment variables')
}

export const env = _env.data
