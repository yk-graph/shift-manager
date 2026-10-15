import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../src/generated/client'

if (process.env['NODE_ENV'] === 'production') {
  throw new Error('Refusing to seed in production')
}

const databaseUrl = process.env['DATABASE_URL']
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(databaseUrl) })

const PASSWORD = 'password123'
const HOUR = 60 * 60 * 1000

function at(daysFromToday: number, hour: number, minute = 0): Date {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  date.setDate(date.getDate() + daysFromToday)
  return date
}

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10)

  await prisma.platformAdmin.upsert({
    where: { email: 'platform-admin@example.com' },
    update: { passwordHash },
    create: {
      id: 'seed-platform-admin',
      name: 'Platform Admin',
      email: 'platform-admin@example.com',
      passwordHash,
    },
  })

  const company = await prisma.company.upsert({
    where: { id: 'seed-company' },
    update: { name: 'ABC Company' },
    create: { id: 'seed-company', name: 'ABC Company' },
  })

  const stores = await Promise.all(
    [
      { id: 'seed-store-downtown', name: 'Downtown Branch', address: '800 W Georgia St, Vancouver, BC' },
      { id: 'seed-store-richmond', name: 'Richmond Branch', address: '8000 Westminster Hwy, Richmond, BC' },
    ].map((store) =>
      prisma.store.upsert({
        where: { id: store.id },
        update: { name: store.name, address: store.address },
        create: { ...store, companyId: company.id },
      }),
    ),
  )
  const [downtown, richmond] = stores as [(typeof stores)[number], (typeof stores)[number]]

  const userSeeds = [
    {
      id: 'seed-user-admin',
      name: 'Hanako Admin',
      email: 'admin@abc-company.test',
      role: 'admin',
      storeIds: [downtown.id, richmond.id],
    },
    {
      id: 'seed-user-taro',
      name: 'Taro Yamada',
      email: 'taro@abc-company.test',
      role: 'employee',
      storeIds: [downtown.id],
    },
    {
      id: 'seed-user-jiro',
      name: 'Jiro Suzuki',
      email: 'jiro@abc-company.test',
      role: 'employee',
      storeIds: [downtown.id, richmond.id],
    },
    {
      id: 'seed-user-saki',
      name: 'Saki Tanaka',
      email: 'saki@abc-company.test',
      role: 'employee',
      storeIds: [richmond.id],
    },
  ] as const

  for (const { storeIds, ...user } of userSeeds) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { ...user, passwordHash },
      create: { ...user, companyId: company.id, passwordHash, emailVerifiedAt: new Date() },
    })
    for (const storeId of storeIds) {
      await prisma.userStore.upsert({
        where: { userId_storeId: { userId: user.id, storeId } },
        update: {},
        create: { userId: user.id, storeId },
      })
    }
  }

  const shiftSeeds = [
    { userId: 'seed-user-taro', storeId: downtown.id, days: [-3, -2, -1, 0, 1, 2], from: 9, to: 17 },
    { userId: 'seed-user-jiro', storeId: downtown.id, days: [-2, 0, 1, 3], from: 13, to: 21 },
    { userId: 'seed-user-saki', storeId: richmond.id, days: [-3, -1, 0, 2, 3], from: 10, to: 18 },
  ]

  for (const seed of shiftSeeds) {
    for (const day of seed.days) {
      const shiftId = `seed-shift-${seed.userId}-${day}`
      const startsAt = at(day, seed.from)
      const endsAt = at(day, seed.to)
      const data = {
        companyId: company.id,
        storeId: seed.storeId,
        userId: seed.userId,
        startsAt,
        endsAt,
        status: day >= 0 ? ('draft' as const) : ('published' as const),
        createdById: 'seed-user-admin',
      }
      await prisma.shift.upsert({ where: { id: shiftId }, update: data, create: { id: shiftId, ...data } })

      if (day >= 0) continue

      const entryId = `seed-entry-${seed.userId}-${day}`
      const clockInAt = new Date(startsAt.getTime() + 5 * 60 * 1000)
      const clockOutAt = new Date(endsAt.getTime() + 10 * 60 * 1000)
      const entry = {
        companyId: company.id,
        storeId: seed.storeId,
        userId: seed.userId,
        shiftId,
        clockInAt,
        clockOutAt,
      }
      await prisma.timeEntry.upsert({ where: { id: entryId }, update: entry, create: { id: entryId, ...entry } })

      const breakStart = new Date(startsAt.getTime() + 4 * HOUR)
      const breakData = { timeEntryId: entryId, startedAt: breakStart, endedAt: new Date(breakStart.getTime() + HOUR) }
      await prisma.timeBreak.upsert({
        where: { id: `${entryId}-break` },
        update: breakData,
        create: { id: `${entryId}-break`, ...breakData },
      })
    }
  }

  const correctedEntryId = 'seed-entry-seed-user-taro--1'
  const corrected = await prisma.timeEntry.findUnique({ where: { id: correctedEntryId } })
  if (corrected?.clockOutAt) {
    const newClockOutAt = new Date(corrected.clockOutAt.getTime() - 10 * 60 * 1000)
    await prisma.timeEntryChange.upsert({
      where: { id: 'seed-change-1' },
      update: {},
      create: {
        id: 'seed-change-1',
        timeEntryId: correctedEntryId,
        changedById: 'seed-user-admin',
        oldClockInAt: corrected.clockInAt,
        oldClockOutAt: corrected.clockOutAt,
        newClockInAt: corrected.clockInAt,
        newClockOutAt,
        reason: 'Forgot to clock out on time',
      },
    })
  }

  console.log('Seed completed')
  console.log(`  platform admin: platform-admin@example.com / ${PASSWORD}`)
  console.log(`  company admin:  admin@abc-company.test / ${PASSWORD}`)
  console.log(`  employee:       taro@abc-company.test / ${PASSWORD}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
