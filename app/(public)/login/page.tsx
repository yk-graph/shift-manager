"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans selection:bg-[#C2410C] selection:text-white">
      <div className="bg-[#1c1917] text-[#f5f5f4] px-[80px] py-[64px] flex flex-col justify-between relative min-h-[500px] lg:min-h-screen">
        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#C2410C] shrink-0"></span>
          <span className="font-serif font-bold text-lg tracking-wide text-white">ABC Dumplings</span>
        </div>

        <div className="max-w-[440px] space-y-6 my-auto">
          <h1 className="text-[40px] font-serif font-bold tracking-tight leading-[1.15] text-white">
            Great dumplings start <br />
            with a good shift.
          </h1>
          <p className="text-[#A8A29E] text-base leading-relaxed">
            Clock in, check your hours, and see your timesheet — all in one place.
          </p>
        </div>

        <div className="text-xs text-[#78716C] pt-6">
          Team members and managers use the same login page.
        </div>
      </div>

      <div className="bg-[#F7F6F5] text-[#1c1917] px-[80px] py-[64px] flex flex-col justify-between min-h-[500px] lg:min-h-screen">
        <div className="flex justify-end"></div>

        <div className="w-full max-w-[440px] mx-auto bg-white border border-[#E7E5E4] rounded-2xl shadow-sm p-10 my-auto space-y-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1c1917]">Staff login</h2>
            <p className="text-sm text-[#78716C] mt-1">
              Use the email your manager gave you.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5">
                Email
              </label>
              <input 
                type="email" 
                placeholder="maria@abcdumplings.ca" 
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#C2410C] focus:border-transparent text-sm text-[#1c1917] placeholder:text-[#A8A29E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#C2410C] focus:border-transparent text-sm text-[#1c1917] placeholder:text-[#A8A29E]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium py-3 rounded-lg transition shadow-sm text-sm"
            >
              Log in
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="#" className="text-xs text-[#78716C] hover:underline">
              Forgot your password? Ask your manager to reset it.
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}