import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getClockedInNow } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function AdminDashboardPage() {
  await requireRole('admin')
  const openShifts = await getClockedInNow()

  return (
    <div>
      <h1 className="text-h1">Dashboard</h1>
      <h2>Clocked in right now ({openShifts.length})</h2>
      <ul>
        {openShifts.map((shift) => (
          <li key={shift.id}>
            <Link href={`/admin/employees/${shift.user.id}`}>{shift.user.name}</Link> | {shift.branch.name} | since{' '}
            {formatDateTime(shift.clockIn)} | <Link href={`/admin/shifts/${shift.id}`}>shift</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
