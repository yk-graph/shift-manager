import type { ReactNode, SVGProps } from 'react'
import type { Branch } from '../_lib/types'

export type IconName =
  'dashboard' | 'employees' | 'calendar' | 'history' | 'arrowLeft' | 'plus' | 'eye' | 'clock' | 'lock'

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const props: SVGProps<SVGSVGElement> = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const paths: Record<IconName, ReactNode> = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    employees: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 3v6h6" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
  }

  return <svg {...props}>{paths[name]}</svg>
}

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="size-5 rounded-full bg-[#cf3a08]" />
      <span className="font-serif text-[22px] font-bold leading-none tracking-tight text-[#24201f] lg:text-white">
        ABC Dumplings
      </span>
    </div>
  )
}

export function Pill({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'amber' | 'gray' }) {
  const toneClass = {
    green: 'bg-[#d9f9e3] text-[#11843c]',
    amber: 'bg-[#fff0bf] text-[#c65b08]',
    gray: 'bg-[#f1efee] text-[#77716d]',
  }[tone]

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${toneClass}`}>
      <span className="size-2 rounded-full bg-current" />
      {children}
    </span>
  )
}

export function BranchBadge({ branch }: { branch: Branch }) {
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-sm font-medium ${
        branch === 'Gastown' ? 'bg-[#ffe8cc] text-[#ad5528]' : 'bg-[#d9effc] text-[#2479a5]'
      }`}
    >
      {branch}
    </span>
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const variantClass = {
    primary: 'bg-[#cf3a08] text-white hover:bg-[#b93207]',
    secondary: 'border border-[#24201f] bg-white text-[#24201f] hover:bg-[#f5f3f1]',
    ghost: 'text-[#5f5955] hover:text-[#24201f]',
    dark: 'bg-[#282220] text-white hover:bg-[#181412]',
  }[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-bold transition ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h1 className="font-serif text-[40px] font-bold leading-none tracking-tight text-[#24201f] lg:text-[44px]">
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-base text-[#77716d] lg:text-lg">{subtitle}</p>}
    </div>
  )
}

export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#55504d]">
      <Icon name="arrowLeft" className="size-4" />
      {label}
    </button>
  )
}

export function Field({
  label,
  placeholder,
  defaultValue,
  icon,
}: {
  label: string
  placeholder?: string
  defaultValue?: string
  icon?: IconName
}) {
  return (
    <label className="mb-5 block last:mb-0">
      <span className="mb-2 block text-sm font-medium text-[#292524]">{label}</span>
      <span className="relative block">
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-14 w-full rounded-lg border border-[#ded9d5] bg-white px-4 text-base outline-none transition placeholder:text-[#aaa5a2] focus:border-[#cf3a08]"
        />
        {icon && <Icon name={icon} className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#77716d]" />}
      </span>
    </label>
  )
}
