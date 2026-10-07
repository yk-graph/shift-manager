import type { ClockedIn, Employee } from '../_lib/types'
import { Button, PageTitle, Pill } from './ui'

export function Dashboard({
  employees,
  clockedIn,
  onClockOut,
}: {
  employees: Employee[]
  clockedIn: ClockedIn[]
  onClockOut: (employeeId: number) => void
}) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <PageTitle title="Hi Daniel" subtitle="Saturday, October 3, 2026" />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:mt-8 lg:gap-5">
        <div className="rounded-xl border border-[#e4e0dc] bg-white p-3 lg:p-7">
          <p className="text-sm text-[#77716d] lg:text-base">On the clock now</p>
          <p className="mt-2 text-2xl font-bold text-[#15803d] lg:text-[40px]">7</p>
        </div>
        <div className="rounded-xl border border-[#e4e0dc] bg-white p-3 lg:p-7">
          <p className="text-sm text-[#77716d] lg:text-base">Hours this week</p>
          <p className="mt-2 text-2xl font-bold lg:text-[40px]">612h 40m</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#e4e0dc] bg-white p-0 lg:mt-7 lg:p-7">
        <h2 className="px-4 pt-5 font-serif text-2xl font-bold lg:px-0 lg:pt-0 lg:text-[28px]">
          Who&apos;s clocked in right now
        </h2>

        <div className="mt-4 hidden lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e4e0dc] text-left text-sm text-[#77716d]">
                <th className="py-5 font-bold">Employee</th>
                <th className="py-5 font-bold">Clocked in at</th>
                <th className="py-5 font-bold">Since</th>
                <th className="py-5 font-bold">Time Count</th>
                <th className="py-5" />
              </tr>
            </thead>
            <tbody>
              {clockedIn.map((entry) => {
                const employee = employees.find((item) => item.id === entry.employeeId)!
                return (
                  <tr key={entry.employeeId} className="border-b border-[#e4e0dc] last:border-b-0">
                    <td className="py-6 font-bold">{employee.name}</td>
                    <td className="py-6">{entry.branch}</td>
                    <td className="py-6">{entry.since}</td>
                    <td className="py-6">
                      <Pill tone={entry.late ? 'amber' : 'green'}>{entry.duration}</Pill>
                    </td>
                    <td className="py-6 text-right">
                      <Button variant="secondary" className="h-10 px-4" onClick={() => onClockOut(employee.id)}>
                        Clock out
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 divide-y divide-[#e4e0dc] lg:hidden">
          {clockedIn.map((entry) => {
            const employee = employees.find((item) => item.id === entry.employeeId)!
            return (
              <article key={entry.employeeId} className="mx-4 mb-4 rounded-xl border border-[#e4e0dc] p-4 last:mb-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{employee.name}</h3>
                    <p className="mt-1 text-sm text-[#77716d]">
                      {entry.branch} · since {entry.since}
                    </p>
                  </div>
                  <Button variant="secondary" className="h-9 px-3 text-sm" onClick={() => onClockOut(employee.id)}>
                    Clock out
                  </Button>
                </div>
                <div className="mt-4">
                  <Pill tone={entry.late ? 'amber' : 'green'}>{entry.duration}</Pill>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
