import { IconBell, IconChevronDown } from '../icons'

export type TopBarActionsProps = {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((b: boolean) => boolean)) => void
}

export function TopBarActions({ menuOpen, setMenuOpen }: TopBarActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        title="Notifications (mock)"
        className="cursor-pointer rounded-lg p-2 text-fume-500 transition-colors hover:bg-fume-200/80 hover:text-fume-800 dark:text-fume-400 dark:hover:bg-fume-800 dark:hover:text-fume-100"
      >
        <IconBell className="h-5 w-5" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-fume-200/80 dark:hover:bg-fume-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-sea-700 text-xs font-bold text-white shadow-sm shadow-fume-950/15">
            GM
          </span>
          <IconChevronDown
            className={`hidden h-4 w-4 text-fume-500 transition-transform sm:block ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-fume-200/90 bg-white py-1 shadow-lg shadow-fume-950/10 dark:border-fume-700 dark:bg-fume-900"
            >
              <button
                type="button"
                role="menuitem"
                className="flex w-full cursor-pointer px-4 py-2.5 text-left text-sm text-fume-700 hover:bg-fume-100 dark:text-fume-200 dark:hover:bg-fume-800"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full cursor-pointer px-4 py-2.5 text-left text-sm text-fume-700 hover:bg-fume-100 dark:text-fume-200 dark:hover:bg-fume-800"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </button>
              <div className="my-1 h-px bg-fume-200 dark:bg-fume-700" />
              <button
                type="button"
                role="menuitem"
                className="flex w-full cursor-pointer px-4 py-2.5 text-left text-sm text-gold-800 hover:bg-gold-500/10 dark:text-gold-400 dark:hover:bg-gold-500/10"
                onClick={() => setMenuOpen(false)}
              >
                Log out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
