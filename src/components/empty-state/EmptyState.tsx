import type { ReactNode } from 'react'
import { Icon } from '../icons'
import {
  emptyStateContainerClass,
  emptyStateDescriptionClass,
  emptyStateHelperClass,
  emptyStateIconWrapClass,
  emptyStateTitleClass,
} from './emptyStateStyles'

type EmptyStateProps = {
  title: string
  description: string
  helper?: string
  icon?: 'search' | 'fileCheck' | 'circleHelp'
  extra?: ReactNode
}

export function EmptyState({
  title,
  description,
  helper,
  icon = 'search',
  extra,
}: EmptyStateProps) {
  return (
    <div className={emptyStateContainerClass} role="status" aria-live="polite">
      <div className="space-y-3">
        <span className={emptyStateIconWrapClass}>
          <Icon name={icon} size={18} />
        </span>
        <div className="space-y-1.5">
          <h3 className={emptyStateTitleClass}>{title}</h3>
          <p className={emptyStateDescriptionClass}>{description}</p>
          {helper ? (
            <p className={emptyStateHelperClass}>{helper}</p>
          ) : null}
        </div>
        {extra ? <div>{extra}</div> : null}
      </div>
    </div>
  )
}
