import { FastifyInstance } from 'fastify'

import { profile, refreshToken, signIn } from '@/app/http/controllers/auth.controller'
import { auth } from '@/app/http/middlewares/auth.middleware'
import { signInRequest } from '@/app/http/requests/sign-in.request'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', {
    preHandler: [signInRequest]
  }, signIn)

  app.patch('/token/refresh', refreshToken)

  /* Authenticated */
  
  app.get('/me', { onRequest: [auth] }, profile)
}
