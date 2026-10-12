import { CLOCK_IN_OPENS, CLOCK_OUT_CLOSES, EARLIEST_CLOCK_IN_HOUR, LATEST_CLOCK_OUT_HOUR } from '@/lib/clock-rules'
import { prisma } from '@/lib/prisma'
import { vancouverHour } from '@/lib/time'

// These functions throw an Error with a friendly message when a rule is broken.
// Server actions catch it and show the message to the user.
// Always pass the id of the logged-in user (never trust an id sent by the browser).

export async function clockIn(userId: string, branchId: number) {
  const now = new Date()

  // If the current time is before the earliest clock-in time, throw an error.
  if (vancouverHour(now) < EARLIEST_CLOCK_IN_HOUR) {
    throw new Error(`You cannot clock in before ${CLOCK_IN_OPENS}.`)
  }

  // If the user is already clocked in, throw an error.
  const openShift = await prisma.shift.findFirst({ where: { userId, clockOut: null } })
  if (openShift) {
    throw new Error('You are already clocked in.')
  }

  // Create a new shift for the user.
  return prisma.shift.create({
    data: { userId, branchId, clockIn: now },
  })
}

export async function clockOut(userId: string) {
  const now = new Date()

  // If the user is not clocked in, throw an error.
  const openShift = await prisma.shift.findFirst({ where: { userId, clockOut: null } })
  if (!openShift) {
    throw new Error('You are not clocked in.')
  }

  // If the current time is after the latest clock-out time, throw an error.
  if (vancouverHour(now) >= LATEST_CLOCK_OUT_HOUR) {
    throw new Error(`It is after ${CLOCK_OUT_CLOSES}. Please ask an admin to clock you out.`)
  }

  // If the clock-out time is before the clock-in time, throw an error.
  if (now <= openShift.clockIn) {
    throw new Error('Clock-out must be after clock-in.')
  }

  // Update the shift to clock-out.
  return prisma.shift.update({
    where: { id: openShift.id },
    data: { clockOut: now },
  })
}

// Admin only: close an open shift or fix the times of an existing one.
// Every change is saved in the shift_changes table (who, when, why).
export async function updateShift(
  adminId: string,
  shiftId: string,
  newClockIn: Date,
  newClockOut: Date | null,
  reason?: string,
) {
  const shift = await prisma.shift.findUnique({ where: { id: shiftId } })

  // If the shift is not found, throw an error.
  if (!shift) {
    throw new Error('Shift not found.')
  }

  // If the clock-out time is before the clock-in time, throw an error.
  if (newClockOut && newClockOut <= newClockIn) {
    throw new Error('Clock-out must be after clock-in.')
  }

  // A transaction makes both writes succeed or both fail together.
  const [updatedShift] = await prisma.$transaction([
    prisma.shift.update({
      where: { id: shiftId },
      data: { clockIn: newClockIn, clockOut: newClockOut },
    }),
    prisma.shiftChange.create({
      data: {
        shiftId,
        changedById: adminId,
        oldClockIn: shift.clockIn,
        newClockIn,
        oldClockOut: shift.clockOut,
        newClockOut,
        reason: reason || undefined, // empty → database default "Forgot to clock out"
      },
    }),
  ])

  return updatedShift
}
