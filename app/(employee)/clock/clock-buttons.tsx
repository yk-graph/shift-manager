'use client'

import { useActionState } from 'react'
import { clockInAction, clockOutAction } from './actions'

type Props = {
  branches: { id: number; name: string }[]
  isClockedIn: boolean
}

export default function ClockButtons({ branches, isClockedIn }: Props) {
  const [clockInState, clockIn, clockInPending] = useActionState(clockInAction, {})
  const [clockOutState, clockOut, clockOutPending] = useActionState(clockOutAction, {})

  return (
    <div>
      <form action={clockIn}>
        <select name="branchId">
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isClockedIn || clockInPending}>
          Clock In
        </button>
      </form>

      <form action={clockOut}>
        <button type="submit" disabled={!isClockedIn || clockOutPending}>
          Clock Out
        </button>
      </form>

      {clockInState.error && <p>{clockInState.error}</p>}
      {clockOutState.error && <p>{clockOutState.error}</p>}
    </div>
  )
}
