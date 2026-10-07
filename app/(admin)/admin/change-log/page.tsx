import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getChangeLog } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function ChangeLogPage() {
  await requireRole('admin')
  const changes = await getChangeLog()

  return (
    <div>
      <h1 className="text-h1">Change log</h1>
      <ul>
        {changes.map((change) => (
          <li key={change.id}>
            {formatDateTime(change.changedAt)} | {change.changedBy.name} changed{' '}
            <Link href={`/admin/shifts/${change.shiftId}`}>{change.shift.user.name}&apos;s shift</Link> | in:{' '}
            {formatDateTime(change.oldClockIn)} → {formatDateTime(change.newClockIn)} | out:{' '}
            {formatDateTime(change.oldClockOut)} → {formatDateTime(change.newClockOut)} | {change.reason}
          </li>
        ))}
      </ul>
    </div>
  )
}
