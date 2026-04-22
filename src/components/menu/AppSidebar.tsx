import { type ReactNode } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import { Icon } from '../icons'
import { navLinkClass, navSublinkClass } from './navStyles'

const sidebarRootClass =
  'flex w-full shrink-0 flex-col border-b border-fume-800/80 bg-fume-900 md:w-60 md:border-r md:border-b-0 md:min-h-dvh md:shadow-[4px_0_24px_-4px_rgba(0,0,0,0.35)]'
const sidebarBrandLinkClass =
  'mb-3 block rounded-lg px-2 pb-3 outline-none ring-offset-2 ring-offset-fume-900 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gold-500/45'
const sidebarReportsSummaryClass =
  'cursor-pointer list-none rounded-md px-2 py-1.5 text-xs font-semibold text-fume-400 transition-colors marker:hidden hover:bg-fume-800/50 hover:text-fume-200 [&::-webkit-details-marker]:hidden'

function SidebarRouteSublink({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: ReactNode
}) {
  const { pathname } = useLocation()
  const isActive =
    matchPath({ path: to, end: end ?? false, caseSensitive: false }, pathname) != null

  return (
    <Link
      to={to}
      className={navSublinkClass({ isActive })}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

export function AppSidebar() {
  return (
    <aside className={sidebarRootClass}>
      <div className="flex flex-col gap-1 p-3 md:sticky md:top-0 md:max-h-dvh md:overflow-y-auto">
        <Link to="/players" className={sidebarBrandLinkClass}>
          <div className="flex items-start gap-2.5 border-b border-fume-800/80 pb-3">
            <img
              src="/favicon.svg"
              alt=""
              width={36}
              height={36}
              decoding="async"
              className="h-9 w-9 shrink-0 rounded-lg shadow-sm ring-1 ring-fume-800/90"
              aria-hidden
            />
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-base font-bold tracking-tight text-fume-50">ScoutLedger</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                Scout reports · roster
              </p>
              <p className="mt-2 h-px w-8 bg-gradient-to-r from-gold-500 to-transparent" />
            </div>
          </div>
        </Link>

        <NavLink to="/players" className={navLinkClass}>
          Players
        </NavLink>
        <NavLink to="/compare" className={navLinkClass}>
          Compare
        </NavLink>

        <div className="mt-1">
          <details className="group rounded-lg" open>
            <summary className={sidebarReportsSummaryClass}>
              <span className="flex items-center justify-between gap-2">
                Player Reports
                <Icon
                  name="chevronDown"
                  className="h-3.5 w-3.5 shrink-0 text-fume-500 transition-transform group-open:rotate-180"
                />
              </span>
            </summary>
            <ul className="mt-1 space-y-0.5 border-l border-sea-500/22 pl-2.5">
              <li>
                <SidebarRouteSublink to="/player-reports/create" end>
                  Create report
                </SidebarRouteSublink>
              </li>
              <li>
                <SidebarRouteSublink to="/player-reports" end>
                  View reports
                </SidebarRouteSublink>
              </li>
              <li>
                <SidebarRouteSublink to="/player-reports/edit" end>
                  Edit reports
                </SidebarRouteSublink>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </aside>
  )
}
