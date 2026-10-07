'use server'

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/auth'
import { clockIn, clockOut } from '@/lib/clock'

export type ClockState = { error?: string }

// Use with `useActionState(clockInAction, {})`.
// The form needs an input (or hidden input) with name="branchId".
export async function clockInAction(prevState: ClockState, formData: FormData): Promise<ClockState> {
  const user = await requireRole('employee')
  const branchId = Number(formData.get('branchId'))

  try {
    await clockIn(user.id, branchId)
  } catch (error) {
    return { error: (error as Error).message }
  }

  revalidatePath('/clock')
  return {}
}

// Use with `useActionState(clockOutAction, {})`.
export async function clockOutAction(): Promise<ClockState> {
  const user = await requireRole('employee')

  try {
    await clockOut(user.id)
  } catch (error) {
    return { error: (error as Error).message }
  }

  revalidatePath('/clock')
  return {}
}
