import type { SVGProps } from 'react'
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Info,
  Search,
  X,
  type LucideIcon,
} from 'lucide-react'

export type IconName =
  | 'alertTriangle'
  | 'bell'
  | 'checkCircle'
  | 'chevronDown'
  | 'circleHelp'
  | 'close'
  | 'info'
  | 'search'

const ICON_MAP: Record<IconName, LucideIcon> = {
  alertTriangle: AlertTriangle,
  bell: Bell,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  circleHelp: CircleHelp,
  close: X,
  info: Info,
  search: Search,
}

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

export function Icon({ name, size = 18, ...props }: IconProps) {
  const LucideIcon = ICON_MAP[name]
  return <LucideIcon size={size} aria-hidden {...props} />
}
