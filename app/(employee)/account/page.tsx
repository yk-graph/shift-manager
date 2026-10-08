import Link from 'next/link'
import { logout } from '@/app/(public)/login/actions'
import { requireRole } from '@/lib/auth'
import { Button, Icon, PageTitle } from '../../(admin)/admin/_components/ui'
import { initials } from '@/lib/format'

export default async function AccountPage() {
  const user = (await requireRole('employee')) as {
    name: string
    email: string
    role?: string
    isActive?: boolean
  }

  return (
    <div className="max-w-[1120px] mx-auto px-5 sm:px-[56px] py-6 sm:py-[44px] space-y-[28px] pb-24 lg:pb-12">
      <PageTitle title="My account" />

      <div className="max-w-[720px] rounded-2xl border border-border-default bg-bg-surface p-5 sm:p-8 lg:p-10 shadow-sm">
        {/* Profile Header */}
        <div className="flex items-center gap-4 sm:gap-5 border-b border-border-default pb-6 sm:pb-8">
          <div className="grid size-16 sm:size-20 place-items-center rounded-full border border-brand-ember bg-orange-50 text-xl sm:text-2xl font-bold text-brand-ember">
            {initials(user.name)}
          </div>
          <div>
            <h2 className="text-h4 sm:text-h3 text-text-primary">{user.name}</h2>
            <p className="mt-1 inline-flex items-center gap-2 text-xs sm:text-sm text-status-success font-medium">
              <span className="size-2 rounded-full bg-current" />
              {user.isActive !== false ? 'Active employee' : 'Inactive'}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border-default bg-bg-subtle px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base gap-1 sm:gap-4">
            <span className="text-text-secondary">Email</span>
            <span className="font-medium text-text-primary break-all sm:break-normal">{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border-default bg-bg-subtle px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base gap-1 sm:gap-4">
            <span className="text-text-secondary">Role</span>
            <span className="font-medium text-text-primary capitalize">{user.role ?? 'employee'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-border-default pt-6 sm:pt-8">
          <Link href="/account/settings" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto h-12 px-6 text-base font-bold justify-center">
              Edit account settings
            </Button>
          </Link>
          <form action={logout} className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border-default bg-bg-surface px-6 text-base font-bold text-text-primary transition hover:bg-bg-subtle"
            >
              <Icon name="arrowLeft" className="size-4 rotate-180" />
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
