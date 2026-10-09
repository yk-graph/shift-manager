'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {})

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans selection:bg-brand-ember selection:text-text-on-brand">
      <div className="hidden lg:flex bg-bg-inverse text-text-inverse px-20 py-16 flex-col justify-between relative min-h-screen">
        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-brand-ember shrink-0"></span>
          <span className="font-serif font-bold text-lg tracking-wide text-text-inverse">ABC Dumplings</span>
        </div>

        <div className="max-w-110 space-y-6 my-auto">
          <h1 className="text-[40px] font-serif font-bold tracking-tight leading-[1.15] text-text-inverse">
            Great dumplings start <br />
            with a good shift.
          </h1>
          <p className="text-text-inverse-subtle text-base leading-relaxed">
            Clock in, check your hours, and see your timesheet <br />— all in one place.
          </p>
        </div>

        <div className="text-xs text-text-secondary pt-6">Team members and managers use the same login page.</div>
      </div>

      <div className="bg-bg-page text-text-primary px-6 pt-16 pb-8 lg:px-20 lg:py-16 flex flex-col justify-between min-h-screen">
        <div className="flex items-center gap-2.5 lg:hidden mb-0">
          <span className="w-3.5 h-3.5 rounded-full bg-brand-ember shrink-0"></span>
          <span className="font-serif font-bold text-lg tracking-wide text-text-primary">ABC Dumplings</span>
        </div>

        <div className="hidden lg:flex justify-end"></div>

        <div className="w-full max-w-110 mx-auto bg-transparent lg:bg-bg-surface lg:border lg:border-border-default lg:rounded-2xl lg:shadow-sm lg:p-10 space-y-5">
          <div>
            <h2 className="text-[28px] lg:text-[32px] font-serif font-bold text-text-primary tracking-tight">
              Staff login
            </h2>
            <p className="text-xs lg:text-sm text-text-secondary mt-1 font-normal">
              Use the email your manager gave you.
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="maria@abcdumplings.ca"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-surface border border-border-default focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember text-sm text-text-primary placeholder:text-text-disabled"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-surface border border-border-default focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember text-sm text-text-primary placeholder:text-text-disabled"
              />
            </div>

            {state.error && <p className="text-sm text-red-600">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-brand-ember hover:bg-brand-ember-dark text-text-on-brand font-medium py-2.5 rounded-lg transition shadow-sm text-sm mt-1"
            >
              {pending ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </div>

        <div></div>
      </div>
    </div>
  )
}
