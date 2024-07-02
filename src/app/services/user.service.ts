import { Prisma, User } from '@prisma/client'
import { hash } from 'bcrypt'

import { prisma } from '@/lib/prisma-client'

import { StoreUserRequestBody } from '../http/requests/store-user.request'

export class UserService {
  public static async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  public static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
  
    return user
  }
  
  public static async store(data: StoreUserRequestBody) {
    return await prisma.$transaction(async (prisma) => {
      const createdUser: Prisma.UserCreateInput = await prisma.user.create({
        data: {
          name: data.name,
          role: data.role,
          email: data.email,
          password: await hash(data.password, 12),
          contact: data.contact,

          address: {
            create: {
              zipCode: data.zipCode,
              street: data.street,
              number: data.number,
              neighborhood: data.neighborhood,
              state: data.state,
              city: data.city
            }
          }
        }
      })
  
      return createdUser
    })
  }
}

