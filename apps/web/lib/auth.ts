import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import type { Role } from '@/lib/generated/prisma/client'

const SESSION_COOKIE = 'session'
const SESSION_DAYS = 7

// ---------- Passwords ----------

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function checkPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash)
}

// ---------- Sessions ----------

// Creates a session row and stores its id in a cookie.
export async function createSession(userId: string) {
  const id = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await prisma.session.create({ data: { id, userId, expiresAt } })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const id = cookieStore.get(SESSION_COOKIE)?.value

  if (id) await prisma.session.deleteMany({ where: { id } })
  cookieStore.delete(SESSION_COOKIE)
}

// Returns the logged-in user, or null.
// `cache` makes sure we only hit the database once per request,
// even if a layout and a page both call this.
export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies()
  const id = cookieStore.get(SESSION_COOKIE)?.value
  if (!id) return null

  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, role: true, isActive: true } },
    },
  })

  if (!session || session.expiresAt < new Date() || !session.user.isActive) return null
  return session.user
})

// Where each role lands after login.
export function homePathFor(role: Role) {
  return role === 'admin' ? '/admin' : '/clock'
}

// Use at the top of every page, layout, and server action that needs a logged-in user.
// Sends the user to /login if not logged in, or to their own home page if the role is wrong.
export async function requireRole(role: Role) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== role) redirect(homePathFor(user.role))
  return user
}
