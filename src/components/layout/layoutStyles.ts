/**
 * App shell: sidebar layout, main column, content max-width.
 * Keep in sync with `src/components/Layout.tsx`.
 */

export const layoutRootClass =
  'min-h-dvh bg-bg-canvas font-sans text-text-primary dark:bg-bg-emphasis dark:text-text-inverse'

export const layoutBodyRowClass = 'flex min-h-dvh flex-col md:flex-row'

export const layoutMainColumnClass = 'relative flex min-w-0 flex-1 flex-col'

/**
 * Full-bleed tactical backdrop for the main column — theme-specific assets:
 * `public/images/background-light.png` / `public/images/background-dark.png`.
 * `md:bg-fixed` ties `cover` sizing to the viewport so long pages (e.g. report detail) do not
 * stretch the painting box and over-zoom the artwork; below `md` we keep default attachment (scroll) for fewer iOS issues.
 */
export const layoutPageBackdropImageClass =
  'pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-[0.68] md:bg-fixed [background-image:url(/images/background-light.png)] dark:[background-image:url(/images/background-dark.png)]'

/**
 * Light scrim so cards and body text stay readable without washing out the new artwork.
 * Dark mode uses a slightly stronger veil so the tactical art stays present but less dominant.
 */
export const layoutPageBackdropScrimClass =
  'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-shell/45 via-shell/25 to-shell/40 dark:from-fume-950/50 dark:via-fume-950/38 dark:to-fume-950/58'

export const layoutMainClass =
  'relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 md:py-8 lg:px-10'
