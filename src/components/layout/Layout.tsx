import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from '../menu/AppSidebar'
import { TopBar } from '../top-bar/TopBar'
import {
  layoutBodyRowClass,
  layoutMainClass,
  layoutMainColumnClass,
  layoutRootClass,
} from './layoutStyles'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className={layoutRootClass}>
      <div className={layoutBodyRowClass}>
        <AppSidebar />
        <div className={layoutMainColumnClass}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.26] dark:opacity-25"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 85% 55% at 50% -18%, var(--overlay-gold-wash), transparent 52%), radial-gradient(ellipse 70% 45% at 80% 0%, var(--overlay-sea-wash), transparent 50%)',
            }}
          />
          <TopBar key={pathname} />
          <main className={layoutMainClass}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
