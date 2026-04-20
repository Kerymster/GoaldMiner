import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { TopBarActions } from './TopBarActions'
import {
  topBarAccountEmphasisClass,
  topBarDesktopActionsClass,
  topBarHeaderClass,
  topBarInnerClass,
  topBarMobileActionsClass,
  topBarSignedInPrefixClass,
  topBarSubtitleClass,
  topBarTitleBlockClass,
  topBarTitleClass,
  topBarTitleRowClass,
} from './topBarStyles'
import { titleFromPath } from './titleFromPath'

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { title, subtitle } = titleFromPath(pathname)
  const accountLabel = user?.email ?? user?.phone ?? 'Account'

  return (
    <header className={topBarHeaderClass}>
      <div className={topBarInnerClass}>
        <div className={topBarTitleRowClass}>
          <div className={topBarTitleBlockClass}>
            <p className={topBarTitleClass}>{title}</p>
            <p className={topBarSubtitleClass}>
              {subtitle ? `${subtitle} · ` : null}
              <span className={topBarSignedInPrefixClass}>Signed in as </span>
              <span className={topBarAccountEmphasisClass}>{accountLabel}</span>
            </p>
          </div>
          <div className={topBarMobileActionsClass}>
            <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        <div className={topBarDesktopActionsClass}>
          <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  )
}
