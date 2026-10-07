'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ClockOutModal } from '../../_components/clock-out-modal'
import { EmployeeDetail } from '../../_components/employees'
import { employees, shifts } from '../../_lib/mock-data'

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const employee = employees.find((item) => item.id === Number(params.id)) ?? employees[0]
  const [clockOutEmployeeId, setClockOutEmployeeId] = useState<number | null>(null)
  const clockOutEmployee =
    clockOutEmployeeId === null ? null : (employees.find((item) => item.id === clockOutEmployeeId) ?? employee)

  function handleDeactivateEmployee(employeeId: number) {
    // Backend hook: deactivate/reactivate employee, then refresh employee detail.
    void employeeId
  }

  function handleSaveClockOut(employeeId: number) {
    // Backend hook: close open shift and append a change-log entry.
    void employeeId
    setClockOutEmployeeId(null)
  }

  return (
    <>
      <EmployeeDetail
        employee={employee}
        shifts={shifts}
        onBack={() => router.push('/admin/employees')}
        onClockOut={setClockOutEmployeeId}
        onDeactivate={handleDeactivateEmployee}
      />
      {clockOutEmployee && (
        <ClockOutModal
          employee={clockOutEmployee}
          onCancel={() => setClockOutEmployeeId(null)}
          onSaveClockOut={handleSaveClockOut}
        />
      )}
    </>
  )
}
