import type { Employee, Shift } from '../_lib/types'
import { BackButton, Button, Field, PageTitle, Pill } from './ui'

export function Employees({
  employees,
  onAdd,
  onDetails,
  onDeactivate,
}: {
  employees: Employee[]
  onAdd: () => void
  onDetails: (employeeId: number) => void
  onDeactivate: (employeeId: number) => void
}) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle title="Employees" subtitle="6 people · 5 active" />
        <Button onClick={onAdd} className="w-full lg:w-auto">
          + Add employee
        </Button>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-[#292524] px-4 py-2 text-sm font-bold text-white">All (6)</span>
        <span className="rounded-full border border-[#e4e0dc] bg-white px-4 py-2 text-sm font-bold text-[#77716d]">
          Active (5)
        </span>
        <span className="rounded-full border border-[#e4e0dc] bg-white px-4 py-2 text-sm font-bold text-[#77716d]">
          Deactivated (1)
        </span>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#e4e0dc] bg-white lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e4e0dc] text-left text-sm text-[#77716d]">
              <th className="px-6 py-5 font-bold">Name</th>
              <th className="px-6 py-5 font-bold">Email</th>
              <th className="px-6 py-5 font-bold">Phone</th>
              <th className="px-6 py-5 font-bold">Status</th>
              <th className="px-6 py-5 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-[#e4e0dc] last:border-b-0">
                <td className="px-6 py-5 font-bold">{employee.name}</td>
                <td className="px-6 py-5">{employee.email}</td>
                <td className="px-6 py-5">{employee.phone ?? '—'}</td>
                <td className="px-6 py-5">
                  <Pill tone={employee.status === 'Active' ? 'green' : 'gray'}>{employee.status}</Pill>
                </td>
                <td className="px-6 py-5 text-right">
                  <button onClick={() => onDetails(employee.id)} className="mr-4 text-sm text-[#625c58]">
                    Details
                  </button>
                  <Button variant="secondary" className="h-9 px-4 text-sm" onClick={() => onDeactivate(employee.id)}>
                    {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-4 lg:hidden">
        {employees.map((employee) => (
          <article key={employee.id} className="rounded-xl border border-[#e4e0dc] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{employee.name}</h3>
                <p className="mt-1 text-sm text-[#77716d]">{employee.email}</p>
              </div>
              <Pill tone={employee.status === 'Active' ? 'green' : 'gray'}>{employee.status}</Pill>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button onClick={() => onDetails(employee.id)} className="text-sm text-[#625c58]">
                Details
              </button>
              <Button variant="secondary" className="h-9 px-4 text-sm" onClick={() => onDeactivate(employee.id)}>
                {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AddEmployee({ onBack, onCreateEmployee }: { onBack: () => void; onCreateEmployee: () => void }) {
  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Employees" onClick={onBack} />
      <PageTitle title="Add employee" subtitle="They’ll log in with this email and password." />

      <form className="mt-7 max-w-[640px] rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-[#e4e0dc] lg:bg-white lg:p-9">
        <Field label="Full name" placeholder="e.g. Kenji Watanabe" />
        <Field label="Email (login)" defaultValue="kenji@abcdumplings.ca" />
        <Field label="Phone number (optional)" placeholder="(604) 555-0000" />
        <Field label="Password" defaultValue="••••••••••" icon="eye" />

        <p className="mt-3 text-sm text-[#77716d] lg:hidden">
          Share it with them in person. They can change it in Account settings.
        </p>
        <div className="mt-4 rounded-lg bg-[#f7f6f5] p-4 text-sm text-[#77716d] lg:hidden">
          <p className="font-bold text-[#292524]">Role: Employee</p>
          <p className="mt-1">Admins are created by the seed script only.</p>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 lg:flex-row lg:justify-end">
          <Button variant="secondary" className="w-full lg:w-auto" onClick={onBack}>
            Cancel
          </Button>
          <Button className="w-full lg:w-auto" onClick={onCreateEmployee}>
            Create account
          </Button>
        </div>
      </form>
    </section>
  )
}

export function EmployeeDetail({
  employee,
  shifts,
  onBack,
  onClockOut,
  onDeactivate,
}: {
  employee: Employee
  shifts: Shift[]
  onBack: () => void
  onClockOut: (employeeId: number) => void
  onDeactivate: (employeeId: number) => void
}) {
  const employeeShifts = shifts
    .filter((shift) => shift.employeeId === employee.id)
    .slice(-5)
    .reverse()

  return (
    <section className="mx-auto max-w-[1104px]">
      <BackButton label="Employees" onClick={onBack} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle
          title={employee.name}
          subtitle={`${employee.email}${employee.phone ? ` · ${employee.phone}` : ''}`}
        />
        <div className="grid grid-cols-2 gap-3 lg:flex">
          <Button variant="secondary" onClick={() => onDeactivate(employee.id)}>
            Deactivate
          </Button>
          <Button variant="dark" onClick={() => onClockOut(employee.id)}>
            Clock out now
          </Button>
        </div>
      </div>

      <div className="mt-7 rounded-none border-0 bg-transparent lg:rounded-xl lg:border lg:border-[#e4e0dc] lg:bg-white lg:p-7">
        <h2 className="text-xl font-bold lg:text-2xl">Shifts · Sep 28 – Oct 4 · Total 31h 45m</h2>

        <div className="mt-4 hidden lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e4e0dc] text-left text-sm text-[#77716d]">
                <th className="py-5 font-bold">Date</th>
                <th className="py-5 font-bold">Clock in</th>
                <th className="py-5 font-bold">Clock out</th>
                <th className="py-5 font-bold">Duration</th>
                <th className="py-5" />
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => (
                <tr key={shift.id} className="border-b border-[#e4e0dc] last:border-b-0">
                  <td className="py-5 font-bold">{shift.day}</td>
                  <td className="py-5">{shift.clockIn}</td>
                  <td className="py-5">{shift.isOpen ? <Pill tone="amber">Open</Pill> : shift.clockOut}</td>
                  <td className="py-5">{shift.isOpen ? '—' : shift.duration}</td>
                  <td className="py-5 text-right text-sm text-[#625c58]">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 lg:hidden">
          {employeeShifts.slice(0, 3).map((shift) => (
            <article key={shift.id} className="rounded-xl border border-[#e4e0dc] bg-white p-4">
              <div className="flex justify-between gap-3 text-sm text-[#77716d]">
                <span>
                  {shift.day} · {shift.branch}
                </span>
                <span>Edit</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-lg font-medium">
                  {shift.clockIn} – {shift.clockOut}
                </p>
                {shift.isOpen ? <Pill tone="amber">Open</Pill> : <p className="font-bold">{shift.duration}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
