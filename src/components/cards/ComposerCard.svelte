<script lang='ts'>
  import type { Composer } from '$lib/db/composers'
  import { formatYearsRangeString } from '$lib/helpers'

  interface Props {
    composer: Composer
  }

  const { composer }: Props = $props()
  const composerLink = $derived(`/composer/${composer.slug}`)
  const yearsRange = $derived(
    formatYearsRangeString(composer.yearBorn, composer.yearDied),
  )
</script>

<a href={composerLink}>
  <div class='mb-3 mr-6'>
    <div>
      <span>{composer.lastName},</span>
      <span class='font-light'>{composer.firstName}</span>
    </div>
    <div class='text-xs font-light whitespace-nowrap'>
      <span>{composer.countries}</span>
      <span class='vertical-separator'></span>
      <span>{yearsRange}</span>
    </div>
  </div>
</a>
