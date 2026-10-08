// Loads data for the admin pages and shapes it for the components (see ./admin-types.ts).
// Only use these in server components (page.tsx files).
import {
  getChangeLog,
  getClockedInNow,
  getDailyTotals,
  getEmployee,
  getEmployees,
  getOpenShift,
  getShift,
  getShifts,
  getShiftsForEmployee,
  getTotalHours,
  getWeekRange,
} from '@/lib/queries'
import {
  dayKey,
  describeChange,
  formatDate,
  formatDay,
  formatDuration,
  formatHours,
  formatLongDate,
  formatTime,
  formatTimeInput,
  formatWeekRange,
  initials,
} from '@/lib/format'
import type { ChangeLogEntry, ClockedIn, Employee, Shift, ShiftToEdit, TimesheetDay } from '@/lib/admin-types'

type DbShift = {
  id: string
  clockIn: Date
  clockOut: Date | null
  user: { id: string; name: string }
  branch: { name: string }
}

function toShift(shift: DbShift): Shift {
  const isToday = dayKey(shift.clockIn) === dayKey(new Date())
  const onShift = !shift.clockOut && isToday
  const isOpen = !shift.clockOut && !isToday

  return {
    id: shift.id,
    employeeId: shift.user.id,
    employeeName: shift.user.name,
    initials: initials(shift.user.name),
    day: formatDay(shift.clockIn),
    branch: shift.branch.name,
    clockIn: formatTime(shift.clockIn),
    clockOut: shift.clockOut ? formatTime(shift.clockOut) : onShift ? 'now' : 'open',
    duration: isOpen ? 'Open' : formatDuration(shift.clockIn, shift.clockOut),
    isOpen,
    onShift,
  }
}

function toClockedIn(shift: DbShift): ClockedIn {
  const late = dayKey(shift.clockIn) !== dayKey(new Date())
  return {
    shiftId: shift.id,
    employeeId: shift.user.id,
    employeeName: shift.user.name,
    day: formatDay(shift.clockIn),
    dayValue: dayKey(shift.clockIn),
    clockInTime: formatTime(shift.clockIn),
    clockInValue: formatTimeInput(shift.clockIn),
    since: late ? `${formatDay(shift.clockIn)} ${formatTime(shift.clockIn)}` : formatTime(shift.clockIn),
    duration: formatDuration(shift.clockIn, null),
    branch: shift.branch.name,
    late,
  }
}

function toEmployee(user: { id: string; name: string; email: string; phone: string | null; isActive: boolean }) {
  const employee: Employee = {
    id: user.id,
    name: user.name,
    initials: initials(user.name),
    email: user.email,
    phone: user.phone ?? undefined,
    status: user.isActive ? 'Active' : 'Deactivated',
  }
  return employee
}

// /admin
export async function getDashboardData() {
  const { start, end } = await getWeekRange()
  const openShifts = await getClockedInNow()
  const hoursThisWeek = await getTotalHours(start, end)

  return {
    clockedIn: openShifts.map(toClockedIn),
    hoursThisWeek: formatHours(hoursThisWeek),
  }
}

// /admin/employees
export async function getEmployeeList() {
  const users = await getEmployees()
  return users.map(toEmployee)
}

// /admin/employees/[id] — null if there is no employee with that id.
export async function getEmployeeDetailData(id: string) {
  const user = await getEmployee(id)
  if (!user || user.role !== 'employee') return null

  const { start, end } = await getWeekRange()
  const shifts = await getShiftsForEmployee(id, start, end)
  const totalHours = await getTotalHours(start, end, id)
  const openShift = await getOpenShift(id)

  return {
    employee: toEmployee(user),
    shifts: shifts.map((shift) => toShift({ ...shift, user })),
    weekLabel: formatWeekRange(start, end),
    total: formatHours(totalHours),
    openShift: openShift ? toClockedIn({ ...openShift, user }) : null,
  }
}

// /admin/timesheets — one week of shifts, grouped by day.
export async function getTimesheetData(weeksAgo: number) {
  const { start, end } = await getWeekRange(weeksAgo)
  const shifts = await getShifts(start, end)
  const dailyTotals = await getDailyTotals(start, end)
  const totalHours = await getTotalHours(start, end)
  const today = dayKey(new Date())

  const days: TimesheetDay[] = dailyTotals.map((daily) => {
    const dayShifts = shifts.filter((shift) => dayKey(shift.clockIn) === daily.day)
    return {
      key: daily.day,
      day: formatDay(dayShifts[0].clockIn),
      isToday: daily.day === today,
      total: `${formatHours(daily.totalHours)} total`,
      people: new Set(dayShifts.map((shift) => shift.userId)).size,
      shifts: dayShifts.map(toShift),
    }
  })

  return {
    days,
    weekLabel: formatWeekRange(start, end),
    total: formatHours(totalHours),
    people: new Set(shifts.map((shift) => shift.userId)).size,
  }
}

// /admin/shifts/[id] — null if there is no shift with that id.
export async function getShiftToEdit(id: string) {
  const shift = await getShift(id)
  if (!shift) return null

  const recordedOut = shift.clockOut ? formatTime(shift.clockOut) : 'open'
  const result: ShiftToEdit = {
    id: shift.id,
    employeeName: shift.user.name,
    dateLabel: formatLongDate(shift.clockIn),
    branch: shift.branch.name,
    recorded: `${formatTime(shift.clockIn)} – ${recordedOut}`,
    duration: shift.clockOut ? formatDuration(shift.clockIn, shift.clockOut) : 'Open',
    dayValue: dayKey(shift.clockIn),
    clockInValue: formatTimeInput(shift.clockIn),
    clockOutValue: shift.clockOut ? formatTimeInput(shift.clockOut) : '',
  }
  return result
}

// /admin/change-log
export async function getChangeLogEntries() {
  const changes = await getChangeLog()

  return changes.map((change) => {
    const shift = change.shift
    const shiftOut = shift.clockOut ? formatTime(shift.clockOut) : 'open'
    const entry: ChangeLogEntry = {
      id: change.id,
      when: formatDate(change.changedAt),
      time: formatTime(change.changedAt),
      admin: change.changedBy.name,
      employee: shift.user.name,
      shift: formatDay(shift.clockIn),
      branch: `${shift.branch.name} · ${formatTime(shift.clockIn)} – ${shiftOut}`,
      change: describeChange(change),
      reason: change.reason,
    }
    return entry
  })
}
