"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans selection:bg-[#C2410C] selection:text-white">
      <div className="hidden lg:flex bg-[#1c1917] text-[#f5f5f4] px-[80px] py-[64px] flex-col justify-between relative min-h-screen">
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
            Clock in, check your hours, and see your timesheet <br />
            — all in one place.
          </p>
        </div>

        <div className="text-xs text-[#78716C] pt-6">
          Team members and managers use the same login page.
        </div>
      </div>

      <div className="bg-[#F7F6F5] text-[#1c1917] px-6 pt-16 pb-8 lg:px-[80px] lg:py-[64px] flex flex-col justify-between min-h-screen">
        <div className="flex items-center gap-2.5 lg:hidden mb-0">
          <span className="w-3.5 h-3.5 rounded-full bg-[#C2410C] shrink-0"></span>
          <span className="font-serif font-bold text-lg tracking-wide text-[#1c1917]">ABC Dumplings</span>
        </div>

        <div className="hidden lg:flex justify-end"></div>

        <div className="w-full max-w-[440px] mx-auto bg-transparent lg:bg-white lg:border lg:border-[#E7E5E4] lg:rounded-2xl lg:shadow-sm lg:p-10 space-y-5">
          <div>
            <h2 className="text-[28px] lg:text-[32px] font-serif font-bold text-[#1c1917] tracking-tight">Staff login</h2>
            <p className="text-xs lg:text-sm text-[#78716C] mt-1 font-normal">
              Use the email your manager gave you.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#1c1917] mb-1.5">
                Email
              </label>
              <input 
                type="email" 
                placeholder="maria@abcdumplings.ca" 
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C2410C] focus:border-[#C2410C] text-sm text-[#1c1917] placeholder:text-[#A8A29E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1c1917] mb-1.5">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#C2410C] focus:border-[#C2410C] text-sm text-[#1c1917] placeholder:text-[#A8A29E]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium py-2.5 rounded-lg transition shadow-sm text-sm mt-1"
            >
              Log in
            </button>
          </form>

          <div className="text-center pt-1">
            <a href="#" className="text-xs text-[#78716C] hover:underline font-normal">
              Forgot your password? Ask your manager to reset it.
            </a>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}