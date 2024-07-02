import { FastifyRequest } from 'fastify'
import sharp from 'sharp'
import { z } from 'zod'

import { Age, Ambient, Energy, Independency, Size } from '@/app/enums/pet.enum'

// Assinaturas mágicas de arquivos comuns
const magicNumbers: { [key: string]: string } = {
  '89504E47': 'image/png',
  'FFD8FFDB': 'image/jpeg',
  'FFD8FFE0': 'image/jpeg',
  'FFD8FFE1': 'image/jpeg',
  '52494646': 'image/webp'
}

// Função para obter a assinatura mágica do buffer
const getMagicNumber = (buffer: Buffer): string => {
  return buffer.toString('hex', 0, 4).toUpperCase() 
}

// Função para mapear a assinatura mágica ao tipo MIME
const getMimeType = (buffer: Buffer): string | null => {
  const magicNumber = getMagicNumber(buffer)
  return magicNumbers[magicNumber] || null
}

const imageBufferValidator = z.instanceof(Buffer).refine(async (buffer) => {
  const mimeType = getMimeType(buffer)
  
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(mimeType || '')) {
    return false
  }
  
  const image = sharp(buffer)
  const metadata = await image.metadata()
  
  return metadata.width === metadata.height
}, {
  message: 'File must be a valid image format (.png, .jpg, .jpeg, .webp) and must be square'
})

const schema = z.object({
  name: z.string().min(3).max(100),
  about: z.string().max(300),
  age: z.nativeEnum(Age),
  energy: z.nativeEnum(Energy),
  ambient: z.nativeEnum(Ambient),
  size: z.nativeEnum(Size),
  independency: z.nativeEnum(Independency),
  requirements: z.array(z.string()).default([]),
  pictures: z.array(imageBufferValidator).optional().default([])
})

export type StorePetRequestBody = z.infer<typeof schema>

export async function storePetRequest(req: FastifyRequest): Promise<void> {
  req.body = await schema.parseAsync(req.body)
}
