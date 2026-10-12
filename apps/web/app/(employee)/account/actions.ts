'use server'

import { requireRole } from '@/lib/auth'
import { changePassword } from '@/lib/users'

export type ChangePasswordState = { error?: string; success?: boolean }

// Employee changes their own password. Use with `useActionState(changePasswordAction, {})`.
// Form fields: currentPassword, newPassword
export async function changePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const user = await requireRole('employee')

  try {
    await changePassword(
      user.id,
      String(formData.get('currentPassword') ?? ''),
      String(formData.get('newPassword') ?? ''),
    )
  } catch (error) {
    return { error: (error as Error).message }
  }

  return { success: true }
}
