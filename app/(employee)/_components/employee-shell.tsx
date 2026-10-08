'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { Brand, Icon, type IconName } from '@/app/(admin)/admin/_components/ui'
import { logout } from '@/app/(public)/login/actions'
import { initials } from '@/lib/format'

const navItems: Array<{ href: string; label: string; icon: IconName; match: (pathname: string) => boolean }> = [
  { href: '/clock', label: 'Clock', icon: 'clock', match: (pathname) => pathname === '/clock' },
  {
    href: '/timesheet',
    label: 'Timesheet',
    icon: 'calendar',
    match: (pathname) => pathname.startsWith('/timesheet'),
  },
  {
    href: '/account',
    label: 'My account',
    icon: 'user',
    match: (pathname) => pathname.startsWith('/account'),
  },
]

export function EmployeeShell({ employeeName, children }: { employeeName: string; children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-page text-text-primary">
      {/* PC Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-bg-inverse px-6 py-8 lg:flex">
        <Brand />

        <nav className="mt-10 space-y-3">
          {navItems.map((item) => {
            const active = item.match(pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-base font-semibold transition ${
                  active
                    ? 'bg-bg-inverse-hover text-text-inverse'
                    : 'text-text-inverse-subtle hover:bg-bg-inverse-hover hover:text-text-inverse'
                }`}
              >
                <Icon name={item.icon} className="size-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto text-text-on-brand">
          <p className="font-bold">{employeeName}</p>
          <form action={logout} className="mt-1 text-sm text-text-inverse-muted">
            Employee ·{' '}
            <button type="submit" className="hover:underline">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-20 flex h-26 items-end justify-between border-b border-border-default bg-bg-page px-5 pb-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Brand />
          <span className="rounded-md bg-bg-subtle px-2 py-1 text-xs text-text-secondary">Employee</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            title="Log out"
            className="grid size-11 place-items-center rounded-full bg-bg-subtle text-sm font-bold"
          >
            {initials(employeeName)}
          </button>
        </form>
      </header>

      {/* Main Content Area */}
      <main className="px-5 pb-28 pt-7 lg:ml-60 lg:px-12 lg:py-12">{children}</main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-21 grid-cols-3 border-t border-border-default bg-bg-page lg:hidden">
        {navItems.map((item) => {
          const active = item.match(pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition ${
                active ? 'text-brand-ember' : 'text-text-secondary'
              }`}
            >
              <Icon name={item.icon} className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
