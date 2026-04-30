import { type ReactNode } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import { Icon, type IconName } from '../icons'
import {
  navLinkClass,
  navMainContentClass,
  navMainIconClass,
  navSublinkClass,
  navSublinkContentClass,
  navSublinkIconClass,
  sidebarBrandDividerClass,
  sidebarBrandInnerClass,
  sidebarBrandLinkClass,
  sidebarBrandLogoClass,
  sidebarBrandSubtitleClass,
  sidebarBrandTitleClass,
  sidebarRailClass,
  sidebarReportGroupChevronClass,
  sidebarReportGroupClass,
  sidebarReportGroupLeadIconClass,
  sidebarReportGroupListClass,
  sidebarReportGroupTitleTextWrapClass,
  sidebarReportGroupTitleWrapClass,
  sidebarReportGroupsWrapClass,
  sidebarReportsSummaryClass,
  sidebarRootClass,
  sidebarSectionLabelClass,
  sidebarSectionSeparatorClass,
} from './navStyles'

type ReportGroupItem = {
  to: string
  label: string
  iconName: IconName
}

function SidebarReportGroup({
  title,
  items,
  activePrefix,
  leadIconName = 'fileCheck',
}: {
  title: string
  items: ReportGroupItem[]
  activePrefix: string
  leadIconName?: IconName
}) {
  const { pathname } = useLocation()
  const isGroupActive = pathname.startsWith(activePrefix)
  return (
    <details className={`group ${sidebarReportGroupClass}`} open={isGroupActive}>
      <summary className={sidebarReportsSummaryClass}>
        <span className={sidebarReportGroupTitleWrapClass}>
          <span className={sidebarReportGroupTitleTextWrapClass}>
            <Icon name={leadIconName} className={sidebarReportGroupLeadIconClass} />
            <span>{title}</span>
          </span>
          <Icon name="chevronDown" className={sidebarReportGroupChevronClass} />
        </span>
      </summary>
      <ul className={sidebarReportGroupListClass}>
        {items.map((item) => (
          <li key={item.to}>
            <SidebarRouteSublink to={item.to} end iconName={item.iconName}>
              {item.label}
            </SidebarRouteSublink>
          </li>
        ))}
      </ul>
    </details>
  )
}

function SidebarRouteSublink({
  to,
  end,
  iconName,
  children,
}: {
  to: string
  end?: boolean
  iconName?: IconName
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
      <span className={navSublinkContentClass}>
        {iconName ? <Icon name={iconName} className={navSublinkIconClass({ isActive })} /> : null}
        <span>{children}</span>
      </span>
    </Link>
  )
}

export function AppSidebar() {
  return (
    <aside className={sidebarRootClass}>
      <div className={sidebarRailClass}>
        <Link to="/players" className={sidebarBrandLinkClass}>
          <div className={sidebarBrandInnerClass}>
            <img
              src="/favicon.svg"
              alt=""
              width={36}
              height={36}
              decoding="async"
              className={sidebarBrandLogoClass}
              aria-hidden
            />
            <div className="min-w-0 flex-1 pt-0.5">
              <p className={sidebarBrandTitleClass}>ScoutLedger</p>
              <p className={sidebarBrandSubtitleClass}>
                Scout reports · roster
              </p>
              <p className={sidebarBrandDividerClass} />
            </div>
          </div>
        </Link>

        <p className={`${sidebarSectionLabelClass} pt-1`}>Scouting</p>
        <NavLink to="/players" className={navLinkClass}>
          {({ isActive }) => (
            <span className={navMainContentClass}>
              <Icon name="users" className={navMainIconClass({ isActive })} />
              <span>Players</span>
            </span>
          )}
        </NavLink>
        <NavLink to="/compare" className={navLinkClass}>
          {({ isActive }) => (
            <span className={navMainContentClass}>
              <Icon name="gitCompare" className={navMainIconClass({ isActive })} />
              <span>Compare</span>
            </span>
          )}
        </NavLink>

        <div className={sidebarReportGroupsWrapClass}>
          <SidebarReportGroup
            title="Player Reports"
            activePrefix="/player-reports"
            leadIconName="fileCheck"
            items={[
              { to: '/player-reports/create', label: 'Create report', iconName: 'filePlus' },
              { to: '/player-reports', label: 'View reports', iconName: 'files' },
              { to: '/player-reports/edit', label: 'Edit reports', iconName: 'fileEdit' },
            ]}
          />
          <SidebarReportGroup
            title="Draft Reports"
            activePrefix="/draft-reports"
            leadIconName="bell"
            items={[
              { to: '/draft-reports/create', label: 'Create draft', iconName: 'filePlus' },
              { to: '/draft-reports', label: 'View drafts', iconName: 'search' },
              { to: '/draft-reports/edit', label: 'Edit drafts', iconName: 'info' },
            ]}
          />
        </div>

        <hr className={sidebarSectionSeparatorClass} aria-hidden />

        <p className={sidebarSectionLabelClass}>Sporting director</p>
        <div className={sidebarReportGroupsWrapClass}>
          <SidebarReportGroup
            title="Club Vision Strategy"
            activePrefix="/director-pipelines"
            leadIconName="circleHelp"
            items={[
              { to: '/director-pipelines/create', label: 'Create vision', iconName: 'checkCircle' },
              { to: '/director-pipelines', label: 'View pipelines', iconName: 'gitCompare' },
              { to: '/director-pipelines/edit', label: 'Edit pipeline', iconName: 'alertTriangle' },
            ]}
          />
          <SidebarReportGroup
            title="Sportive Strategy"
            activePrefix="/sportive-strategy/playing-style"
            leadIconName="circleHelp"
            items={[
              {
                to: '/sportive-strategy/playing-style/create',
                label: 'Create playing style',
                iconName: 'filePlus',
              },
              {
                to: '/sportive-strategy/playing-style',
                label: 'View playing styles',
                iconName: 'files',
              },
              {
                to: '/sportive-strategy/playing-style/edit',
                label: 'Edit playing style',
                iconName: 'fileEdit',
              },
            ]}
          />
          <SidebarReportGroup
            title="Organization"
            activePrefix="/sportive-strategy/organization"
            leadIconName="files"
            items={[
              {
                to: '/sportive-strategy/organization',
                label: 'Overview',
                iconName: 'fileCheck',
              },
            ]}
          />
          <SidebarReportGroup
            title="Recruitment"
            activePrefix="/sportive-strategy/recruitment"
            leadIconName="search"
            items={[
              {
                to: '/sportive-strategy/recruitment',
                label: 'Overview',
                iconName: 'fileCheck',
              },
            ]}
          />
        </div>
      </div>
    </aside>
  )
}
