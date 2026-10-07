import { prisma } from '@/lib/prisma'
import { TIMEZONE } from '@/lib/time'

// Read-only queries used by the pages.
// Call `requireRole(...)` in the page first, then call these.
// Weekly totals are calculated by Postgres (SUM + date_trunc), as the requirements ask.
// Postgres weeks start on Monday.

// ---------- Shared ----------

export async function getBranches() {
  return prisma.branch.findMany({ orderBy: { name: 'asc' } })
}

// Start and end of a week in Vancouver time. 0 = this week, 1 = last week, ...
export async function getWeekRange(weeksAgo = 0) {
  const rows = await prisma.$queryRaw<{ start: Date; end: Date }[]>`
    SELECT
      (date_trunc('week', now() AT TIME ZONE ${TIMEZONE}) - ${weeksAgo}::int * interval '7 days') AT TIME ZONE ${TIMEZONE} AS "start",
      (date_trunc('week', now() AT TIME ZONE ${TIMEZONE}) - ${weeksAgo - 1}::int * interval '7 days') AT TIME ZONE ${TIMEZONE} AS "end"
  `
  return rows[0]
}

// ---------- Employee ----------

// The shift the user is currently clocked in to, or null if clocked out.
export async function getOpenShift(userId: string) {
  return prisma.shift.findFirst({
    where: { userId, clockOut: null },
    include: { branch: true },
  })
}

// Every shift of one user, grouped by week, with a total per week.
// Returns: [{ weekStart, weekEnd, totalHours, shifts: [...] }, ...] (newest week first)
export async function getTimesheet(userId: string) {
  const weeks = await prisma.$queryRaw<{ weekStart: Date; weekEnd: Date; totalHours: number }[]>`
    SELECT
      date_trunc('week', clock_in AT TIME ZONE ${TIMEZONE}) AT TIME ZONE ${TIMEZONE} AS "weekStart",
      (date_trunc('week', clock_in AT TIME ZONE ${TIMEZONE}) + interval '7 days') AT TIME ZONE ${TIMEZONE} AS "weekEnd",
      COALESCE(SUM(EXTRACT(EPOCH FROM clock_out - clock_in)) / 3600, 0)::float AS "totalHours"
    FROM shifts
    WHERE user_id = ${userId}::uuid
    GROUP BY 1, 2
    ORDER BY 1 DESC
  `

  const shifts = await getShiftsForEmployee(userId)

  return weeks.map((week) => ({
    ...week,
    shifts: shifts.filter((shift) => shift.clockIn >= week.weekStart && shift.clockIn < week.weekEnd),
  }))
}

// ---------- Admin ----------

// Who is clocked in right now, and since when.
export async function getClockedInNow() {
  return prisma.shift.findMany({
    where: { clockOut: null },
    include: {
      user: { select: { id: true, name: true } },
      branch: true,
    },
    orderBy: { clockIn: 'asc' },
  })
}

// All employees (active and deactivated). Never selects the password hash.
export async function getEmployees() {
  return prisma.user.findMany({
    where: { role: 'employee' },
    select: { id: true, name: true, email: true, phone: true, isActive: true, createdAt: true },
    orderBy: { name: 'asc' },
  })
}

export async function getEmployee(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, createdAt: true },
  })
}

// Total hours of every employee between two dates.
// Example: const { start, end } = await getWeekRange()
//          const rows = await getHoursByEmployee(start, end)
export async function getHoursByEmployee(start: Date, end: Date) {
  return prisma.$queryRaw<{ id: string; name: string; isActive: boolean; totalHours: number }[]>`
    SELECT
      u.id,
      u.name,
      u.is_active AS "isActive",
      COALESCE(SUM(EXTRACT(EPOCH FROM s.clock_out - s.clock_in)) / 3600, 0)::float AS "totalHours"
    FROM users u
    LEFT JOIN shifts s
      ON s.user_id = u.id AND s.clock_in >= ${start} AND s.clock_in < ${end}
    WHERE u.role = 'employee'
    GROUP BY u.id
    ORDER BY u.name
  `
}

// Shifts of one employee (newest first). `start` / `end` are optional filters.
// `_count.changes > 0` means the shift was "Changed by admin".
export async function getShiftsForEmployee(userId: string, start?: Date, end?: Date) {
  return prisma.shift.findMany({
    where: { userId, clockIn: { gte: start, lt: end } },
    include: {
      branch: true,
      _count: { select: { changes: true } },
    },
    orderBy: { clockIn: 'desc' },
  })
}

// Every shift of every employee, newest first (for /admin/timesheets).
export async function getAllShifts() {
  return prisma.shift.findMany({
    include: {
      user: { select: { id: true, name: true } },
      branch: true,
      _count: { select: { changes: true } },
    },
    orderBy: { clockIn: 'desc' },
  })
}

// One shift with its employee and full change history.
export async function getShift(id: string) {
  return prisma.shift.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      branch: true,
      changes: {
        include: { changedBy: { select: { id: true, name: true } } },
        orderBy: { changedAt: 'desc' },
      },
    },
  })
}

// Every admin change, newest first (for /admin/change-log).
export async function getChangeLog() {
  return prisma.shiftChange.findMany({
    include: {
      changedBy: { select: { id: true, name: true } },
      shift: { include: { user: { select: { id: true, name: true } } } },
    },
    orderBy: { changedAt: 'desc' },
  })
}
