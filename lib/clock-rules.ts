// Clock rules (Vancouver time). Change them here and the server checks
// and the text on the clock page both update.
// No database code in this file, so client components can import it too.

export const EARLIEST_CLOCK_IN_HOUR = 8 // 8:00 AM
export const LATEST_CLOCK_OUT_HOUR = 21 // 9:00 PM

// 17 → "5:00 PM"
export function formatHour(hour: number) {
  const period = hour < 12 ? 'AM' : 'PM'
  const h = hour % 12 === 0 ? 12 : hour % 12
  return `${h}:00 ${period}`
}

export const CLOCK_IN_OPENS = formatHour(EARLIEST_CLOCK_IN_HOUR)
export const CLOCK_OUT_CLOSES = formatHour(LATEST_CLOCK_OUT_HOUR)
