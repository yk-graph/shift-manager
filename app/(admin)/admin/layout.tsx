import { requireRole } from '@/lib/auth'
import { AdminShell } from './_components/admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireRole('admin')
  return <AdminShell adminName={admin.name}>{children}</AdminShell>
}
