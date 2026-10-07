'use client'

import { useRouter } from 'next/navigation'
import { Timesheets } from '../_components/timesheets'
import { employees, shifts } from '../_lib/mock-data'

export default function AdminTimesheetsPage() {
  const router = useRouter()

  return (
    <Timesheets
      employees={employees}
      shifts={shifts}
      onEditShift={(shiftId) => {
        router.push(`/admin/shifts/${shiftId}`)
      }}
    />
  )
}
