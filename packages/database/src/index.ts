import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client'

export * from './generated/client'

function createPrismaClient() {
  const databaseUrl = process.env['DATABASE_URL']
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }
  return new PrismaClient({ adapter: new PrismaMariaDb(databaseUrl) })
}

// Reuse one client across hot reloads in development to avoid exhausting connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma
}
