import { useMemo } from 'react'
import type { Employee, Shift } from '../_lib/types'
import { BackButton, BranchBadge, Button, Field, Icon, PageTitle } from './ui'

const timesheetDays = ['Mon, Sep 28', 'Tue, Sep 29', 'Wed, Sep 30', 'Thu, Oct 1', 'Fri, Oct 2', 'Sat, Oct 3']

function dayTotal(day: string) {
  return {
    'Mon, Sep 28': '33h 15m total',
    'Tue, Sep 29': '28h 05m total',
    'Wed, Sep 30': '23h 21m total',
    'Thu, Oct 1': '19h 00m total',
    'Fri, Oct 2': '20h 08m total',
    'Sat, Oct 3': '11h 54m total',
  }[day]
}

export function Timesheets({
  employees,
  shifts,
  onEditShift,
}: {
  employees: Employee[]
  shifts: Shift[]
  onEditShift: (shiftId: number) => void
}) {
  const grouped = useMemo(
    () =>
      timesheetDays.map((day) => ({
        day,
        total: dayTotal(day),
        rows: shifts.filter((shift) => shift.day === day),
      })),
    [shifts],
  )

  return (
    <section className="mx-auto max-w-[1120px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle title="Timesheets" subtitle="5 people · 135h 43m this week" />
        <div className="flex items-center justify-center gap-3 text-lg font-bold">
          <Button variant="secondary" className="hidden h-12 w-16 px-0 lg:inline-flex">
            ‹
          </Button>
          <span>Sep 28 – Oct 4, 2026</span>
          <Button variant="secondary" className="hidden h-12 w-16 px-0 lg:inline-flex">
            ›
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border-default bg-bg-surface">
        <div className="hidden grid-cols-[150px_240px_140px_220px_1fr_70px] border-b border-border-default px-6 py-4 text-sm font-bold text-text-secondary lg:grid">
          <span>Date</span>
          <span>Employee</span>
          <span>Branch</span>
          <span>Time</span>
          <span>Hours</span>
          <span />
        </div>

        {grouped.map((group) => (
          <div key={group.day}>
            <div className="grid grid-cols-2 bg-bg-subtle px-4 py-3 text-sm lg:grid-cols-[150px_1fr_1fr] lg:px-6">
              <span className={`font-bold ${group.day === 'Sat, Oct 3' ? 'text-brand-ember' : ''}`}>{group.day}</span>
              <span className="hidden text-text-secondary lg:block">
                {new Set(group.rows.map((row) => row.employeeId)).size} people · {group.rows.length} shifts
              </span>
              <span className="text-right text-text-secondary">{group.total}</span>
            </div>

            {group.rows.map((shift) => {
              const employee = employees.find((item) => item.id === shift.employeeId)!
              return (
                <button
                  key={shift.id}
                  onClick={() => onEditShift(shift.id)}
                  className="grid w-full grid-cols-[36px_1fr_auto] items-center gap-2 border-t border-border-default px-4 py-3 text-left transition hover:bg-bg-subtle lg:grid-cols-[150px_240px_140px_220px_1fr_70px] lg:px-6"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-bg-subtle text-xs text-text-disabled lg:hidden">
                    {employee.initials}
                  </span>
                  <span className="hidden lg:block" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      <span className="hidden size-7 place-items-center rounded-full bg-bg-subtle text-xs text-text-disabled lg:grid">
                        {employee.initials}
                      </span>
                      <span className="font-medium">{employee.name}</span>
                    </span>
                    <span className="mt-1 flex items-center gap-2 lg:hidden">
                      <BranchBadge branch={shift.branch} />
                      <span className="text-sm text-text-secondary">
                        {shift.clockIn} – {shift.clockOut}
                      </span>
                    </span>
                  </span>
                  <span className="hidden lg:block">
                    <BranchBadge branch={shift.branch} />
                  </span>
                  <span className="hidden lg:block">
                    {shift.clockIn} – {shift.clockOut}
                  </span>
                  <span
                    className={`font-bold ${
                      shift.onShift ? 'text-status-success' : shift.isOpen ? 'text-status-warning' : 'text-text-primary'
                    }`}
                  >
                    {shift.onShift ? `${shift.duration} · on shift` : shift.duration}
                  </span>
                  <span className="hidden text-right text-sm text-text-secondary lg:block">Edit</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-5 hidden gap-5 text-sm lg:flex">
        <span className="text-status-success">
          On shift <span className="text-text-secondary">On shift now</span>
        </span>
        <span className="text-status-warning">
          Open <span className="text-text-secondary">Shift still open</span>
        </span>
      </div>
    </section>
  )
}

export function EditShift({ onBack, onSaveShiftEdit }: { onBack: () => void; onSaveShiftEdit: () => void }) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Timesheets" onClick={onBack} />
      <PageTitle title="Maria Santos" subtitle="Thu, Oct 1, 2026 · Gastown" />

      <form className="mt-7 max-w-[640px] rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-border-default lg:bg-bg-surface lg:p-9">
        <div className="mb-6 flex items-end justify-between rounded-lg bg-bg-subtle p-4">
          <div>
            <p className="text-sm text-text-secondary">Recorded</p>
            <p className="mt-1 text-lg font-medium">8:00 AM – 4:30 PM</p>
          </div>
          <p className="font-bold">8h 30m</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Clock-in time" defaultValue="8:00 AM" />
          <Field label="Clock-out time" defaultValue="5:00 PM" />
        </div>
        <Field label="Reason (optional)" placeholder="Forgot to clock out" />
        <p className="-mt-2 text-sm text-text-secondary">Leave empty to use “Forgot to clock out.”</p>

        <div className="mt-5 flex gap-3 rounded-lg bg-status-warning-bg px-4 py-3 text-sm text-status-warning">
          <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
          <p>Saved to the change log with your name, the time, and the reason.</p>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={onBack}>
            Cancel
          </Button>
          <Button className="w-full lg:w-auto" onClick={onSaveShiftEdit}>
            Save changes
          </Button>
        </div>
      </form>
    </section>
  )
}
