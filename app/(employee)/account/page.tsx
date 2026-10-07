import Link from 'next/link'
import { logout } from '@/app/(public)/login/actions'
import { requireRole } from '@/lib/auth'

export default async function AccountPage() {
  const user = await requireRole('employee')

  return (
    <div>
      <h1 className="text-h1">My account</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <p>
        <Link href="/account/settings">Change password</Link>
      </p>

      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </div>
  )
}
