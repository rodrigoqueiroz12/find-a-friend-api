import { FastifyInstance } from 'fastify'

import { index, show, store } from '@/app/http/controllers/pet.controller'
import { admin } from '@/app/http/middlewares/admin.middleware'
import { auth } from '@/app/http/middlewares/auth.middleware'
import { getPetsRequest } from '@/app/http/requests/get-pets.request'
import { storePetRequest } from '@/app/http/requests/store-pet.request'

export async function petRoutes(app: FastifyInstance) {
  app.get('/', {
    preHandler: [getPetsRequest]
  }, index)

  app.get('/:id', show)

  app.post('/', {
    onRequest: [auth, admin],
    preHandler: [storePetRequest]
  }, store)
}
