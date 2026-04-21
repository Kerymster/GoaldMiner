import { playerDetailNoteClass } from './playerDetailStyles'

type PlayerDetailNoteProps = {
  note: string
}

export function PlayerDetailNote({ note }: PlayerDetailNoteProps) {
  return <p className={playerDetailNoteClass}>{note}</p>
}
