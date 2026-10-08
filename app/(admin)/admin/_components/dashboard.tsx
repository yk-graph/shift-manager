'use client'

import { useState } from 'react'
import type { ClockedIn } from '@/lib/admin-types'
import { ClockOutModal } from './clock-out-modal'
import { Button, PageTitle, Pill } from './ui'

export function Dashboard({
  adminName,
  today,
  clockedIn,
  hoursThisWeek,
}: {
  adminName: string
  today: string
  clockedIn: ClockedIn[]
  hoursThisWeek: string
}) {
  const [clockOutShift, setClockOutShift] = useState<ClockedIn | null>(null)

  return (
    <section className="mx-auto max-w-[1104px]">
      <PageTitle title={`Hi ${adminName.split(' ')[0]}`} subtitle={today} />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:mt-8 lg:gap-5">
        <div className="rounded-xl border border-border-default bg-bg-surface p-3 lg:p-7">
          <p className="text-sm text-text-secondary lg:text-base">On the clock now</p>
          <p className="mt-2 text-2xl font-bold text-status-success lg:text-[40px]">{clockedIn.length}</p>
        </div>
        <div className="rounded-xl border border-border-default bg-bg-surface p-3 lg:p-7">
          <p className="text-sm text-text-secondary lg:text-base">Hours this week</p>
          <p className="mt-2 text-2xl font-bold lg:text-[40px]">{hoursThisWeek}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border-default bg-bg-surface p-0 lg:mt-7 lg:p-7">
        <h2 className="px-4 pt-5 font-serif text-2xl font-bold lg:px-0 lg:pt-0 lg:text-[28px]">
          Who&apos;s clocked in right now
        </h2>

        <div className="mt-4 hidden lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-default text-left text-sm text-text-secondary">
                <th className="py-5 font-bold">Employee</th>
                <th className="py-5 font-bold">Clocked in at</th>
                <th className="py-5 font-bold">Since</th>
                <th className="py-5 font-bold">Time Count</th>
                <th className="py-5" />
              </tr>
            </thead>
            <tbody>
              {clockedIn.map((entry) => (
                <tr key={entry.shiftId} className="border-b border-border-default last:border-b-0">
                  <td className="py-6 font-bold">{entry.employeeName}</td>
                  <td className="py-6">{entry.branch}</td>
                  <td className="py-6">{entry.since}</td>
                  <td className="py-6">
                    <Pill tone={entry.late ? 'amber' : 'green'}>{entry.duration}</Pill>
                  </td>
                  <td className="py-6 text-right">
                    <Button variant="secondary" className="h-10 px-4" onClick={() => setClockOutShift(entry)}>
                      Clock out
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 divide-y divide-border-default lg:hidden">
          {clockedIn.map((entry) => (
            <article key={entry.shiftId} className="mx-4 mb-4 rounded-xl border border-border-default p-4 last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{entry.employeeName}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {entry.branch} · since {entry.since}
                  </p>
                </div>
                <Button variant="secondary" className="h-9 px-3 text-sm" onClick={() => setClockOutShift(entry)}>
                  Clock out
                </Button>
              </div>
              <div className="mt-4">
                <Pill tone={entry.late ? 'amber' : 'green'}>{entry.duration}</Pill>
              </div>
            </article>
          ))}
        </div>
      </div>

      {clockOutShift && <ClockOutModal shift={clockOutShift} onClose={() => setClockOutShift(null)} />}
    </section>
  )
}
