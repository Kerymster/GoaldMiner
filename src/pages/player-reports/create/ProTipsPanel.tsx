export function ProTipsPanel() {
  return (
    <aside className="rounded-xl border border-gold-500/25 bg-gold-500/5 p-4 dark:border-gold-500/20 dark:bg-gold-500/10">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-400">
        Pro tips
      </p>
      <ul className="mt-3 space-y-2 text-sm text-fume-700 dark:text-fume-300">
        <li>
          <span className="font-medium text-fume-900 dark:text-fume-100">Keep it short.</span>{' '}
          Aim for one to two pages when exported — every field should earn its place.
        </li>
        <li>
          <span className="font-medium text-fume-900 dark:text-fume-100">Stay objective.</span>{' '}
          Avoid vague praise; explain why something is a strength or weakness.
        </li>
        <li>
          <span className="font-medium text-fume-900 dark:text-fume-100">Commit to a verdict.</span>{' '}
          “Do not sign”, “risky investment”, and “priority target” are all valid outcomes.
        </li>
        <li>
          <span className="font-medium text-fume-900 dark:text-fume-100">Eye test + data.</span>{' '}
          Combine what you see with how the numbers support or challenge it.
        </li>
      </ul>
    </aside>
  )
}
