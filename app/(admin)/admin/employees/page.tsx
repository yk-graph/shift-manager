import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getEmployees } from '@/lib/queries'

export default async function EmployeesPage() {
  await requireRole('admin')
  const employees = await getEmployees()

  return (
    <div>
      <h1 className="text-h1">Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <Link href={`/admin/employees/${employee.id}`}>{employee.name}</Link> | {employee.email} |{' '}
            {employee.phone ?? '—'} | {employee.isActive ? 'Active' : 'Deactivated'}
          </li>
        ))}
      </ul>
    </div>
  )
}
