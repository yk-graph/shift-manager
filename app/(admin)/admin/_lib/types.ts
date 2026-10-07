export type AdminView =
  'dashboard' | 'employees' | 'addEmployee' | 'employeeDetail' | 'timesheets' | 'editShift' | 'changeLog'

export type Branch = 'Gastown' | 'Richmond'
export type EmployeeStatus = 'Active' | 'Deactivated'

export type Employee = {
  id: number
  name: string
  initials: string
  email: string
  phone?: string
  status: EmployeeStatus
  branch: Branch
}

export type ClockedIn = {
  employeeId: number
  since: string
  duration: string
  branch: Branch
  late?: boolean
}

export type Shift = {
  id: number
  employeeId: number
  day: string
  dateLabel: string
  branch: Branch
  clockIn: string
  clockOut: string
  duration: string
  isOpen?: boolean
  onShift?: boolean
}

export type ChangeLogEntry = {
  when: string
  time: string
  admin: string
  employee: string
  shift: string
  branch: string
  change: string
  reason: string
}
