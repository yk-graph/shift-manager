import { useActionState } from 'react'
import type { ClockedIn } from '@/lib/admin-types'
import { updateShiftAction, type ActionState } from '../actions'
import { Button, Field } from './ui'

export function ClockOutModal({ shift, onClose }: { shift: ClockedIn; onClose: () => void }) {
  // Close the modal when the clock-out was saved.
  async function saveClockOut(prevState: ActionState, formData: FormData) {
    const result = await updateShiftAction(prevState, formData)
    if (!result.error) onClose()
    return result
  }

  const [state, formAction, pending] = useActionState(saveClockOut, {})

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-5">
      <form action={formAction} className="w-full max-w-[532px] rounded-2xl bg-bg-surface p-5 shadow-2xl lg:p-9">
        <h2 className="font-serif text-[28px] font-bold leading-none">Close open shift</h2>
        <p className="mt-5 text-text-secondary">
          {shift.employeeName} · {shift.day} · clocked in {shift.clockInTime}
        </p>

        <input type="hidden" name="shiftId" value={shift.shiftId} />
        <input type="hidden" name="day" value={shift.dayValue} />
        <input type="hidden" name="clockIn" value={shift.clockInValue} />

        <div className="mt-5">
          <Field label="Clock-out time" name="clockOut" type="time" required defaultValue="21:00" />
          <Field label="Reason (optional)" name="reason" placeholder="Forgot to clock out" />
          <p className="-mt-2 text-sm text-text-secondary lg:hidden">Leave empty to use “Forgot to clock out.”</p>
          <div className="mt-5 rounded-lg bg-status-warning-bg px-4 py-3 text-sm text-status-warning lg:hidden">
            Saved to the change log with your name, the time, and the reason.
          </div>
        </div>

        {state.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

        <div className="mt-5 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="w-full lg:w-auto">
            {pending ? 'Saving…' : 'Save clock-out'}
          </Button>
        </div>
      </form>
    </div>
  )
}
