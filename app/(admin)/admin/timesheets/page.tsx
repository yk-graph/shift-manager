import { requireRole } from '@/lib/auth'
import { Timesheets } from '../_components/timesheets'
import { getTimesheetData } from '@/lib/admin-data'

// ?week=0 is this week, ?week=1 is last week, ...
export default async function AdminTimesheetsPage({ searchParams }: { searchParams: Promise<{ week?: string }> }) {
  await requireRole('admin')
  const { week } = await searchParams
  const weeksAgo = Number(week) || 0
  const data = await getTimesheetData(weeksAgo)

  return (
    <Timesheets
      days={data.days}
      weekLabel={data.weekLabel}
      total={data.total}
      people={data.people}
      weeksAgo={weeksAgo}
    />
  )
}
