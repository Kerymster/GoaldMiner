const proTipsPanelClass =
  'rounded-xl border border-gold-600/30 bg-gradient-to-br from-gold-50 to-gold-100/70 p-4 shadow-sm shadow-gold-900/10 ring-1 ring-gold-800/5 dark:border-gold-300/28 dark:bg-gradient-to-br dark:from-[var(--panel-protips-from)] dark:via-[var(--panel-protips-via)] dark:to-[var(--panel-protips-to)] dark:shadow-[0_14px_30px_-20px_var(--shadow-elevated-panel)] dark:ring-1 dark:ring-gold-200/18'

const proTipsHeadingClass =
  'text-xs font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-200'

const proTipsListClass = 'mt-3 space-y-2 text-sm text-fume-700 dark:text-fume-100/88'

const proTipsStrongClass = 'font-medium text-fume-900 dark:text-gold-300/95'

export function ProTipsPanel() {
  return (
    <aside className={proTipsPanelClass}>
      <p className={proTipsHeadingClass}>Pro tips</p>
      <ul className={proTipsListClass}>
        <li>
          <span className={proTipsStrongClass}>Keep it short.</span>{' '}
          Aim for one to two pages when exported — every field should earn its place.
        </li>
        <li>
          <span className={proTipsStrongClass}>Stay objective.</span>{' '}
          Avoid vague praise; explain why something is a strength or weakness.
        </li>
        <li>
          <span className={proTipsStrongClass}>Commit to a verdict.</span>{' '}
          “Do not sign”, “risky investment”, and “priority target” are all valid outcomes.
        </li>
        <li>
          <span className={proTipsStrongClass}>Eye test + data.</span>{' '}
          Combine what you see with how the numbers support or challenge it.
        </li>
      </ul>
    </aside>
  )
}
