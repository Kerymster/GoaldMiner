import { useState } from 'react'

type TeamLogoProps = {
  name: string
  logoUrl?: string
  /** List rows: sm; league list: sm; detail hero: lg */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClass = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-24 w-24 text-2xl sm:h-28 sm:w-28',
} as const

export function TeamLogo({
  name,
  logoUrl,
  size = 'sm',
  className = '',
}: TeamLogoProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const dim = sizeClass[size]
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  if (!logoUrl || imgFailed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl border border-fume-200/90 bg-fume-100 font-semibold tabular-nums text-fume-500 dark:border-fume-700 dark:bg-fume-800 dark:text-fume-400 ${dim} ${className}`}
        aria-hidden
      >
        {initial}
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt=""
      className={`shrink-0 rounded-xl border border-fume-200/90 bg-white object-contain p-1 dark:border-fume-700 dark:bg-fume-900 ${dim} ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setImgFailed(true)}
    />
  )
}
