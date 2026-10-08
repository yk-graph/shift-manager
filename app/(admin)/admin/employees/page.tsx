import { requireRole } from '@/lib/auth'
import { Employees } from '../_components/employees'
import { getEmployeeList } from '@/lib/admin-data'

export default async function EmployeesPage() {
  await requireRole('admin')
  const employees = await getEmployeeList()

  return <Employees employees={employees} />
}
