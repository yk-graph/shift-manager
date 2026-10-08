import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { formatHours, formatLongDate, formatTime, formatWeekRange } from '@/lib/format'
import { getBranches, getOpenShift, getShiftsForEmployee, getTotalHours, getWeekRange } from '@/lib/queries'
import ClockCard from './clock-card'

export default async function ClockPage() {
  const user = await requireRole('employee')
  const branches = await getBranches()
  const openShift = await getOpenShift(user.id)

  const { start, end } = await getWeekRange()
  const weekShifts = await getShiftsForEmployee(user.id, start, end)
  const weekHours = await getTotalHours(start, end, user.id)
  const branchCount = new Set(weekShifts.map((shift) => shift.branchId)).size

  return (
    <div className="max-w-[1120px] mx-auto px-5 sm:px-[56px] pt-0 pb-0 space-y-[28px]">
      {/* Header Greeting Section */}
      <div>
        <h1 className="text-h1 text-text-primary">Hi {user.name.split(' ')[0]}</h1>
        <p className="text-body text-text-secondary mt-1">{formatLongDate(new Date())}</p>
      </div>

      {/* Dashboard Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[724px_340px] gap-6 items-start">
        {/* Left Main Card: Clock Control Panel */}
        <ClockCard
          branches={branches.map((branch) => ({ id: branch.id, name: branch.name, address: branch.address }))}
          openShift={
            openShift
              ? {
                  branchName: openShift.branch.name,
                  clockIn: openShift.clockIn.toISOString(),
                  since: formatTime(openShift.clockIn),
                }
              : null
          }
        />

        {/* Right Summary Card: Weekly Work Stats */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-6 sm:p-[28px_32px] shadow-sm space-y-4">
          <p className="text-caption text-text-secondary uppercase tracking-wider font-semibold">
            This week · {formatWeekRange(start, end)}
          </p>
          <div className="space-y-1">
            <p className="text-stat text-text-primary">{formatHours(weekHours)}</p>
            <p className="text-body-sm text-text-secondary">
              {weekShifts.length} shifts · {branchCount} branches
            </p>
          </div>
          <div className="pt-2 border-t border-border-default">
            <Link
              href="/timesheet"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800 transition"
            >
              Open timesheet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
