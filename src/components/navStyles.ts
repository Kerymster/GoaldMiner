/** Sidebar nav — dark füme rail */
export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-gold-500/18 text-gold-200 shadow-[inset_0_0_0_1px_rgba(212,168,74,0.25)]'
      : 'text-fume-300 hover:bg-fume-800/90 hover:text-fume-50',
  ].join(' ')

export const navSublinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-2 py-1.5 text-sm transition-colors duration-200',
    isActive
      ? 'bg-fume-800 font-medium text-gold-300'
      : 'text-fume-400 hover:bg-fume-800/70 hover:text-fume-200',
  ].join(' ')
