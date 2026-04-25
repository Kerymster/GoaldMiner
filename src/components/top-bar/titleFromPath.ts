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
    return { title: 'Playing Style', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/organization') {
    return { title: 'Organization', subtitle: 'Sportive Strategy module' }
  }
  if (pathname === '/sportive-strategy/recruitment') {
    return { title: 'Recruitment', subtitle: 'Sportive Strategy module' }
  }
  return { title: 'Overview' }
}
