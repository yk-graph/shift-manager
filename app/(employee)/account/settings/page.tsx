import { requireRole } from '@/lib/auth'
import PasswordForm from './password-form'

export default async function AccountSettingsPage() {
  await requireRole('employee')

  return (
    <div>
      <h1 className="text-h1">Account settings</h1>
      <h2>Change password</h2>
      <PasswordForm />
    </div>
  )
}
