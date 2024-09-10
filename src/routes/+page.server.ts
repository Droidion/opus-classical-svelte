import { type Composer, composerRepo } from '$lib/db/composers'
import { type Period, periodRepo } from '$lib/db/periods'
import type { PageServerLoad } from './$types'

export interface PeriodsWithComposers {
  period: Period
  composers: Composer[]
}

export const load: PageServerLoad = async () => {
  const periods = await periodRepo.getPeriods()
  const composers = await composerRepo.getComposers()
  const periodsWithComposers = periods.map((period) => {
    return {
      period,
      composers: composers.filter(
        composer => composer.periodId === period.id,
      ),
    }
  })
  return {
    periodsWithComposers,
  }
}
