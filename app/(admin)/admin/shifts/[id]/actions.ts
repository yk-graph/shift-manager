'use server'

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/auth'
import { updateShift } from '@/lib/clock'

export type UpdateShiftState = { error?: string }

// Admin closes or corrects a shift. Use with `useActionState(updateShiftAction, {})`.
// Form fields: shiftId (hidden), clockIn and clockOut (<input type="datetime-local">), reason.
// datetime-local has no timezone, so the browser must send an ISO string,
// e.g. new Date(value).toISOString(), or the admin must be in Vancouver.
export async function updateShiftAction(prevState: UpdateShiftState, formData: FormData): Promise<UpdateShiftState> {
  const admin = await requireRole('admin')

  const shiftId = String(formData.get('shiftId'))
  const clockIn = new Date(String(formData.get('clockIn')))
  const clockOutValue = String(formData.get('clockOut') ?? '')
  const clockOut = clockOutValue ? new Date(clockOutValue) : null
  const reason = String(formData.get('reason') ?? '')

  try {
    await updateShift(admin.id, shiftId, clockIn, clockOut, reason)
  } catch (error) {
    return { error: (error as Error).message }
  }

  revalidatePath('/admin', 'layout')
  return {}
}
