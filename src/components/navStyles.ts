export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
  ].join(' ')

export const navSublinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-2 py-1.5 text-sm transition-colors',
    isActive
      ? 'bg-zinc-200/90 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white'
      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80',
  ].join(' ')
