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
  icon?: 'search' | 'fileCheck' | 'circleHelp' | 'alertTriangle'
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
      <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
        <span className={emptyStateIconWrapClass} aria-hidden>
          <Icon name={icon} className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.75} />
        </span>
        <div className="flex w-full flex-col items-center gap-1.5">
          <h3 className={emptyStateTitleClass}>{title}</h3>
          <p className={emptyStateDescriptionClass}>{description}</p>
          {helper ? (
            <p className={emptyStateHelperClass}>{helper}</p>
          ) : null}
        </div>
        {extra ? (
          <div className="mt-1 flex w-full flex-col items-center justify-center">{extra}</div>
        ) : null}
      </div>
    </div>
  )
}
