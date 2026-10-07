import { requireRole } from '@/lib/auth'
import { AddEmployee } from '../../_components/employees'

export default async function NewEmployeePage() {
  await requireRole('admin')
  return <AddEmployee />
}
