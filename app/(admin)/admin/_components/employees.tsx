'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ClockedIn, Employee, Shift } from '@/lib/admin-types'
import { ClockOutModal } from './clock-out-modal'
import { BackButton, Button, Field, PageTitle, Pill } from './ui'

function onDeactivate(employeeId: string) {
  // Backend hook: deactivate/reactivate employee, then refresh the page.
  void employeeId
}

export function Employees({ employees }: { employees: Employee[] }) {
  const activeCount = employees.filter((employee) => employee.status === 'Active').length
  const deactivatedCount = employees.length - activeCount

  return (
    <section className="mx-auto max-w-[1104px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle title="Employees" subtitle={`${employees.length} people · ${activeCount} active`} />
        <Link
          href="/admin/employees/new"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-ember px-5 text-base font-bold text-text-on-brand transition hover:bg-brand-ember-dark lg:w-auto"
        >
          + Add employee
        </Link>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-bg-inverse px-4 py-2 text-sm font-bold text-text-on-brand">
          All ({employees.length})
        </span>
        <span className="rounded-full border border-border-default bg-bg-surface px-4 py-2 text-sm font-bold text-text-secondary">
          Active ({activeCount})
        </span>
        <span className="rounded-full border border-border-default bg-bg-surface px-4 py-2 text-sm font-bold text-text-secondary">
          Deactivated ({deactivatedCount})
        </span>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-xl border border-border-default bg-bg-surface lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border-default text-left text-sm text-text-secondary">
              <th className="px-6 py-5 font-bold">Name</th>
              <th className="px-6 py-5 font-bold">Email</th>
              <th className="px-6 py-5 font-bold">Phone</th>
              <th className="px-6 py-5 font-bold">Status</th>
              <th className="px-6 py-5 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-border-default last:border-b-0">
                <td className="px-6 py-5 font-bold">{employee.name}</td>
                <td className="px-6 py-5">{employee.email}</td>
                <td className="px-6 py-5">{employee.phone ?? '—'}</td>
                <td className="px-6 py-5">
                  <Pill tone={employee.status === 'Active' ? 'green' : 'gray'}>{employee.status}</Pill>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link href={`/admin/employees/${employee.id}`} className="mr-4 text-sm text-text-secondary">
                    Details
                  </Link>
                  <Button variant="secondary" className="h-9 px-4 text-sm" onClick={() => onDeactivate(employee.id)}>
                    {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-4 lg:hidden">
        {employees.map((employee) => (
          <article key={employee.id} className="rounded-xl border border-border-default bg-bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{employee.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{employee.email}</p>
              </div>
              <Pill tone={employee.status === 'Active' ? 'green' : 'gray'}>{employee.status}</Pill>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Link href={`/admin/employees/${employee.id}`} className="text-sm text-text-secondary">
                Details
              </Link>
              <Button variant="secondary" className="h-9 px-4 text-sm" onClick={() => onDeactivate(employee.id)}>
                {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AddEmployee({ onBack, onCreateEmployee }: { onBack: () => void; onCreateEmployee: () => void }) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Employees" onClick={onBack} />
      <PageTitle title="Add employee" subtitle="They’ll log in with this email and password." />

      <form className="mt-7 max-w-[640px] rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-border-default lg:bg-bg-surface lg:p-9">
        <Field label="Full name" placeholder="e.g. Kenji Watanabe" />
        <Field label="Email (login)" defaultValue="kenji@abcdumplings.ca" />
        <Field label="Phone number (optional)" placeholder="(604) 555-0000" />
        <Field label="Password" defaultValue="••••••••••" icon="eye" />

        <p className="mt-3 text-sm text-text-secondary lg:hidden">
          Share it with them in person. They can change it in Account settings.
        </p>
        <div className="mt-4 rounded-lg bg-bg-subtle p-4 text-sm text-text-secondary lg:hidden">
          <p className="font-bold text-text-primary">Role: Employee</p>
          <p className="mt-1">Admins are created by the seed script only.</p>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={onBack}>
            Cancel
          </Button>
          <Button className="w-full lg:w-auto" onClick={onCreateEmployee}>
            Create account
          </Button>
        </div>
      </form>
    </section>
  )
}

export function EmployeeDetail({
  employee,
  shifts,
  weekLabel,
  total,
  openShift,
}: {
  employee: Employee
  shifts: Shift[]
  weekLabel: string
  total: string
  openShift: ClockedIn | null
}) {
  const router = useRouter()
  const [showClockOut, setShowClockOut] = useState(false)

  function handleSaveClockOut(shiftId: string) {
    // Backend hook: close open shift and append a change-log entry.
    void shiftId
    setShowClockOut(false)
  }

  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Employees" onClick={() => router.push('/admin/employees')} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle
          title={employee.name}
          subtitle={`${employee.email}${employee.phone ? ` · ${employee.phone}` : ''}`}
        />
        <div className="grid grid-cols-2 gap-3 lg:flex">
          <Button variant="secondary" onClick={() => onDeactivate(employee.id)}>
            {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
          </Button>
          {openShift && (
            <Button variant="dark" onClick={() => setShowClockOut(true)}>
              Clock out now
            </Button>
          )}
        </div>
      </div>

      <div className="mt-7 rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-border-default lg:bg-bg-surface lg:p-7">
        <h2 className="text-xl font-bold lg:text-2xl">
          Shifts · {weekLabel} · Total {total}
        </h2>

        <div className="mt-4 hidden lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-default text-left text-sm text-text-secondary">
                <th className="py-5 font-bold">Date</th>
                <th className="py-5 font-bold">Clock in</th>
                <th className="py-5 font-bold">Clock out</th>
                <th className="py-5 font-bold">Duration</th>
                <th className="py-5" />
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id} className="border-b border-border-default last:border-b-0">
                  <td className="py-5 font-bold">{shift.day}</td>
                  <td className="py-5">{shift.clockIn}</td>
                  <td className="py-5">{shift.isOpen ? <Pill tone="amber">Open</Pill> : shift.clockOut}</td>
                  <td className="py-5">{shift.isOpen ? '—' : shift.duration}</td>
                  <td className="py-5 text-right text-sm text-text-secondary">
                    <Link href={`/admin/shifts/${shift.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 lg:hidden">
          {shifts.map((shift) => (
            <article key={shift.id} className="rounded-xl border border-border-default bg-bg-surface p-4">
              <div className="flex justify-between gap-3 text-sm text-text-secondary">
                <span>
                  {shift.day} · {shift.branch}
                </span>
                <Link href={`/admin/shifts/${shift.id}`}>Edit</Link>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-lg font-medium">
                  {shift.clockIn} – {shift.clockOut}
                </p>
                {shift.isOpen ? <Pill tone="amber">Open</Pill> : <p className="font-bold">{shift.duration}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {showClockOut && openShift && (
        <ClockOutModal shift={openShift} onCancel={() => setShowClockOut(false)} onSaveClockOut={handleSaveClockOut} />
      )}
    </section>
  )
}
