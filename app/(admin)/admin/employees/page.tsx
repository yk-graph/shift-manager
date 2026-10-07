'use client'

import { Employees } from '../_components/employees'
import { employees } from '../_lib/mock-data'

export default function EmployeesPage() {
  function handleDeactivateEmployee(employeeId: number) {
    // Backend hook: deactivate/reactivate employee, then refresh employee list.
    void employeeId
  }

  return <Employees employees={employees} onDeactivate={handleDeactivateEmployee} />
}
