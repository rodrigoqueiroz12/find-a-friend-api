import { FastifyInstance } from 'fastify'

import { store } from '@/app/http/controllers/user.controller'
import { storeUserRequest } from '@/app/http/requests/store-user.request'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', {
    preHandler: [storeUserRequest]    
  }, store)
}
