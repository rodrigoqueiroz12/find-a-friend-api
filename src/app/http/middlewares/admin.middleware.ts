import { FastifyReply, FastifyRequest } from 'fastify'

export async function admin(req: FastifyRequest, rep: FastifyReply) {
  const { role } = req.user
  
  if (role !== 'admin') {
    return rep
      .status(401)
      .send({ message: 'Unauthorized.' })
  }
}
