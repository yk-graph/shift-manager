import { requireRole } from '@/lib/auth'
import { getTimesheet } from '@/lib/queries'
import { formatDateTime } from '@/lib/time'

export default async function TimesheetPage() {
  const user = await requireRole('employee')
  const weeks = await getTimesheet(user.id)

  return (
    <div>
      <h1 className="text-h1">Timesheet</h1>

      {weeks.map((week) => (
        <div key={week.weekStart.toISOString()}>
          <h2>
            Week of {formatDateTime(week.weekStart)} — total {week.totalHours.toFixed(2)} h
          </h2>
          <ul>
            {week.shifts.map((shift) => (
              <li key={shift.id}>
                {formatDateTime(shift.clockIn)} → {formatDateTime(shift.clockOut)} | {shift.branch.name}
                {shift._count.changes > 0 && ' | Changed by admin'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
