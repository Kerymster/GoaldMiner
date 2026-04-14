import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { TopBar } from './TopBar'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh bg-fume-100 font-sans text-fume-900 dark:bg-fume-950 dark:text-fume-100">
      <div className="flex min-h-dvh flex-col md:flex-row">
        <AppSidebar />
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(196, 147, 46, 0.12), transparent 55%)',
            }}
          />
          <TopBar key={pathname} />
          <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 md:py-8 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
