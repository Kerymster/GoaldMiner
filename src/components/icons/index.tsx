import type { SVGProps } from 'react'
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileEdit,
  FileCheck2,
  FilePlus2,
  Files,
  GitCompareArrows,
  Info,
  Moon,
  Sun,
  Users,
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
  | 'fileEdit'
  | 'fileCheck'
  | 'filePlus'
  | 'files'
  | 'gitCompare'
  | 'info'
  | 'moon'
  | 'sun'
  | 'users'
  | 'search'

const ICON_MAP: Record<IconName, LucideIcon> = {
  alertTriangle: AlertTriangle,
  bell: Bell,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  circleHelp: CircleHelp,
  close: X,
  fileEdit: FileEdit,
  fileCheck: FileCheck2,
  filePlus: FilePlus2,
  files: Files,
  gitCompare: GitCompareArrows,
  info: Info,
  moon: Moon,
  sun: Sun,
  users: Users,
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
