/**
 * App sidebar — primary and nested route links (`AppSidebar`).
 * Classes are functions so active state merges without string duplication at call sites.
 */

export const sidebarRootClass =
  'flex w-full shrink-0 flex-col border-b border-fume-800/80 bg-fume-900 md:w-60 md:border-r md:border-b-0 md:min-h-dvh md:shadow-[4px_0_24px_-4px_var(--shadow-elevated-soft)]'

/** Scroll only when content exceeds viewport; scrollbar track hidden (still scrolls with wheel / touch). */
export const sidebarRailClass =
  'flex flex-col gap-1 p-3 md:sticky md:top-0 md:max-h-dvh md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'

export const sidebarBrandLinkClass =
  'mb-3 block rounded-lg px-2 pb-3 outline-none ring-offset-2 ring-offset-fume-900 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gold-500/45'

export const sidebarBrandInnerClass = 'flex items-start gap-2.5 border-b border-fume-800/80 pb-3'
export const sidebarBrandLogoClass = 'h-9 w-9 shrink-0 rounded-lg shadow-sm ring-1 ring-fume-800/90'
export const sidebarBrandTitleClass =
  'font-headline text-base font-bold tracking-tight text-fume-50'
export const sidebarBrandSubtitleClass =
  'mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400'
export const sidebarBrandDividerClass = 'mt-2 h-px w-8 bg-gradient-to-r from-gold-500 to-transparent'

/** Sidebar nav — dark slate rail */
export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-gold-500/12 text-gold-400 shadow-[inset_0_0_0_1px_var(--ring-gold-soft)]'
      : 'text-fume-300 hover:bg-fume-800/90 hover:text-fume-50',
  ].join(' ')

export const navSublinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-2 py-1.5 text-sm transition-colors duration-200',
    isActive
      ? 'bg-gold-500/12 font-medium text-gold-400 shadow-[inset_0_0_0_1px_var(--ring-gold-soft)]'
      : 'text-fume-400 hover:bg-fume-800/70 hover:text-fume-200',
  ].join(' ')

export const navMainContentClass = 'flex items-center gap-2'
export const navSublinkContentClass = 'flex items-center gap-2'

export const navMainIconClass = ({ isActive }: { isActive: boolean }) =>
  [
    'h-4 w-4 shrink-0 transition-colors duration-200',
    isActive ? 'text-gold-300' : 'text-fume-400',
  ].join(' ')

export const navSublinkIconClass = ({ isActive }: { isActive: boolean }) =>
  [
    'h-3.5 w-3.5 shrink-0 transition-colors duration-200',
    isActive ? 'text-gold-300' : 'text-fume-500',
  ].join(' ')

export const sidebarReportGroupsWrapClass = 'mt-2 space-y-2'

/**
 * Small caps label introducing a sidebar region (e.g. Scouting vs Sporting director).
 * Pairs with `sidebarSectionSeparatorClass` between major product areas.
 */
export const sidebarSectionLabelClass =
  'px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fume-500 dark:text-fume-400'

/** Full-width hairline between scouting workflows and sporting-director workflows. */
export const sidebarSectionSeparatorClass = 'mx-1 my-3 border-0 border-t border-fume-800/80 dark:border-fume-700/60'
export const sidebarReportsSummaryClass =
  'cursor-pointer list-none rounded-lg px-2.5 py-2 text-xs font-semibold text-fume-200 transition-colors marker:hidden hover:bg-fume-800/70 [&::-webkit-details-marker]:hidden'
export const sidebarReportGroupClass =
  'rounded-xl border border-fume-800/90 bg-gradient-to-b from-fume-900 to-[var(--surface-ink-deep)] px-2.5 py-2 shadow-[0_8px_20px_-14px_var(--shadow-elevated-panel)]'
export const sidebarReportGroupTitleWrapClass = 'flex items-center justify-between gap-2'
export const sidebarReportGroupTitleTextWrapClass = 'flex items-center gap-2'
export const sidebarReportGroupLeadIconClass = 'h-4 w-4 text-gold-400/90'
export const sidebarReportGroupChevronClass =
  'h-3.5 w-3.5 shrink-0 text-fume-500 transition-transform group-open:rotate-180'
export const sidebarReportGroupListClass = 'mt-2 space-y-1 border-l border-gold-500/25 pl-2.5'
