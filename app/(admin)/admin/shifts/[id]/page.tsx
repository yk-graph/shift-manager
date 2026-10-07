import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { EditShift } from '../../_components/timesheets'
import { getShiftToEdit } from '@/lib/admin-data'

export default async function ShiftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('admin')
  const { id } = await params
  const shift = await getShiftToEdit(id)
  if (!shift) notFound()

  return <EditShift shift={shift} />
}
