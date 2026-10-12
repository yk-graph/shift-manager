import { requireRole } from '@/lib/auth'
import { EmployeeShell } from './_components/employee-shell'

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const employee = await requireRole('employee')

  return <EmployeeShell employeeName={employee.name}>{children}</EmployeeShell>
}
