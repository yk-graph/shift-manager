'use client'

import { useActionState } from 'react'
import { changePasswordAction } from '../actions'

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, {})

  return (
    <form action={formAction}>
      <label>
        Current password
        <input type="password" name="currentPassword" required />
      </label>
      <label>
        New password
        <input type="password" name="newPassword" required minLength={6} />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Change password'}
      </button>

      {state.error && <p>{state.error}</p>}
      {state.success && <p>Password changed.</p>}
    </form>
  )
}
