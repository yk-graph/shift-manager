import type { Employee } from '../_lib/types'
import { Button, Field } from './ui'

export function ClockOutModal({
  employee,
  onCancel,
  onSaveClockOut,
}: {
  employee: Employee
  onCancel: () => void
  onSaveClockOut: (employeeId: number) => void
}) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-5">
      <div className="w-full max-w-[532px] rounded-2xl bg-bg-surface p-5 shadow-2xl lg:p-9">
        <h2 className="font-serif text-[28px] font-bold leading-none">Close open shift</h2>
        <p className="mt-5 text-text-secondary">{employee.name} · Fri, Oct 2 · clocked in 1:10 PM</p>

        <div className="mt-5">
          <Field label="Clock-out time" defaultValue="5:00 PM" />
          <Field label="Reason (optional)" placeholder="Forgot to clock out" />
          <p className="-mt-2 text-sm text-text-secondary lg:hidden">Leave empty to use “Forgot to clock out.”</p>
          <div className="mt-5 rounded-lg bg-status-warning-bg px-4 py-3 text-sm text-status-warning lg:hidden">
            Saved to the change log with your name, the time, and the reason.
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="w-full lg:w-auto" onClick={() => onSaveClockOut(employee.id)}>
            Save clock-out
          </Button>
        </div>
      </div>
    </div>
  )
}
