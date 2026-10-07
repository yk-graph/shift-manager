import type { ReactNode } from 'react'
import type { AdminView } from '../_lib/types'
import { Brand, Icon, type IconName } from './ui'

const navItems: Array<{ view: AdminView; label: string; icon: IconName }> = [
  { view: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { view: 'employees', label: 'Employees', icon: 'employees' },
  { view: 'timesheets', label: 'Timesheets', icon: 'calendar' },
  { view: 'changeLog', label: 'Change log', icon: 'history' },
]

export function AdminShell({
  activeView,
  children,
  onNavigate,
}: {
  activeView: AdminView
  children: ReactNode
  onNavigate: (view: AdminView) => void
}) {
  const activeNavView =
    activeView === 'addEmployee' || activeView === 'employeeDetail'
      ? 'employees'
      : activeView === 'editShift'
        ? 'timesheets'
        : activeView

  return (
    <div className="min-h-screen bg-[#fbfaf9] text-[#292524]">
      <aside className="fixed inset-y-0 left-0 hidden w-[240px] flex-col bg-[#272321] px-6 py-8 lg:flex">
        <Brand />

        <nav className="mt-10 space-y-3">
          {navItems.map((item) => {
            const active = activeNavView === item.view
            return (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-base font-semibold transition ${
                  active ? 'bg-[#47413d] text-white' : 'text-[#aaa5a2] hover:bg-[#342f2c] hover:text-white'
                }`}
              >
                <Icon name={item.icon} className="size-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto text-white">
          <p className="font-bold">Daniel Kim</p>
          <p className="mt-1 text-sm text-[#b7b0ac]">Admin · Log out</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-[105px] items-end justify-between border-b border-[#e4e0dc] bg-[#fbfaf9] px-5 pb-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Brand />
          <span className="rounded-md bg-[#f1efee] px-2 py-1 text-xs text-[#706a66]">Admin</span>
        </div>
        <span className="grid size-11 place-items-center rounded-full bg-[#f4f3f2] text-sm font-bold">DK</span>
      </header>

      <main className="px-5 pb-28 pt-7 lg:ml-[240px] lg:px-12 lg:py-12">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-[86px] grid-cols-4 border-t border-[#e4e0dc] bg-[#fbfaf9] lg:hidden">
        {navItems.map((item) => {
          const active = activeNavView === item.view
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition ${
                active ? 'text-[#cf3a08]' : 'text-[#77716d]'
              }`}
            >
              <Icon name={item.icon} className="size-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
