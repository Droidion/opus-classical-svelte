<script lang='ts'>
  import {
    formatCatalogueName,
    formatWorkLength,
    formatWorkName,
    formatYearsRangeString,
  } from '$lib/helpers'
  import type { Work } from '$lib/db/works'

  interface Props {
    work: Work
    composerSlug: string
  }

  const { work, composerSlug }: Props = $props()
  const workName = $derived(formatWorkName(work.title, work.no, work.nickname))
  const catalogueName = $derived(
    formatCatalogueName(
      work.catalogueName,
      work.catalogueNumber,
      work.cataloguePostfix,
    ),
  )
  const yearsRange = $derived(
    formatYearsRangeString(work.yearStart, work.yearFinish),
  )
  const workLength = $derived(formatWorkLength(work.averageMintues))
  const link = $derived(`/composer/${composerSlug}/work/${work.id}`)
</script>

<a href={link}>
  <div class='mb-3 mr-6'>
    <div>
      <span>{workName}</span>
    </div>
    <div class='text-xs font-light'>
      {#if catalogueName}
        <span>{catalogueName}</span>
        {#if yearsRange || workLength}
          <span class='vertical-separator'></span>
        {/if}
      {/if}
      {#if yearsRange}
        <span>{yearsRange}</span>
        {#if workLength}
          <span class='vertical-separator'></span>
        {/if}
      {/if}
      {workLength}
    </div>
  </div>
</a>
