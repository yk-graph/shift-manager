// The whole company uses Vancouver time.
export const TIMEZONE = 'America/Vancouver'

// Returns the hour (0-23) of a date in Vancouver time.
export function vancouverHour(date: Date) {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(date)
  return Number(hour)
}

// Builds a Date from a Vancouver day and time.
// vancouverDateTime('2026-10-02', '17:00') → Oct 2, 2026 at 5:00 PM Vancouver time.
export function vancouverDateTime(day: string, time: string) {
  const noon = new Date(`${day}T12:00:00Z`)
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, timeZoneName: 'longOffset' })
    .formatToParts(noon)
    .find((part) => part.type === 'timeZoneName')!
    .value.replace('GMT', '') // "-07:00"
  return new Date(`${day}T${time}:00${offset}`)
}
