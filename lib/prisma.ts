import { Prisma, PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

const isProd = process.env.NODE_ENV === 'production'
let prisma: PrismaClient

if (isProd) {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    const optionsArg: Prisma.PrismaClientOptions = {}
    global.prisma = new PrismaClient(optionsArg)
  }

  prisma = global.prisma
}

export default prisma
