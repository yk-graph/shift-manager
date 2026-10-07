import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { getShift } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function ShiftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('admin')
  const { id } = await params
  const shift = await getShift(id)
  if (!shift) notFound()

  return (
    <div>
      <h1 className="text-h1">Shift detail</h1>
      <p>
        Employee: <Link href={`/admin/employees/${shift.user.id}`}>{shift.user.name}</Link>
      </p>
      <p>Branch: {shift.branch.name}</p>
      <p>Clock in: {formatDateTime(shift.clockIn)}</p>
      <p>Clock out: {formatDateTime(shift.clockOut)}</p>
      <p>Created: {formatDateTime(shift.createdAt)}</p>

      <h2>Changes</h2>
      <ul>
        {shift.changes.map((change) => (
          <li key={change.id}>
            {formatDateTime(change.changedAt)} by {change.changedBy.name} | in: {formatDateTime(change.oldClockIn)} →{' '}
            {formatDateTime(change.newClockIn)} | out: {formatDateTime(change.oldClockOut)} →{' '}
            {formatDateTime(change.newClockOut)} | {change.reason}
          </li>
        ))}
      </ul>
    </div>
  )
}
