import { ChangeLog } from '../_components/change-log'
import { changeLog } from '../_lib/mock-data'

export default function ChangeLogPage() {
  return <ChangeLog entries={changeLog} />
}
