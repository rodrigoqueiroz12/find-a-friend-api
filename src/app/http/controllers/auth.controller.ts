import { User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AuthService } from '@/app/services/auth.service'
import { UserService } from '@/app/services/user.service'

import { SignInRequestBody } from '../requests/sign-in.request'

export async function signIn(req: FastifyRequest, rep: FastifyReply) {
  const { email, password } = req.body as SignInRequestBody

  if (! await AuthService.attempt({ email, password })) {
    return rep.status(400).send({
      message: 'Invalid credentials.'
    })
  }

  const user = await UserService.findByEmail(email) as User

  const token = await rep.jwtSign(
    {
      role: user.role
    },
    {
      sign: {
        sub: user.id.toString()
      }
    }
  )
  
  const refreshToken = await rep.jwtSign(
    {
      role: user.role
    },
    {
      sign: {
        sub: user.id.toString(),
        expiresIn: '7d'
      }
    }
  )

  return rep
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({
      token
    })
}

export async function refreshToken(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await rep.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub
      }
    }
  )
  
  const refreshToken = await rep.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d'
      }
    }
  )

  return rep
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({
      token
    })
}

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify()

  const userId = req.user.sub

  const user = await UserService.findById(Number(userId)) as User

  return rep.status(200).send({
    user: { ...user, password: undefined }
  })
}
