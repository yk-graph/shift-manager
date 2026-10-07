'use client'

import { useRouter } from 'next/navigation'
import { AddEmployee } from '../../_components/employees'

export default function NewEmployeePage() {
  const router = useRouter()

  function handleCreateEmployee() {
    // Backend hook: create employee, then route back to the employee list.
    router.push('/admin/employees')
  }

  return <AddEmployee onBack={() => router.push('/admin/employees')} onCreateEmployee={handleCreateEmployee} />
}
