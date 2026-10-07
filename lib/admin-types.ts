// Shapes the admin components expect. `lib/admin-data.ts` builds them from the database.

export type EmployeeStatus = 'Active' | 'Deactivated'

export type Employee = {
  id: string
  name: string
  initials: string
  email: string
  phone?: string
  status: EmployeeStatus
}

export type ClockedIn = {
  shiftId: string
  employeeId: string
  employeeName: string
  day: string
  dayValue: string // "2026-10-02", sent with the clock-out form
  clockInTime: string
  clockInValue: string // "13:10", for <input type="time">
  since: string
  duration: string
  branch: string
  late?: boolean // still open from a previous day
}

export type Shift = {
  id: string
  employeeId: string
  employeeName: string
  initials: string
  day: string
  branch: string
  clockIn: string
  clockOut: string
  duration: string
  isOpen?: boolean // still open from a previous day
  onShift?: boolean // open and started today
}

export type TimesheetDay = {
  key: string
  day: string
  isToday: boolean
  total: string
  people: number
  shifts: Shift[]
}

export type ShiftToEdit = {
  id: string
  employeeName: string
  dateLabel: string
  branch: string
  recorded: string
  duration: string
  dayValue: string // "2026-10-02", sent with the edit form
  clockInValue: string // "08:00", for <input type="time">
  clockOutValue: string // "" when the shift is still open
}

export type ChangeLogEntry = {
  id: string
  when: string
  time: string
  admin: string
  employee: string
  shift: string
  branch: string
  change: string
  reason: string
}
