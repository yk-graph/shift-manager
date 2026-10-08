import { checkPassword, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// These functions throw an Error with a friendly message when something is wrong.
// Server actions catch it and show the message to the user.

// Admin only: create a new employee account (admins are created by the seed script only).
export async function createEmployee(data: { name: string; email: string; phone: string; password: string }) {
  const email = data.email.trim().toLowerCase()

  if (!data.name.trim() || !email || !data.password) {
    throw new Error('Name, email and password are required.')
  }

  if (data.password.length < 6) {
    throw new Error('The password must have at least 6 characters.')
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('An account with this email already exists.')
  }

  return prisma.user.create({
    data: {
      name: data.name.trim(),
      email,
      phone: data.phone.trim() || null,
      passwordHash: await hashPassword(data.password),
      role: 'employee',
    },
  })
}

// Admin only: deactivate (false) or reactivate (true) an employee.
// Deactivated employees can't log in, but their shifts stay in the database.
export async function setEmployeeActive(userId: string, isActive: boolean) {
  return prisma.user.update({
    where: { id: userId, role: 'employee' },
    data: { isActive },
  })
}

// Any user: change their own password.
export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user || !(await checkPassword(currentPassword, user.passwordHash))) {
    throw new Error('Your current password is wrong.')
  }

  if (newPassword.length < 6) {
    throw new Error('The new password must have at least 6 characters.')
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await hashPassword(newPassword) },
  })
}
