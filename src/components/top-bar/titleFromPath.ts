export function titleFromPath(pathname: string): {
  title: string
  subtitle?: string
} {
  if (pathname === '/players' || pathname === '/') {
    return { title: 'Players', subtitle: 'Roster and ledger scores' }
  }
  if (pathname.startsWith('/players/')) {
    return { title: 'Player profile', subtitle: 'Stats and notes' }
  }
  if (pathname === '/compare') {
    return { title: 'Compare', subtitle: 'Side-by-side view' }
  }
  if (pathname === '/player-reports') {
    return { title: 'Player Reports', subtitle: 'View saved reports' }
  }
  if (pathname === '/player-reports/create') {
    return { title: 'Create report', subtitle: 'New player report' }
  }
  if (pathname.includes('/player-reports/players/') && pathname.includes('/reports/')) {
    return { title: 'Scout report', subtitle: 'Read-only detail' }
  }
  if (pathname === '/sportive-strategy/playing-style') {
    return { title: 'Playing styles', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/playing-style/create') {
    return { title: 'Create playing style', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/playing-style/edit') {
    return { title: 'Edit playing style', subtitle: 'Sportive Strategy module' }
  }
  if (
    /^\/sportive-strategy\/playing-style\/[^/]+$/.test(pathname) &&
    pathname !== '/sportive-strategy/playing-style/create' &&
    pathname !== '/sportive-strategy/playing-style/edit'
  ) {
    return { title: 'Playing style detail', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/organization') {
    return { title: 'Organization', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/organization/create') {
    return { title: 'Create organization', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/organization/edit') {
    return { title: 'Edit organization', subtitle: 'Sportive Strategy module' }
  }
  if (
    /^\/sportive-strategy\/organization\/[^/]+$/.test(pathname) &&
    pathname !== '/sportive-strategy/organization/create' &&
    pathname !== '/sportive-strategy/organization/edit'
  ) {
    return { title: 'Organization detail', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/recruitment') {
    return { title: 'Recruitment', subtitle: 'Sportive Strategy module' }
  }
  return { title: 'Overview' }
}
