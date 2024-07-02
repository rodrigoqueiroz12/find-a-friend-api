import fs from 'node:fs'
import path from 'node:path'

import { Snowflake } from 'nodejs-snowflake'
import sharp from 'sharp'

import { env } from '@/utils/env'

export class StorageHelper {
  /**
   * Stores a file in a specified path.
   * 
   * @param {Buffer} file - The buffer of the file to be saved.
   * @param {string[]} pathToSave - Relative path within the 'src/storage' directory where the file will be saved.
   * @returns {Promise<string>} - Returns the relative path of the saved file.
   */
  public static async storeImage(file: Buffer, ...pathToSave: string[]): Promise<string> {
    if (env.NODE_ENV === 'test') {
      return 'path'
    }

    try {
      const baseDir = path.resolve(__dirname, '../../..')
      const savePath = path.join(baseDir, 'src', 'storage', ...pathToSave)
  
      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true })
      }
  
      const uid = new Snowflake()
      const fileName = `${uid.idFromTimestamp(Date.now())}.webp`
      const filePath = path.join(savePath, fileName)
  
      const webpBuffer = await sharp(file)
        .resize({ height: 500, width: 500 })
        .webp({ quality: 80 })
        .toBuffer()
  
      await fs.promises.writeFile(filePath, webpBuffer)
  
      return path.relative(path.join(baseDir, 'src', 'storage'), filePath)
    } catch (error) {
      console.error('Error saving file:', error)
      
      throw new Error('Failed to save file')
    }
  }
}
