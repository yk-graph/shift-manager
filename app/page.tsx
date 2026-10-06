"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-[#C2410C] selection:text-white">
      <header className="w-full bg-white border-b border-[#E7E5E4] sticky sm:static top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#C2410C] shrink-0"></span>
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#1c1917] truncate">ABC Dumplings</span>
          </div>

          <div className="flex items-center">
            <Link 
              href="/login" 
              className="border border-[#D1D5DB] bg-white text-[#1c1917] hover:bg-[#F3F4F6] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition text-xs sm:text-sm shadow-sm shrink-0"
            >
              Staff login
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-[#1c1917] text-[#f5f5f4] w-full pt-6 pb-8 sm:pt-8 sm:pb-16 flex-1 flex flex-col justify-center">
        <main className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C2410C] font-bold">
                STAFF TIME CLOCK PORTAL
              </span>
              <h1 className="text-3xl sm:text-6xl font-serif font-bold tracking-tight leading-tight">
                Welcome <br />
                Team Members!
              </h1>
              <p className="text-[#A8A29E] text-sm sm:text-base leading-relaxed max-w-md">
                Manage your shifts, track work hours, <br />
                and access internal tools seamlessly. 
                <span className="block mt-1">Please log in to start your time clock.</span>
              </p>
              <div className="pt-1 sm:pt-2">
                <Link 
                  href="/login" 
                  className="inline-block bg-[#C2410C] hover:bg-[#9A3412] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-medium transition shadow-sm text-sm text-center"
                >
                  Staff login
                </Link>
              </div>
            </div>
            
            <div className="relative h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#332E2B]">
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

      <div className="bg-[#FAFAF9] text-[#292524] w-full pt-8 pb-12 sm:pt-12 sm:pb-20">
        <div id="locations" className="w-full max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-10 text-[#292524]">Our dumpling houses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white text-[#292524] p-6 rounded-xl shadow-md border border-[#E7E5E4]">
              <h3 className="font-serif font-bold text-lg sm:text-xl mb-2">ABC Dumplings — Gastown</h3>
              <p className="text-[#78716C] text-sm mb-4">12 Water Street, Vancouver</p>
              <p className="text-xs text-[#B45309] font-semibold">Open daily · 8:00 AM – 5:00 PM</p>
            </div>
            <div className="bg-white text-[#292524] p-6 rounded-xl shadow-md border border-[#E7E5E4]">
              <h3 className="font-serif font-bold text-lg sm:text-xl mb-2">ABC Dumplings — Richmond</h3>
              <p className="text-[#78716C] text-sm mb-4">8800 No. 3 Road, Richmond</p>
              <p className="text-xs text-[#B45309] font-semibold">Open daily · 8:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1c1917] text-[#78716C] w-full border-t border-[#292524]">
        <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 text-xs">
          <span className="text-[#78716C] text-[11px] sm:text-xs">
            © 2026 ABC Dumplings — part of ABC Holding Ltd.
          </span>
          <Link href="/login" className="text-white hover:underline transition flex items-center gap-1 font-medium text-sm">
            Staff login →
          </Link>
        </div>
      </footer>
    </div>
  );
}