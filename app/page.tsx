"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-[#C2410C] selection:text-white">
      <header className="w-full bg-white border-b border-[#E7E5E4] relative z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#C2410C]"></span>
            <span className="font-serif font-bold text-lg tracking-wide text-[#1c1917]">ABC Dumplings</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <span className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition">Our dumpling houses</span>
            <span className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition">Menu</span>
            <span className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition">Careers</span>
            <Link 
              href="/login" 
              className="border border-[#D1D5DB] bg-white text-[#1c1917] hover:bg-[#F3F4F6] px-4 py-2 rounded-md font-medium transition text-sm shadow-sm"
            >
              Staff login
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center text-[#1c1917] cursor-pointer focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E7E5E4] shadow-lg py-6 px-6 flex flex-col gap-4 text-sm animate-fadeIn">
            <span 
              onClick={() => setIsMenuOpen(false)} 
              className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition py-1"
            >
              Our dumpling houses
            </span>
            <span 
              onClick={() => setIsMenuOpen(false)} 
              className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition py-1"
            >
              Menu
            </span>
            <span 
              onClick={() => setIsMenuOpen(false)} 
              className="text-[#78716C] hover:text-[#1c1917] cursor-pointer transition py-1"
            >
              Careers
            </span>
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="border border-[#D1D5DB] bg-white text-[#1c1917] hover:bg-[#F3F4F6] px-4 py-2.5 rounded-md font-medium transition text-center shadow-sm mt-2"
            >
              Staff login
            </Link>
          </div>
        )}
      </header>

      <div className="bg-[#1c1917] text-[#f5f5f4] w-full pt-8 pb-10 sm:pt-12 sm:pb-24 flex-1 flex flex-col justify-center">
        <main className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C2410C] font-bold">
                HANDMADE DUMPLINGS · VANCOUVER
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight">
                Folded by hand, <br />
                served hot.
              </h1>
              <p className="text-[#A8A29E] text-sm sm:text-base leading-relaxed max-w-md">
                Two neighbourhood dumpling houses, open 8 AM to 5 PM. Fresh dough every morning, family recipes, and a team that loves like family.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <a 
                  href="#locations" 
                  className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-6 py-3 rounded-md font-medium transition shadow-sm text-sm text-center"
                >
                  Find a location
                </a>
                <Link 
                  href="/login" 
                  className="border border-[#44403C] hover:bg-[#292524] text-white px-6 py-3 rounded-md font-medium transition text-sm text-center"
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

      <div className="bg-[#FAFAF9] text-[#292524] w-full py-10 sm:py-20">
        <div id="locations" className="w-full max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 sm:mb-10 text-[#292524]">Our dumpling houses</h2>
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
        <div className="w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 text-xs flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <Link href="/login" className="md:hidden hover:text-white transition flex items-center gap-1 text-sm font-medium text-[#D6D3D1]">
            Staff login →
          </Link>
          <span>© 2026 ABC Dumplings — part of ABC Holding Ltd.</span>
          <Link href="/login" className="hidden md:flex hover:text-white transition items-center gap-1">Staff login →</Link>
        </div>
      </footer>
    </div>
  );
}