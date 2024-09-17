<script lang='ts'>
  import type { Performer } from '$lib/db/performers'
  import type { Recording } from '$lib/db/recordings'
  import { type Link } from '$lib/db/links'
  import { formatWorkLength, formatYearsRangeString } from '$lib/helpers'
  import LinkCard from './LinkCard.svelte'
  import PerformerCard from './PerformerCard.svelte'

  interface Props {
    imagesUrl: string
    performers: Performer[]
    recording: Recording
    links: Link[]
  }

  const { imagesUrl, performers, recording, links }: Props = $props()
  const imagePath = $derived(`${imagesUrl}/${recording.coverName}`)
  const recordingYears = $derived(
    formatYearsRangeString(recording.yearStart, recording.yearFinish),
  )
  const workLength = $derived(formatWorkLength(recording.length))
</script>

<div class='mb-6 mr-8 mt-2 flex min-w-full flex-1 xl:min-w-[450px]'>
  <img
    class='cover float-left mr-4 h-24 w-24 border border-black/20 xl:mr-6 xl:h-52 xl:w-52 dark:border-white/20'
    src={imagePath}
    alt='Recording cover.'
    width='400'
    height='400'
  />
  <div>
    {#each performers as performer}
      <PerformerCard {performer}></PerformerCard>
    {/each}
    <div class='text-xs font-light'>
      <span>{recording.label}</span>
      <span class='vertical-separator'></span>
      <span>{recordingYears}</span>
      <span class='vertical-separator'></span>
      <span>{workLength}</span>
    </div>
    <div class='flex items-center'>
      {#each links as link}
        <LinkCard {link} />
      {/each}
    </div>
  </div>
</div>
