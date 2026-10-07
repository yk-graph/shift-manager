'use client'

import { useRouter } from 'next/navigation'
import { EditShift } from '../../_components/timesheets'

export default function ShiftDetailPage() {
  const router = useRouter()

  function handleSaveShiftEdit() {
    // Backend hook: save edited shift and append a change-log entry.
    router.push('/admin/timesheets')
  }

  return <EditShift onBack={() => router.push('/admin/timesheets')} onSaveShiftEdit={handleSaveShiftEdit} />
}
