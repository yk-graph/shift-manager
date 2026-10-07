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
