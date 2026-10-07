'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import type { ShiftToEdit, TimesheetDay } from '@/lib/admin-types'
import { updateShiftAction, type ActionState } from '../actions'
import { BackButton, BranchBadge, Button, Field, Icon, PageTitle } from './ui'

const weekButtonClass =
  'hidden h-12 w-16 items-center justify-center rounded-lg border border-border-strong bg-bg-surface text-text-primary transition hover:bg-bg-subtle lg:inline-flex'

export function Timesheets({
  days,
  weekLabel,
  total,
  people,
  weeksAgo,
}: {
  days: TimesheetDay[]
  weekLabel: string
  total: string
  people: number
  weeksAgo: number
}) {
  const router = useRouter()

  return (
    <section className="mx-auto max-w-[1120px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle title="Timesheets" subtitle={`${people} people · ${total} this week`} />
        <div className="flex items-center justify-center gap-3 text-lg font-bold">
          <Link href={`/admin/timesheets?week=${weeksAgo + 1}`} className={weekButtonClass}>
            ‹
          </Link>
          <span>{weekLabel}</span>
          {weeksAgo > 0 && (
            <Link href={`/admin/timesheets?week=${weeksAgo - 1}`} className={weekButtonClass}>
              ›
            </Link>
          )}
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

        {days.length === 0 && <p className="px-6 py-8 text-text-secondary">No shifts this week.</p>}

        {days.map((group) => (
          <div key={group.key}>
            <div className="grid grid-cols-2 bg-bg-subtle px-4 py-3 text-sm lg:grid-cols-[150px_1fr_1fr] lg:px-6">
              <span className={`font-bold ${group.isToday ? 'text-brand-ember' : ''}`}>{group.day}</span>
              <span className="hidden text-text-secondary lg:block">
                {group.people} people · {group.shifts.length} shifts
              </span>
              <span className="text-right text-text-secondary">{group.total}</span>
            </div>

            {group.shifts.map((shift) => (
              <button
                key={shift.id}
                onClick={() => router.push(`/admin/shifts/${shift.id}`)}
                className="grid w-full grid-cols-[36px_1fr_auto] items-center gap-2 border-t border-border-default px-4 py-3 text-left transition hover:bg-bg-subtle lg:grid-cols-[150px_240px_140px_220px_1fr_70px] lg:px-6"
              >
                <span className="grid size-7 place-items-center rounded-full bg-bg-subtle text-xs text-text-disabled lg:hidden">
                  {shift.initials}
                </span>
                <span className="hidden lg:block" />
                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <span className="hidden size-7 place-items-center rounded-full bg-bg-subtle text-xs text-text-disabled lg:grid">
                      {shift.initials}
                    </span>
                    <span className="font-medium">{shift.employeeName}</span>
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
            ))}
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

export function EditShift({ shift }: { shift: ShiftToEdit }) {
  const router = useRouter()

  // Go back to the timesheets when the change was saved.
  async function saveShift(prevState: ActionState, formData: FormData) {
    const result = await updateShiftAction(prevState, formData)
    if (!result.error) router.push('/admin/timesheets')
    return result
  }

  const [state, formAction, pending] = useActionState(saveShift, {})

  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Timesheets" onClick={() => router.push('/admin/timesheets')} />
      <PageTitle title={shift.employeeName} subtitle={`${shift.dateLabel} · ${shift.branch}`} />

      <form
        action={formAction}
        className="mt-7 max-w-[640px] rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-border-default lg:bg-bg-surface lg:p-9"
      >
        <div className="mb-6 flex items-end justify-between rounded-lg bg-bg-subtle p-4">
          <div>
            <p className="text-sm text-text-secondary">Recorded</p>
            <p className="mt-1 text-lg font-medium">{shift.recorded}</p>
          </div>
          <p className="font-bold">{shift.duration}</p>
        </div>

        <input type="hidden" name="shiftId" value={shift.id} />
        <input type="hidden" name="day" value={shift.dayValue} />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Clock-in time" name="clockIn" type="time" required defaultValue={shift.clockInValue} />
          <Field label="Clock-out time" name="clockOut" type="time" defaultValue={shift.clockOutValue || '17:00'} />
        </div>
        <Field label="Reason (optional)" name="reason" placeholder="Forgot to clock out" />
        <p className="-mt-2 text-sm text-text-secondary">Leave empty to use “Forgot to clock out.”</p>

        <div className="mt-5 flex gap-3 rounded-lg bg-status-warning-bg px-4 py-3 text-sm text-status-warning">
          <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
          <p>Saved to the change log with your name, the time, and the reason.</p>
        </div>

        {state.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

        <div className="mt-5 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={() => router.push('/admin/timesheets')}>
            Cancel
          </Button>
          <Button type="submit" className="w-full lg:w-auto">
            {pending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </section>
  )
}
