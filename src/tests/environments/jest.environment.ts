import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { TestEnvironment } from 'jest-environment-node'

import { prisma } from '@/lib/prisma-client'
import { generateDatabaseURL } from '@/utils/generate-database-url'

class JestEnvironment extends TestEnvironment {
  private schema: string

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)

    this.schema = randomUUID()
  }

  async setup() {
    await super.setup()

    const databaseUrl = generateDatabaseURL(this.schema)

    process.env.DATABASE_URL = databaseUrl
    this.global.process.env.DATABASE_URL = databaseUrl

    execSync('pnpm prisma migrate deploy')
  }

  async teardown() {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`
    )

    await prisma.$disconnect()

    await super.teardown()
  }

  getVmContext() {
    return super.getVmContext()
  }
}

module.exports = JestEnvironment
