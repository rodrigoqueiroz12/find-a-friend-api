import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { MissingEnvironmentVariablesError } from './app/errors/missing-environment-variables.error'
import { authRoutes } from './routes/auth.routes'
import { petRoutes } from './routes/pet.routes'
import { userRoutes } from './routes/user.routes'
import { env } from './utils/env'

export const app = fastify({
  logger: env.NODE_ENV === 'development'
})

app.register(fastifyJwt, {
  secret: env.FASTIFY_JWT_SECRET,
  sign: {
    expiresIn: '10m'
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  }
})

app.register(fastifyMultipart, {
  attachFieldsToBody: 'keyValues'
})

app.register(fastifyCookie)

app.setErrorHandler(async (error, req, rep) => {
  if (error instanceof MissingEnvironmentVariablesError) {
    return rep.status(503).send({
      message: error.message
    })
  }
  
  if (error instanceof ZodError) {
    if (env.NODE_ENV === 'development') {
      console.log(req.body)
      console.error(error.format())
    }

    return rep.status(400).headers({
      'Content-Type': 'application/json'
    }).send({
      message: 'Validation error',
      ...error.format()
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error({ error, message: error.message})
  }

  return rep.status(error.statusCode || 500).send({ message: error.message })
})

app.register(async (fastify) => {
  fastify.register(userRoutes, {
    prefix: 'users'
  })

  fastify.register(authRoutes, {
    prefix: 'auth'
  })

  fastify.register(petRoutes, {
    prefix: 'pets'
  })
}, {
  prefix: 'api'
})
