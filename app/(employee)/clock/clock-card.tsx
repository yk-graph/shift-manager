'use client'

import { useActionState, useEffect, useState } from 'react'
import { CLOCK_IN_OPENS, CLOCK_OUT_CLOSES } from '@/lib/clock-rules'
import { clockInAction, clockOutAction } from './actions'

type Props = {
  branches: { id: number; name: string; address: string }[]
  openShift: { branchName: string; clockIn: string; since: string } | null
}

// Turns milliseconds into "03:27:14"
function formatTimer(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function ClockCard({ branches, openShift }: Props) {
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id)
  const [clockInState, clockIn, clockInPending] = useActionState(clockInAction, {})
  const [clockOutState, clockOut, clockOutPending] = useActionState(clockOutAction, {})

  // Ticks every second so the timer keeps running.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const selectedBranch = branches.find((branch) => branch.id === selectedBranchId)
  const error = clockInState.error || clockOutState.error

  return (
    <div className="bg-bg-surface border border-border-default rounded-2xl p-6 sm:p-[28px_32px] shadow-sm space-y-6">
      {openShift ? (
        <div className="space-y-6 text-center py-2 sm:py-4">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mx-auto">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            Clocked in at {openShift.branchName}
          </div>

          {/* Timer & Subtitle */}
          <div className="space-y-1">
            <p className="text-4xl sm:text-timer text-text-primary tracking-tight font-bold">
              {now ? formatTimer(now - new Date(openShift.clockIn).getTime()) : '--:--:--'}
            </p>
            <p className="text-body-sm text-text-secondary">Since {openShift.since}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2 max-w-[500px] mx-auto w-full">
            <button
              type="button"
              disabled
              className="w-full bg-stone-200 text-stone-400 font-medium py-3.5 rounded-xl cursor-not-allowed text-base"
            >
              Clock in
            </button>
            <form action={clockOut}>
              <button
                type="submit"
                disabled={clockOutPending}
                className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3.5 rounded-xl transition shadow-sm text-base"
              >
                Clock out
              </button>
            </form>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="text-caption text-text-secondary">
            You can clock out until {CLOCK_OUT_CLOSES}. After that, a manager will close your shift.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
            Clocked out
          </div>

          {/* Prompt Question */}
          <h2 className="text-title-md text-text-primary">Where are you working today?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {branches.map((branch) => {
              const isSelected = branch.id === selectedBranchId
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'border-orange-700 bg-orange-50/20'
                      : 'border-border-default hover:border-stone-300 bg-bg-surface'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-title-md text-text-primary">{branch.name}</p>
                    <p className="text-body-sm text-text-secondary">{branch.address}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-orange-700 bg-orange-700' : 'border-stone-300'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <form action={clockIn}>
              <input type="hidden" name="branchId" value={selectedBranchId ?? ''} />
              <button
                type="submit"
                disabled={clockInPending}
                className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3.5 rounded-xl transition shadow-sm text-base"
              >
                Clock in at {selectedBranch?.name}
              </button>
            </form>
            <button
              type="button"
              disabled
              className="w-full bg-stone-200 text-stone-400 font-medium py-3.5 rounded-xl cursor-not-allowed text-base"
            >
              Clock out
            </button>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Helper Caption */}
          <p className="text-caption text-text-secondary text-center">Clock-in opens at {CLOCK_IN_OPENS}.</p>
        </div>
      )}
    </div>
  )
}
