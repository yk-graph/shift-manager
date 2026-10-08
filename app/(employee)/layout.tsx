import Link from 'next/link'
import { logout } from '@/app/(public)/login/actions'
import { requireRole } from '@/lib/auth'

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
  await requireRole('employee')

  return (
    <>
      {/* Simple navigation; the frontend team can restyle or replace it. */}
      <nav className="flex gap-4 px-5 py-3 text-sm">
        <Link href="/clock">Clock</Link>
        <Link href="/timesheet">Timesheet</Link>
        <Link href="/account">Account</Link>
        <form action={logout}>
          <button type="submit">Log out</button>
        </form>
      </nav>
      {children}
    </>
  )
}
