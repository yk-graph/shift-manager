import type { ChangeLogEntry } from '../_lib/types'
import { Icon, PageTitle } from './ui'

export function ChangeLog({ entries }: { entries: ChangeLogEntry[] }) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <PageTitle title="Change log" subtitle="Every shift an admin closed or edited — who, when, and why." />

      <div className="mt-7 hidden overflow-hidden rounded-xl border border-border-default bg-bg-surface lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border-default text-left text-sm text-text-secondary">
              <th className="px-6 py-5 font-bold">When</th>
              <th className="px-6 py-5 font-bold">Admin</th>
              <th className="px-6 py-5 font-bold">Employee</th>
              <th className="px-6 py-5 font-bold">Shift</th>
              <th className="px-6 py-5 font-bold">Change</th>
              <th className="px-6 py-5 font-bold">Reason</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={`${entry.when}-${entry.employee}`} className="border-b border-border-default last:border-b-0">
                <td className="px-6 py-5">
                  <p className="font-bold">{entry.when}</p>
                  <p className="mt-1 text-sm text-text-secondary">{entry.time}</p>
                </td>
                <td className="px-6 py-5">{entry.admin}</td>
                <td className="px-6 py-5">{entry.employee}</td>
                <td className="px-6 py-5">
                  <p className="font-bold">{entry.shift}</p>
                  <p className="mt-1 text-sm text-text-secondary">{entry.branch}</p>
                </td>
                <td className="px-6 py-5">{entry.change}</td>
                <td className="px-6 py-5">
                  <span className="rounded-full bg-bg-subtle px-3 py-1 text-sm">{entry.reason}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-4 lg:hidden">
        {entries.slice(0, 4).map((entry) => (
          <article
            key={`${entry.when}-${entry.employee}`}
            className="rounded-xl border border-border-default bg-bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{entry.employee}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {entry.shift} · {entry.branch.split(' · ')[0]}
                </p>
              </div>
              <p className="shrink-0 text-sm text-text-secondary">
                {entry.when.split(', ')[0]}, {entry.time}
              </p>
            </div>
            <p className="mt-3 text-lg font-medium">{entry.change}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-bg-subtle px-3 py-1 text-sm">{entry.reason}</span>
              <span className="text-sm text-text-secondary">by {entry.admin}</span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
        <Icon name="lock" className="size-4" />
        Read-only. Entries are added automatically when an admin saves a change and can&apos;t be edited or deleted.
      </p>
    </section>
  )
}
