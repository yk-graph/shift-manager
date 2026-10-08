'use client'

import { useActionState } from 'react'
import { changePasswordAction } from '../actions'

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, {})

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">Current password</label>
        <input
          type="password"
          name="currentPassword"
          required
          placeholder="••••••••"
          className="w-full rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-ember/20 focus:border-brand-ember transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">New password</label>
        <input
          type="password"
          name="newPassword"
          required
          minLength={6}
          placeholder="At least 8 characters"
          className="w-full rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-ember/20 focus:border-brand-ember transition"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-lg bg-orange-700 px-6 text-sm font-bold text-white transition hover:bg-orange-800 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Update password'}
        </button>
      </div>

      {state.error && (
        <p className="text-sm font-medium text-status-error bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm font-medium text-status-success bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          Password changed successfully.
        </p>
      )}
    </form>
  )
}
