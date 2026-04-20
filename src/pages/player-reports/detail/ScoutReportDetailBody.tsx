import { useState } from 'react'
import type { ScoutReportForm } from '../../../types/scoutReportForm'
import {
  detailBodyShellStack,
  detailPageStack,
  detailTabButton,
  detailTabButtonActive,
  detailTabButtonIdle,
  detailTabHint,
  detailTabList,
} from './detailStyles'
import { DetailComparisonSection } from './sections/DetailComparisonSection'
import { DetailExecutiveSection } from './sections/DetailExecutiveSection'
import { DetailMentalSection } from './sections/DetailMentalSection'
import { DetailPhysicalSection } from './sections/DetailPhysicalSection'
import { DetailPlayerInformationSection } from './sections/DetailPlayerInformationSection'
import { DetailPlayingStyleSection } from './sections/DetailPlayingStyleSection'
import { DetailPotentialSection } from './sections/DetailPotentialSection'
import { DetailStatisticalSection } from './sections/DetailStatisticalSection'
import { DetailStrengthsWeaknessesSection } from './sections/DetailStrengthsWeaknessesSection'
import { DetailTacticalSection } from './sections/DetailTacticalSection'
import { DetailTeamFitSection } from './sections/DetailTeamFitSection'
import { DetailTechnicalSection } from './sections/DetailTechnicalSection'

type DetailTab = 'overview' | 'analysis'

export function ScoutReportDetailBody({ form }: { form: ScoutReportForm }) {
  const [tab, setTab] = useState<DetailTab>('overview')

  return (
    <div className={detailBodyShellStack}>
      <div>
        <div className={detailTabList} role="tablist" aria-label="Report sections">
          <button
            type="button"
            role="tab"
            id="tab-overview"
            aria-selected={tab === 'overview'}
            aria-controls="panel-overview"
            onClick={() => setTab('overview')}
            className={`${detailTabButton} ${tab === 'overview' ? detailTabButtonActive : detailTabButtonIdle}`}
          >
            Overview
          </button>
          <button
            type="button"
            role="tab"
            id="tab-analysis"
            aria-selected={tab === 'analysis'}
            aria-controls="panel-analysis"
            onClick={() => setTab('analysis')}
            className={`${detailTabButton} ${tab === 'analysis' ? detailTabButtonActive : detailTabButtonIdle}`}
          >
            Full analysis
          </button>
        </div>
        <p className={detailTabHint}>
          {tab === 'overview'
            ? 'Identity, narrative, style, pros/cons, and recommendation — the usual one-page read for staff.'
            : 'Technical, tactical, physical, mental, data, potential, and comparisons — for deeper review.'}
        </p>
      </div>

      {tab === 'overview' ? (
        <div
          id="panel-overview"
          role="tabpanel"
          aria-labelledby="tab-overview"
          className={detailPageStack}
        >
          <DetailPlayerInformationSection form={form} />
          <DetailExecutiveSection form={form} />
          <DetailPlayingStyleSection form={form} />
          <DetailStrengthsWeaknessesSection form={form} />
          <DetailTeamFitSection form={form} />
        </div>
      ) : (
        <div
          id="panel-analysis"
          role="tabpanel"
          aria-labelledby="tab-analysis"
          className={`${detailPageStack} lg:grid lg:grid-cols-2 lg:items-start lg:gap-5`}
        >
          <div className={detailPageStack}>
            <DetailTechnicalSection form={form} />
            <DetailTacticalSection form={form} />
            <DetailPhysicalSection form={form} />
          </div>
          <div className={detailPageStack}>
            <DetailMentalSection form={form} />
            <DetailStatisticalSection form={form} />
            <DetailPotentialSection form={form} />
            <DetailComparisonSection form={form} />
          </div>
        </div>
      )}
    </div>
  )
}
