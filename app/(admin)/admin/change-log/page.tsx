import { requireRole } from '@/lib/auth'
import { ChangeLog } from '../_components/change-log'
import { getChangeLogEntries } from '@/lib/admin-data'

export default async function ChangeLogPage() {
  await requireRole('admin')
  const entries = await getChangeLogEntries()

  return <ChangeLog entries={entries} />
}
