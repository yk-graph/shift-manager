import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { PageTitle, Icon } from '../../../(admin)/admin/_components/ui'
import PasswordForm from './password-form'

export default async function AccountSettingsPage() {
  const user = (await requireRole('employee')) as {
    name: string
    email: string
    role?: string
    phone?: string
  }

  return (
    <div className="max-w-[1120px] mx-auto px-5 sm:px-[56px] py-6 sm:py-[44px] space-y-[28px] pb-32 lg:pb-12">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition mb-3"
        >
          <Icon name="arrowLeft" className="size-4" />
          Back to account
        </Link>
        <PageTitle title="Account settings" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl border border-border-default bg-bg-surface p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-h4 text-text-primary">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
              <div className="rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-sm font-medium text-text-primary">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
              <div className="rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-sm font-medium text-text-primary break-all">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Role</label>
              <div className="rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-sm font-medium text-text-primary capitalize">
                {user.role ?? 'Employee'}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border-default bg-bg-surface p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-h4 text-text-primary">Change password</h2>
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}
