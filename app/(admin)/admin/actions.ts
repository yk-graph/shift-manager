'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { updateShift } from '@/lib/clock'
import { vancouverDateTime } from '@/lib/time'
import { createEmployee, setEmployeeActive } from '@/lib/users'

export type ActionState = { error?: string }

// Admin closes an open shift or fixes the times of a shift.
// Used by the "Close open shift" modal and the "Edit shift" page.
// Form fields:
//   shiftId  (hidden)
//   day      (hidden) the shift's day in Vancouver time, e.g. "2026-10-02"
//   clockIn  <input type="time">, e.g. "08:00"
//   clockOut <input type="time">, empty = leave the shift open
//   reason   optional, empty = "Forgot to clock out"
export async function updateShiftAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireRole('admin')

  const shiftId = String(formData.get('shiftId'))
  const day = String(formData.get('day'))
  const clockInTime = String(formData.get('clockIn') ?? '')
  const clockOutTime = String(formData.get('clockOut') ?? '')
  const reason = String(formData.get('reason') ?? '')

  if (!clockInTime) {
    return { error: 'Clock-in time is required.' }
  }

  const clockIn = vancouverDateTime(day, clockInTime)
  const clockOut = clockOutTime ? vancouverDateTime(day, clockOutTime) : null

  try {
    await updateShift(admin.id, shiftId, clockIn, clockOut, reason)
  } catch (error) {
    return { error: (error as Error).message }
  }

  revalidatePath('/admin', 'layout')
  return {}
}

// Admin creates an employee, then goes back to the employee list.
// Form fields: name, email, phone (optional), password
export async function createEmployeeAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole('admin')

  try {
    await createEmployee({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      password: String(formData.get('password') ?? ''),
    })
  } catch (error) {
    return { error: (error as Error).message }
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin/employees')
}

// Admin deactivates or reactivates an employee.
// Use directly in a form: <form action={setEmployeeActiveAction}>
// Form fields: employeeId (hidden), isActive (hidden, "true" or "false")
export async function setEmployeeActiveAction(formData: FormData) {
  await requireRole('admin')

  const employeeId = String(formData.get('employeeId'))
  const isActive = formData.get('isActive') === 'true'

  try {
    await setEmployeeActive(employeeId, isActive)
  } catch {
    return
  }
  revalidatePath('/admin', 'layout')
}
