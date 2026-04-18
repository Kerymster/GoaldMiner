type PlayerDetailNoteProps = {
  note: string
}

export function PlayerDetailNote({ note }: PlayerDetailNoteProps) {
  return (
    <p className="mt-8 border-t border-surface-divider pt-6 text-sm leading-relaxed text-fume-600 dark:text-fume-400">
      {note}
    </p>
  )
}
