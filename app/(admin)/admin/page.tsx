import { requireRole } from '@/lib/auth'
import { formatLongDate } from '@/lib/format'
import { Dashboard } from './_components/dashboard'
import { getDashboardData } from '@/lib/admin-data'

export default async function AdminDashboardPage() {
  const admin = await requireRole('admin')
  const { clockedIn, hoursThisWeek } = await getDashboardData()

  return (
    <Dashboard
      adminName={admin.name}
      today={formatLongDate(new Date())}
      clockedIn={clockedIn}
      hoursThisWeek={hoursThisWeek}
    />
  )
}
