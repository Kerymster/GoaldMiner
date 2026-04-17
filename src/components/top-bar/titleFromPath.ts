export function titleFromPath(pathname: string): {
  title: string
  subtitle?: string
} {
  if (pathname === '/players' || pathname === '/') {
    return { title: 'Players', subtitle: 'Browse underrated picks' }
  }
  if (pathname.startsWith('/players/')) {
    return { title: 'Player profile', subtitle: 'Stats and notes' }
  }
  if (pathname === '/compare') {
    return { title: 'Compare', subtitle: 'Side-by-side view' }
  }
  if (pathname === '/leagues') {
    return { title: 'Leagues', subtitle: 'Second-tier focus' }
  }
  if (pathname.startsWith('/leagues/')) {
    return { title: 'League', subtitle: 'Teams and context' }
  }
  if (pathname === '/teams') {
    return { title: 'Teams', subtitle: 'By country and league' }
  }
  if (pathname.startsWith('/teams/')) {
    return { title: 'Team', subtitle: 'Roster' }
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
  return { title: 'Overview' }
}
