'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { logout } from '@/app/(public)/login/actions'
import { initials } from '@/lib/format'
import { Brand, Icon, type IconName } from './ui'

const navItems: Array<{ href: string; label: string; icon: IconName; match: (pathname: string) => boolean }> = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard', match: (pathname) => pathname === '/admin' },
  {
    href: '/admin/employees',
    label: 'Employees',
    icon: 'employees',
    match: (pathname) => pathname.startsWith('/admin/employees'),
  },
  {
    href: '/admin/timesheets',
    label: 'Timesheets',
    icon: 'calendar',
    match: (pathname) => pathname.startsWith('/admin/timesheets') || pathname.startsWith('/admin/shifts'),
  },
  {
    href: '/admin/change-log',
    label: 'Change log',
    icon: 'history',
    match: (pathname) => pathname.startsWith('/admin/change-log'),
  },
]

export function AdminShell({ adminName, children }: { adminName: string; children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-page text-text-primary">
      <aside className="fixed inset-y-0 left-0 hidden w-[240px] flex-col bg-bg-inverse px-6 py-8 lg:flex">
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
          <p className="font-bold">{adminName}</p>
          <form action={logout} className="mt-1 text-sm text-text-inverse-muted">
            Admin ·{' '}
            <button type="submit" className="hover:underline">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-[105px] items-end justify-between border-b border-border-default bg-bg-page px-5 pb-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Brand />
          <span className="rounded-md bg-bg-subtle px-2 py-1 text-xs text-text-secondary">Admin</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            title="Log out"
            className="grid size-11 place-items-center rounded-full bg-bg-subtle text-sm font-bold"
          >
            {initials(adminName)}
          </button>
        </form>
      </header>

      <main className="px-5 pb-28 pt-7 lg:ml-[240px] lg:px-12 lg:py-12">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-[86px] grid-cols-4 border-t border-border-default bg-bg-page lg:hidden">
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
