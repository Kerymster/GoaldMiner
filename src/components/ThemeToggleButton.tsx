import { useTheme } from '../contexts/ThemeContext'
import { Icon } from './icons'

const defaultButtonClass =
  'cursor-pointer rounded-lg p-2 text-fume-500 transition-colors hover:bg-fume-200/80 hover:text-fume-900 dark:text-fume-400 dark:hover:bg-fume-800/70 dark:hover:text-fume-100'

type Props = {
  className?: string
}

export function ThemeToggleButton({ className }: Props) {
  const { isDark, toggleTheme } = useTheme()
  const cls = className ?? defaultButtonClass
  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cls}
    >
      <Icon name={isDark ? 'sun' : 'moon'} className="h-5 w-5" />
    </button>
  )
}
