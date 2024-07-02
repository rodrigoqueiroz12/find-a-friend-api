import { Pet } from '@prisma/client'
import { Snowflake } from 'nodejs-snowflake'

import { prisma } from '@/lib/prisma-client'
import { toSlug } from '@/utils/to-slug'

import { StorageHelper } from '../helpers/storage.helper'
import { GetPetsRequestQuery } from '../http/requests/get-pets.request'
import { StorePetRequestBody } from '../http/requests/store-pet.request'


export class PetService {
  public static async index(params: GetPetsRequestQuery): Promise<Pet[]> {
    const {
      state,
      city,
      age,
      energy,
      ambient,
      size,
      independency
    } = params

    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy,
        ambient,
        size,
        independency,
        
        user: {
          address: {
            state,
            city
          }
        }
      },
      include: {
        petPicture: true
      }
    })

    return pets
  }

  public static async show(id: number): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        petPicture: true
      }
    })

    return pet
  }

  public static async store(userId: number, data: StorePetRequestBody): Promise<Pet> {
    const { pictures, ...petData } = data

    const uid = new Snowflake()
    const timestamp = Date.now()
    const petSlug = toSlug(`${petData.name}-${uid.idFromTimestamp(timestamp)}`)

    const pet = await prisma.pet.create({
      data: {
        userId,
        slug: petSlug,
        ...petData
      }
    })

    const petPictures = await Promise.all(
      pictures.map(picture => {
        return StorageHelper.storeImage(picture, 'images', 'organizations', `${userId}`, 'pets', `${pet.id}`) 
      })
    )

    await prisma.petPicture.createMany({
      data: petPictures.map(picture => {
        return { petId: pet.id, picture } 
      })
    })

    return pet
  }
}
