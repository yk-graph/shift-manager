'use client'

import { useState } from 'react'
import { AdminShell } from './_components/admin-shell'
import { ChangeLog } from './_components/change-log'
import { ClockOutModal } from './_components/clock-out-modal'
import { Dashboard } from './_components/dashboard'
import { AddEmployee, EmployeeDetail, Employees } from './_components/employees'
import { EditShift, Timesheets } from './_components/timesheets'
import { changeLog, clockedIn, employees, shifts } from './_lib/mock-data'
import type { AdminView } from './_lib/types'

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('dashboard')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(5)
  const [clockOutEmployeeId, setClockOutEmployeeId] = useState<number | null>(null)

  function navigate(nextView: AdminView) {
    setView(nextView)
  }

  function handleAddEmployee() {
    navigate('employees')
  }

  function handleDeactivateEmployee(employeeId: number) {
    // Backend hook: deactivate/reactivate employee, then refresh employee list.
    void employeeId
  }

  function handleSaveShiftEdit() {
    // Backend hook: save edited shift and append a change-log entry.
    navigate('timesheets')
  }

  function handleSaveClockOut(employeeId: number) {
    // Backend hook: close open shift and append a change-log entry.
    void employeeId
    setClockOutEmployeeId(null)
  }

  const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0]
  const clockOutEmployee =
    clockOutEmployeeId === null
      ? null
      : (employees.find((employee) => employee.id === clockOutEmployeeId) ?? selectedEmployee)

  const content = {
    dashboard: <Dashboard employees={employees} clockedIn={clockedIn} onClockOut={setClockOutEmployeeId} />,
    employees: (
      <Employees
        employees={employees}
        onAdd={() => navigate('addEmployee')}
        onDeactivate={handleDeactivateEmployee}
        onDetails={(employeeId) => {
          setSelectedEmployeeId(employeeId)
          navigate('employeeDetail')
        }}
      />
    ),
    addEmployee: <AddEmployee onBack={() => navigate('employees')} onCreateEmployee={handleAddEmployee} />,
    employeeDetail: (
      <EmployeeDetail
        employee={selectedEmployee}
        shifts={shifts}
        onBack={() => navigate('employees')}
        onClockOut={setClockOutEmployeeId}
        onDeactivate={handleDeactivateEmployee}
      />
    ),
    timesheets: <Timesheets employees={employees} shifts={shifts} onEditShift={() => navigate('editShift')} />,
    editShift: <EditShift onBack={() => navigate('timesheets')} onSaveShiftEdit={handleSaveShiftEdit} />,
    changeLog: <ChangeLog entries={changeLog} />,
  }[view]

  return (
    <AdminShell activeView={view} onNavigate={navigate}>
      {content}
      {clockOutEmployee && (
        <ClockOutModal
          employee={clockOutEmployee}
          onCancel={() => setClockOutEmployeeId(null)}
          onSaveClockOut={handleSaveClockOut}
        />
      )}
    </AdminShell>
  )
}
