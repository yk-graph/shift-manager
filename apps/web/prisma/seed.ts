// Fills the database with sample data. Run with: npx prisma db seed
// WARNING: it deletes all existing data first.
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { TIMEZONE } from '../lib/time'

// Builds a Date for "N days ago at HH:MM" in Vancouver time.
function vancouverTime(daysAgo: number, hour: number, minute = 0) {
  const day = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
  const date = day.toLocaleDateString('en-CA', { timeZone: TIMEZONE }) // "2026-10-06"
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, timeZoneName: 'longOffset' })
    .formatToParts(day)
    .find((part) => part.type === 'timeZoneName')!
    .value.replace('GMT', '') // "-07:00"
  const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  return new Date(`${date}T${time}:00${offset}`)
}

function isWeekend(daysAgo: number) {
  const weekday = vancouverTime(daysAgo, 12).toLocaleDateString('en-US', { timeZone: TIMEZONE, weekday: 'short' })
  return weekday === 'Sat' || weekday === 'Sun'
}

async function main() {
  console.log('Deleting old data...')
  await prisma.shiftChange.deleteMany()
  await prisma.shift.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.branch.deleteMany()

  console.log('Creating branches...')
  const gastown = await prisma.branch.create({ data: { name: 'Gastown', address: '123 Water St, Vancouver, BC' } })
  const richmond = await prisma.branch.create({ data: { name: 'Richmond', address: '456 No. 3 Rd, Richmond, BC' } })

  console.log('Creating users...')
  const adminPassword = await bcrypt.hash('admin123', 10)
  const employeePassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.create({
    data: { name: 'Jiaozi The Manager', email: 'admin@abcdumplings.ca', passwordHash: adminPassword, role: 'admin' },
  })

  const employees = await Promise.all(
    [
      { name: 'Ravioli Lopez', email: 'ravioli@abcdumplings.ca', phone: '604-555-0101' },
      { name: 'Gyoza Tanaka', email: 'gyoza@abcdumplings.ca', phone: '604-555-0102' },
      { name: 'Samosa Singh', email: 'samosa@abcdumplings.ca', phone: '604-555-0103' },
      { name: 'Mandu Momo', email: 'mandu@abcdumplings.ca', phone: '604-555-0104' },
      { name: 'Maria Wereniche', email: 'maria@abcdumplings.ca', phone: '604-555-0105' },
    ].map((employee) => prisma.user.create({ data: { ...employee, passwordHash: employeePassword } })),
  )

  await prisma.user.create({
    data: { name: 'John Potsticker', email: 'john@abcdumplings.ca', passwordHash: employeePassword, isActive: false },
  })

  console.log('Creating shifts for the last 2 weeks...')
  for (let daysAgo = 14; daysAgo >= 1; daysAgo--) {
    if (isWeekend(daysAgo)) continue

    for (const [index, employee] of employees.entries()) {
      const branchId = index % 2 === 0 ? gastown.id : richmond.id
      // Two shifts per day: before and after lunch.
      await prisma.shift.createMany({
        data: [
          { userId: employee.id, branchId, clockIn: vancouverTime(daysAgo, 9), clockOut: vancouverTime(daysAgo, 12) },
          { userId: employee.id, branchId, clockIn: vancouverTime(daysAgo, 13), clockOut: vancouverTime(daysAgo, 17) },
        ],
      })
    }
  }

  // Ravioli is clocked in right now (started 1 hour ago).
  await prisma.shift.create({
    data: { userId: employees[0].id, branchId: gastown.id, clockIn: new Date(Date.now() - 60 * 60 * 1000) },
  })

  // One example of an admin fixing a shift (shows up in the change log).
  const shiftToFix = await prisma.shift.findFirstOrThrow({
    where: { userId: employees[1].id, clockOut: { not: null } },
    orderBy: { clockIn: 'desc' },
  })
  await prisma.shiftChange.create({
    data: {
      shiftId: shiftToFix.id,
      changedById: admin.id,
      oldClockIn: shiftToFix.clockIn,
      newClockIn: shiftToFix.clockIn,
      oldClockOut: null,
      newClockOut: shiftToFix.clockOut,
    },
  })

  console.log('Done!')
  console.log('Admin:    admin@abcdumplings.ca / admin123')
  console.log('Employee: maria@abcdumplings.ca / password123')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
