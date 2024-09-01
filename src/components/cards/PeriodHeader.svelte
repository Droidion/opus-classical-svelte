<script lang='ts'>
  import type { Period } from '$lib/db/periods'
  import { formatYearsRangeString } from '$lib/helpers'

  interface Props {
    period: Period
  }

  const { period }: Props = $props()
  const yearsRange = $derived(
    formatYearsRangeString(period.yearStart, period.yearEnd),
  )
</script>

<h2>
  <span>{period.name}</span>
  <span> </span>
  <span>{yearsRange}</span>
</h2>
