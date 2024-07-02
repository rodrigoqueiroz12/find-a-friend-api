import { FastifyReply, FastifyRequest } from 'fastify'

import { env } from '@/utils/env'

export async function auth(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (err) {
    if (env.NODE_ENV === 'development') {
      console.log(err)
    }

    return rep.status(401).send({ message: 'Unauthorized.' })
  }
}