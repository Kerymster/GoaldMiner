import type { Player } from '../types/player'

export const players: Player[] = [
  {
    id: '1',
    name: 'Amine Bassi',
    team: 'Paris FC',
    teamId: 'paris-fc',
    position: 'Attacking midfielder',
    rating: 7.8,
    underratedScore: 88,
    note: 'Consistent progressive carries with low media spotlight.',
  },
  {
    id: '2',
    name: 'Donatien Gomis',
    team: 'En Avant Guingamp',
    teamId: 'ea-guingamp',
    position: 'Winger',
    rating: 7.4,
    underratedScore: 91,
    note: 'Elite off-ball runs; assist numbers undercount impact.',
  },
  {
    id: '3',
    name: 'André Sousa',
    team: 'Santa Clara',
    teamId: 'santa-clara',
    position: 'Center back',
    rating: 7.6,
    underratedScore: 85,
    note: 'Quiet defensive organizer; rarely on highlight reels.',
  },
  {
    id: '4',
    name: 'João Amorim',
    team: 'Leixões SC',
    teamId: 'leixoes',
    position: 'Striker',
    rating: 7.9,
    underratedScore: 79,
    note: 'Finishing efficiency above league average xG delta.',
  },
]

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id)
}
