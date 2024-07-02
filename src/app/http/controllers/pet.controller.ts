import { FastifyReply, FastifyRequest } from 'fastify'

import { PetService } from '@/app/services/pet.service'

import { GetPetsRequestQuery } from '../requests/get-pets.request'
import { StorePetRequestBody } from '../requests/store-pet.request'

export async function index(req: FastifyRequest, rep: FastifyReply) {
  const params = req.query as GetPetsRequestQuery

  const pets = await PetService.index(params)

  return rep.status(200).send({ pets })
}

export async function show(req: FastifyRequest, rep: FastifyReply) {
  const { id } = req.params as { id: string }

  const pet = await PetService.show(Number(id))

  if (!pet) {
    return rep.status(404).send({
      message: 'Resource not found.'
    })
  }

  return rep.status(200).send({ pet })
}

export async function store(req: FastifyRequest, rep: FastifyReply) {
  const data = req.body as StorePetRequestBody
  
  const userId = Number(req.user.sub)

  const pet = await PetService.store(userId, data)

  return rep.status(201).send({ pet })
}
