'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-brand-ember selection:text-text-on-brand">
      <header className="w-full bg-bg-surface border-b border-border-default sticky sm:static top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-brand-ember shrink-0"></span>
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-text-primary truncate">
              ABC Dumplings
            </span>
          </div>

          <div className="flex items-center">
            <Link
              href="/login"
              className="border border-border-default bg-bg-surface text-text-primary hover:bg-bg-subtle px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition text-xs sm:text-sm shadow-sm shrink-0"
            >
              Staff login
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-bg-inverse text-text-inverse w-full pt-6 pb-8 sm:pt-8 sm:pb-16 flex-1 flex flex-col justify-center">
        <main className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-xs uppercase tracking-widest text-brand-ember font-bold">
                STAFF TIME CLOCK PORTAL
              </span>
              <h1 className="text-3xl sm:text-6xl font-serif font-bold tracking-tight leading-tight">
                Welcome <br />
                Team Members!
              </h1>
              <p className="text-text-inverse-subtle text-sm sm:text-base leading-relaxed max-w-md">
                Manage your shifts, track work hours, <br />
                and access internal tools seamlessly.
                <span className="block mt-1">Please log in to start your time clock.</span>
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  href="/login"
                  className="inline-block bg-brand-ember hover:bg-brand-ember-dark text-text-on-brand px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-medium transition shadow-sm text-sm text-center"
                >
                  Staff login
                </Link>
              </div>
            </div>

            <div className="relative h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-border-strong">
              <Image
                src="/bamboo-baskets.jpg"
                alt="Steaming bamboo baskets"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </main>
      </div>

      <div className="bg-bg-page text-text-primary w-full pt-8 pb-12 sm:pt-12 sm:pb-20">
        <div id="locations" className="w-full max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-10 text-text-primary">
            Our dumpling houses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-bg-surface text-text-primary p-6 rounded-xl shadow-md border border-border-default">
              <h3 className="font-serif font-bold text-lg sm:text-xl mb-2">ABC Dumplings — Gastown</h3>
              <p className="text-text-secondary text-sm mb-4">12 Water Street, Vancouver</p>
              <p className="text-xs text-status-warning font-semibold">Open daily · 8:00 AM – 9:00 PM</p>
            </div>
            <div className="bg-bg-surface text-text-primary p-6 rounded-xl shadow-md border border-border-default">
              <h3 className="font-serif font-bold text-lg sm:text-xl mb-2">ABC Dumplings — Richmond</h3>
              <p className="text-text-secondary text-sm mb-4">8800 No. 3 Road, Richmond</p>
              <p className="text-xs text-status-warning font-semibold">Open daily · 8:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-bg-inverse text-text-secondary w-full border-t border-border-strong">
        <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 text-xs">
          <span className="text-text-secondary text-[11px] sm:text-xs">
            © 2026 ABC Dumplings — part of ABC Holding Ltd.
          </span>
          <Link
            href="/login"
            className="text-text-inverse hover:underline transition flex items-center gap-1 font-medium text-sm"
          >
            Staff login →
          </Link>
        </div>
      </footer>
    </div>
  )
}
