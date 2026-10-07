import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getAllShifts } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function AdminTimesheetsPage() {
  await requireRole('admin')
  const shifts = await getAllShifts()

  return (
    <div>
      <h1 className="text-h1">Timesheets</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            <Link href={`/admin/shifts/${shift.id}`}>{shift.user.name}</Link> | {shift.branch.name} |{' '}
            {formatDateTime(shift.clockIn)} → {formatDateTime(shift.clockOut)}
            {shift._count.changes > 0 && ' | Changed by admin'}
          </li>
        ))}
      </ul>
    </div>
  )
}
