'use client'

import { useState } from 'react'

export default function TimesheetPage() {
  // State for toggling between normal and empty state for UI testing
  const [isEmptyWeek, setIsEmptyWeek] = useState(false)

  // Mock data for timesheet shifts matching Figma mobile specs
  const shifts = [
    {
      id: 1,
      day: 'Sat, Oct 3',
      branch: 'Gastown',
      clockIn: '9:02 AM',
      clockOut: '— (on shift)',
      duration: '3h 27m',
      notes: null,
    },
    {
      id: 2,
      day: 'Fri, Oct 2',
      branch: 'Gastown',
      clockIn: '8:05 AM',
      clockOut: '12:00 PM',
      duration: '3h 55m',
      notes: null,
    },
    {
      id: 3,
      day: 'Fri, Oct 2',
      branch: 'Richmond',
      clockIn: '12:45 PM',
      clockOut: '4:58 PM',
      duration: '4h 13m',
      notes: null,
    },
    {
      id: 4,
      day: 'Thu, Oct 1',
      branch: 'Gastown',
      clockIn: '8:00 AM',
      clockOut: '5:00 PM',
      duration: '9h 00m',
      notes: 'Changed by admin · Clock-out 4:30 PM → 5:00 PM',
    },
    {
      id: 5,
      day: 'Wed, Sep 30',
      branch: 'Gastown',
      clockIn: '10:00 AM',
      clockOut: '12:36 PM',
      duration: '2h 36m',
      notes: null,
    },
  ]

  return (
    <div className="px-5 sm:px-[56px] py-6 sm:py-[44px] space-y-[28px]">
      {/* UI Preview Mode Toggle Buttons (For testing both states) */}
      <div className="flex items-center gap-3 bg-stone-100 p-3 rounded-xl w-fit border border-border-default">
        <span className="text-xs font-semibold text-text-secondary">UI Preview:</span>
        <button
          onClick={() => setIsEmptyWeek(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            !isEmptyWeek
              ? 'bg-stone-800 text-white shadow-sm'
              : 'bg-white text-stone-600 border border-border-default hover:bg-stone-50'
          }`}
        >
          Normal (With Shifts)
        </button>
        <button
          onClick={() => setIsEmptyWeek(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            isEmptyWeek
              ? 'bg-orange-700 text-white shadow-sm'
              : 'bg-white text-stone-600 border border-border-default hover:bg-stone-50'
          }`}
        >
          Empty Week
        </button>
      </div>

      {/* Top Header: Title and Date Range Pagination aligned in one row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h1 text-text-primary">My timesheet</h1>
        <div className="flex items-center gap-3 bg-bg-surface border border-border-default rounded-xl px-3 py-1.5 shadow-sm w-fit">
          <button
            type="button"
            className="text-stone-400 hover:text-text-primary transition p-1"
            aria-label="Previous week"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-body-sm-medium text-text-primary">
            {isEmptyWeek ? 'Oct 5 – Oct 11, 2026' : 'Sep 28 – Oct 4, 2026'}
          </span>
          <button
            type="button"
            className="text-stone-400 hover:text-text-primary transition p-1"
            aria-label="Next week"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Week Total Banner */}
      <div className="bg-stone-800 text-white rounded-2xl p-[20px_28px] flex items-center justify-between shadow-sm">
        <span className="text-body-medium text-stone-300">Week total</span>
        <span className="text-stat text-white">{isEmptyWeek ? '0h 00m' : '22h 41m'}</span>
      </div>

      {/* Shifts Container */}
      {isEmptyWeek ? (
        /* --- Empty State Card --- */
        <div className="bg-bg-surface border border-border-default rounded-2xl p-12 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-title-md text-text-primary">No shifts yet</p>
              <p className="text-body-sm text-text-secondary">Your shifts will show up here after you clock in.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* --- Mobile View: Figma-matching Card List (E-MB_04) --- */}
          <div className="block sm:hidden space-y-3">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="bg-bg-surface border border-border-default rounded-2xl p-[14px_16px] shadow-sm space-y-1.5"
              >
                {/* Top Row: Day */}
                <span className="text-body font-semibold text-text-primary block">{shift.day}</span>

                {/* Bottom Row: Left (Time & Branch stacked) and Right (Duration aligned to bottom) */}
                <div className="flex items-end justify-between">
                  <div className="space-y-0.5">
                    <span className="text-body-sm text-text-secondary block">
                      {shift.clockIn} – {shift.clockOut}
                    </span>
                    <span className="text-body-sm text-text-secondary block">{shift.branch}</span>
                  </div>
                  <span className="text-body-sm font-semibold text-text-primary">{shift.duration}</span>
                </div>

                {/* Admin Note if exists */}
                {shift.notes && (
                  <div className="pt-2 mt-1 border-t border-border-default">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium">
                      {shift.notes}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* --- PC View: Table (E-PC_04) --- */}
          <div className="hidden sm:block bg-bg-surface border border-border-default rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-default text-caption text-text-secondary uppercase tracking-wider bg-stone-50/50">
                    <th className="py-3.5 px-6 font-semibold">Day</th>
                    <th className="py-3.5 px-6 font-semibold">Branch</th>
                    <th className="py-3.5 px-6 font-semibold">Clock in</th>
                    <th className="py-3.5 px-6 font-semibold">Clock out</th>
                    <th className="py-3.5 px-6 font-semibold">Duration</th>
                    <th className="py-3.5 px-6 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default text-body-sm">
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="hover:bg-stone-50/50 transition">
                      <td className="py-4 px-6 font-medium text-text-primary">{shift.day}</td>
                      <td className="py-4 px-6 text-text-secondary">{shift.branch}</td>
                      <td className="py-4 px-6 text-text-secondary">{shift.clockIn}</td>
                      <td className="py-4 px-6 text-stone-400">{shift.clockOut}</td>
                      <td className="py-4 px-6 font-medium text-text-primary">{shift.duration}</td>
                      <td className="py-4 px-6">
                        {shift.notes ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium">
                            {shift.notes}
                          </span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
