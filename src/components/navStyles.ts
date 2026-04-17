/** Sidebar nav — dark slate rail */
export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-gold-500/12 text-gold-400 shadow-[inset_0_0_0_1px_rgba(217,119,6,0.22)]'
      : 'text-fume-300 hover:bg-fume-800/90 hover:text-fume-50',
  ].join(' ')

export const navSublinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-2 py-1.5 text-sm transition-colors duration-200',
    isActive
      ? 'bg-gold-500/12 font-medium text-gold-400 shadow-[inset_0_0_0_1px_rgba(217,119,6,0.22)]'
      : 'text-fume-400 hover:bg-fume-800/70 hover:text-fume-200',
  ].join(' ')
