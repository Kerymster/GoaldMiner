import { useAuth } from '../../hooks/useAuth'
import { ThemeToggleButton } from '../ThemeToggleButton'
import { Icon } from '../icons'
import { overlayMenuPanelClass } from '../overlay-select/overlayDropdownStyles'

const topBarActionsWrapClass = 'flex shrink-0 items-center gap-1'
const notificationsButtonClass =
  'cursor-pointer rounded-lg p-2 text-fume-400 transition-colors hover:bg-fume-800/70 hover:text-fume-100'
const accountTriggerClass =
  'flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-fume-800/70'
const accountInitialsClass =
  'flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/45 bg-gold-600 text-xs font-bold text-white shadow-sm'
const accountChevronClass = 'hidden h-4 w-4 text-fume-400 transition-transform sm:block'
const accountMenuClass =
  `${overlayMenuPanelClass} border-fume-700/80 bg-fume-900/98 ring-gold-500/20`
const accountMenuItemClass =
  'flex w-full cursor-pointer px-4 py-2.5 text-left text-sm text-fume-200 hover:bg-fume-800/75'
const accountMenuDividerClass = 'my-1 h-px bg-fume-700/80'
const accountMenuLogoutClass =
  'flex w-full cursor-pointer px-4 py-2.5 text-left text-sm text-gold-300 hover:bg-gold-500/12'

function accountInitials(handle: string | undefined): string {
  if (!handle) return '?'
  const local = handle.includes('@') ? (handle.split('@')[0] ?? handle) : handle
  const parts = local.split(/[._-]+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase() || '?'
  }
  const compact = local.replace(/[^a-zA-Z0-9]/g, '')
  if (compact.length >= 2) return compact.slice(0, 2).toUpperCase()
  return (local.slice(0, 2) || '?').toUpperCase()
}

export type TopBarActionsProps = {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((b: boolean) => boolean)) => void
}

export function TopBarActions({ menuOpen, setMenuOpen }: TopBarActionsProps) {
  const { user, logout } = useAuth()
  const initials = accountInitials(user?.email ?? user?.phone)

  return (
    <div className={topBarActionsWrapClass}>
      <ThemeToggleButton className={notificationsButtonClass} />
      <button
        type="button"
        title="Notifications (mock)"
        className={notificationsButtonClass}
      >
        <Icon name="bell" className="h-5 w-5" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className={accountTriggerClass}
        >
          <span className={accountInitialsClass}>{initials}</span>
          <Icon
            name="chevronDown"
            className={`${accountChevronClass} ${menuOpen ? 'rotate-180' : ''}`}
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
            <div role="menu" className={accountMenuClass}>
              <button
                type="button"
                role="menuitem"
                className={accountMenuItemClass}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className={accountMenuItemClass}
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </button>
              <div className={accountMenuDividerClass} />
              <button
                type="button"
                role="menuitem"
                className={accountMenuLogoutClass}
                onClick={() => {
                  setMenuOpen(false)
                  void logout()
                }}
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
