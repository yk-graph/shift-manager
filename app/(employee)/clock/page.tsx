'use client'

import { useState } from 'react'

export default function ClockPage() {
  // State for tracking the currently selected work location ('gastown' | 'richmond')
  const [selectedLocation, setSelectedLocation] = useState('gastown')

  // State for tracking whether the employee is currently clocked in (UI transition toggle)
  const [isClockedIn, setIsClockedIn] = useState(false)

  return (
    <div className="px-[56px] py-[44px] space-y-[28px]">
      {/* Header Greeting Section */}
      <div>
        <h1 className="text-h1 text-text-primary">Hi Maria</h1>
        <p className="text-body text-text-secondary mt-1">Saturday, October 3, 2026</p>
      </div>

      {/* Dashboard Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[724px_340px] gap-6 items-start">
        {/* Left Main Card: Clock Control Panel */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-[28px_32px] shadow-sm space-y-6">
          {isClockedIn ? (
            /* --- On-shift View (E-PC_03) --- */
            <div className="space-y-6 text-center py-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mx-auto">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                Clocked in at {selectedLocation === 'gastown' ? 'Gastown' : 'Richmond'}
              </div>

              {/* Timer & Subtitle */}
              <div className="space-y-1">
                <p className="text-timer text-text-primary tracking-tight">03:27:14</p>
                <p className="text-body-sm text-text-secondary">Since 9:02 AM</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 max-w-[500px] mx-auto w-full">
                <button
                  type="button"
                  disabled
                  className="w-full bg-stone-200 text-stone-400 font-medium py-3.5 rounded-xl cursor-not-allowed text-base"
                >
                  Clock in
                </button>
                <button
                  type="button"
                  onClick={() => setIsClockedIn(false)}
                  className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3.5 rounded-xl transition shadow-sm text-base"
                >
                  Clock out
                </button>
              </div>

              <p className="text-caption text-text-secondary">
                You can clock out until 9:00 PM. After that, a manager will close your shift.
              </p>
            </div>
          ) : (
            /* --- Before Clock-in View (E-PC_02) --- */
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                Clocked out
              </div>

              {/* Prompt Question */}
              <h2 className="text-title-md text-text-primary">Where are you working today?</h2>

              {/* Location Selection Options */}
              <div className="space-y-3">
                {/* Gastown Option */}
                <div
                  onClick={() => setSelectedLocation('gastown')}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedLocation === 'gastown'
                      ? 'border-orange-700 bg-orange-50/20'
                      : 'border-border-default hover:border-stone-300 bg-bg-surface'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-title-md text-text-primary">Gastown</p>
                    <p className="text-body-sm text-text-secondary">12 Water Street</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedLocation === 'gastown' ? 'border-orange-700 bg-orange-700' : 'border-stone-300'
                    }`}
                  >
                    {selectedLocation === 'gastown' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                </div>

                {/* Richmond Option */}
                <div
                  onClick={() => setSelectedLocation('richmond')}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedLocation === 'richmond'
                      ? 'border-orange-700 bg-orange-50/20'
                      : 'border-border-default hover:border-stone-300 bg-bg-surface'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-title-md text-text-primary">Richmond</p>
                    <p className="text-body-sm text-text-secondary">8800 No. 3 Road</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedLocation === 'richmond' ? 'border-orange-700 bg-orange-700' : 'border-stone-300'
                    }`}
                  >
                    {selectedLocation === 'richmond' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsClockedIn(true)}
                  className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3.5 rounded-xl transition shadow-sm text-base"
                >
                  Clock in at {selectedLocation === 'gastown' ? 'Gastown' : 'Richmond'}
                </button>
                <button
                  type="button"
                  disabled
                  className="w-full bg-stone-200 text-stone-400 font-medium py-3.5 rounded-xl cursor-not-allowed text-base"
                >
                  Clock out
                </button>
              </div>

              {/* Helper Caption */}
              <p className="text-caption text-text-secondary text-center">Clock-in opens at 8:00 AM.</p>
            </div>
          )}
        </div>

        {/* Right Summary Card: Weekly Work Stats */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-[28px_32px] shadow-sm space-y-4">
          <p className="text-caption text-text-secondary uppercase tracking-wider font-semibold">
            This week · Sep 28 – Oct 4
          </p>
          <div className="space-y-1">
            <p className="text-stat text-text-primary">22h 41m</p>
            <p className="text-body-sm text-text-secondary">5 shifts · 2 branches</p>
          </div>
          <div className="pt-2 border-t border-border-default">
            <a
              href="/timesheet"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800 transition"
            >
              Open timesheet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
