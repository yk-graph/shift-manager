'use client'

import { useState } from 'react'
import { ClockOutModal } from './_components/clock-out-modal'
import { Dashboard } from './_components/dashboard'
import { clockedIn, employees } from './_lib/mock-data'

export default function AdminDashboardPage() {
  const [clockOutEmployeeId, setClockOutEmployeeId] = useState<number | null>(null)
  const clockOutEmployee =
    clockOutEmployeeId === null
      ? null
      : (employees.find((employee) => employee.id === clockOutEmployeeId) ?? employees[0])

  function handleSaveClockOut(employeeId: number) {
    // Backend hook: close open shift and append a change-log entry.
    void employeeId
    setClockOutEmployeeId(null)
  }

  return (
    <>
      <Dashboard employees={employees} clockedIn={clockedIn} onClockOut={setClockOutEmployeeId} />
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
