'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { checkPassword, createSession, deleteSession, homePathFor } from '@/lib/auth'

export type LoginState = { error?: string }

// Use with `useActionState(login, {})` in the login form.
// The form inputs need name="email" and name="password".
export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') ?? '')

  const user = await prisma.user.findUnique({ where: { email } })

  // If the user doesn't exist or the password is incorrect, return an error.
  if (!user || !(await checkPassword(password, user.passwordHash))) {
    return { error: 'Wrong email or password.' }
  }

  // If the user is deactivated, return an error.
  if (!user.isActive) {
    return { error: 'Your account is deactivated. Please talk to your manager.' }
  }

  // Create a session for the user.
  await createSession(user.id)
  // Redirect to the home page of the user's role.
  redirect(homePathFor(user.role))
}

// Use in any form: <form action={logout}><button>Log out</button></form>
export async function logout() {
  await deleteSession()
  redirect('/login')
}
