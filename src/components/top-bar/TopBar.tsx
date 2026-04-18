import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TopBarActions } from './TopBarActions'
import { titleFromPath } from './titleFromPath'

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { title, subtitle } = titleFromPath(pathname)

  return (
    <header className="sticky top-0 z-30 border-b border-fume-200/80 bg-shell/80 backdrop-blur-xl backdrop-saturate-150 dark:border-fume-800 dark:bg-fume-950/88">
      <div className="flex w-full flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-start">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fume-900 dark:text-fume-100">
              {title}
            </p>
            <p className="truncate text-xs text-fume-500 dark:text-fume-400">
              {subtitle ? `${subtitle} · ` : null}
              <span className="text-fume-600 dark:text-fume-400">Signed in as </span>
              <span className="font-medium text-fume-800 dark:text-fume-200">
                demo@goaldminer.app
              </span>
            </p>
          </div>
          <div className="shrink-0 sm:hidden">
            <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        <div className="hidden shrink-0 sm:flex sm:justify-end">
          <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  )
}
