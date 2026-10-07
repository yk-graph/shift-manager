import { requireRole } from '@/lib/auth'
import { getBranches, getOpenShift } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'
import ClockButtons from './clock-buttons'

export default async function ClockPage() {
  const user = await requireRole('employee')
  const branches = await getBranches()
  const openShift = await getOpenShift(user.id)

  return (
    <div>
      <h1 className="text-h1">Clock</h1>
      <p>Hi {user.name}</p>

      {openShift ? (
        <p>
          Clocked in since {formatDateTime(openShift.clockIn)} at {openShift.branch.name}
        </p>
      ) : (
        <p>Clocked out</p>
      )}

      <ClockButtons branches={branches} isClockedIn={!!openShift} />
    </div>
  )
}
