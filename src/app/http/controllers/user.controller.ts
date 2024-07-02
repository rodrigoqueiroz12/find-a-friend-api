import { FastifyReply, FastifyRequest } from 'fastify'

import { UserService } from '@/app/services/user.service'

import { StoreUserRequestBody } from '../requests/store-user.request'

export async function store(req: FastifyRequest, rep: FastifyReply) {
  const data = req.body as StoreUserRequestBody

  if (await UserService.findByEmail(data.email)) {
    return rep.status(400).headers({
      'Content-Type': 'application/json'
    }).send({
      message: 'E-mail already exists'
    })
  }

  await UserService.store(data)

  return rep.status(204).headers({
    'Content-Type': 'application/json'
  }).send()
}
