import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaf9] px-6 text-[#292524]">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="size-5 rounded-full bg-[#cf3a08]" />
          <span className="font-serif text-3xl font-bold tracking-tight">ABC Dumplings</span>
        </div>
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight">Admin frontend preview</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-[#77716d]">
          The admin interface is isolated from the public, employee, and login work owned by the rest of the team.
        </p>
        <Link
          href="/admin"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[#cf3a08] px-6 text-base font-bold text-white transition hover:bg-[#b93207]"
        >
          Open admin
        </Link>
      </section>
    </main>
  )
}
