import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ employeeId: string; branchId: string }> }
) {
  const { employeeId, branchId } = await params
  return NextResponse.json({ employeeId, branchId })
}
