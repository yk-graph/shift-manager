import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { EmployeeDetail } from '../../_components/employees'
import { getEmployeeDetailData } from '@/lib/admin-data'

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('admin')
  const { id } = await params
  const data = await getEmployeeDetailData(id)
  if (!data) notFound()

  return (
    <EmployeeDetail
      employee={data.employee}
      shifts={data.shifts}
      weekLabel={data.weekLabel}
      total={data.total}
      openShift={data.openShift}
    />
  )
}
