import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { getEmployee, getShiftsForEmployee } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('admin')
  const { id } = await params
  const employee = await getEmployee(id)
  if (!employee) notFound()

  const shifts = await getShiftsForEmployee(employee.id)

  return (
    <div>
      <h1 className="text-h1">Employee detail</h1>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone ?? '—'}</p>
      <p>Status: {employee.isActive ? 'Active' : 'Deactivated'}</p>

      <h2>Shifts</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            <Link href={`/admin/shifts/${shift.id}`}>{formatDateTime(shift.clockIn)}</Link> →{' '}
            {formatDateTime(shift.clockOut)} | {shift.branch.name}
            {shift._count.changes > 0 && ' | Changed by admin'}
          </li>
        ))}
      </ul>
    </div>
  )
}
