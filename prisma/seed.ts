import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

import { uniqueNamesGenerator, Config, names, colors } from 'unique-names-generator'

const config: Config = {
  dictionaries: [names, colors],
  style: 'capital',
  separator: ' '
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

async function insertLoans() {
  await prisma.loan.deleteMany()
  const data: Prisma.LoanCreateInput[] = []
  for (let i = 0; i < 20; i++) {
    data.push({
      name: uniqueNamesGenerator(config),
      status: 'open',
      amount: getRandomInt(100, 500),
    })
  }

  await prisma.loan.createMany({
    data: data,
  })
}

// To seed the db:  npm run seed
async function main() {
  await insertLoans()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
