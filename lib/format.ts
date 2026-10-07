import { TIMEZONE } from '@/lib/time'

// Small helpers to turn dates and numbers into text for the UI.
// Everything is shown in Vancouver time.

// "9:02 AM"
export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { timeZone: TIMEZONE, hour: 'numeric', minute: '2-digit' })
}

// "Mon, Sep 28"
export function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { timeZone: TIMEZONE, weekday: 'short', month: 'short', day: 'numeric' })
}

// "Oct 3, 2026"
export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { timeZone: TIMEZONE, month: 'short', day: 'numeric', year: 'numeric' })
}

// "Saturday, October 3, 2026"
export function formatLongDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// "2026-10-03" — handy to group shifts by day.
export function dayKey(date: Date) {
  return date.toLocaleDateString('en-CA', { timeZone: TIMEZONE })
}

// 22.68 → "22h 41m"
export function formatHours(hours: number) {
  const totalMinutes = Math.round(hours * 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h}h ${String(m).padStart(2, '0')}m`
}

// Length of a shift. If it's still open, counts until now.
export function formatDuration(clockIn: Date, clockOut: Date | null) {
  const end = clockOut ?? new Date()
  return formatHours((end.getTime() - clockIn.getTime()) / 3600000)
}

// Week from getWeekRange() → "Sep 28 – Oct 4, 2026"
export function formatWeekRange(start: Date, end: Date) {
  const lastDay = new Date(end.getTime() - 1)
  const first = start.toLocaleDateString('en-US', { timeZone: TIMEZONE, month: 'short', day: 'numeric' })
  return `${first} – ${formatDate(lastDay)}`
}

// "MS" for "Maria Santos"
export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Describes what an admin changed, e.g. "Clock-out: — → 5:00 PM"
export function describeChange(change: {
  oldClockIn: Date
  newClockIn: Date
  oldClockOut: Date | null
  newClockOut: Date | null
}) {
  const parts = []
  if (change.oldClockIn.getTime() !== change.newClockIn.getTime()) {
    parts.push(`Clock-in: ${formatTime(change.oldClockIn)} → ${formatTime(change.newClockIn)}`)
  }
  if (change.oldClockOut?.getTime() !== change.newClockOut?.getTime()) {
    const oldOut = change.oldClockOut ? formatTime(change.oldClockOut) : '—'
    const newOut = change.newClockOut ? formatTime(change.newClockOut) : '—'
    parts.push(`Clock-out: ${oldOut} → ${newOut}`)
  }
  return parts.join(' · ') || 'No time change'
}
