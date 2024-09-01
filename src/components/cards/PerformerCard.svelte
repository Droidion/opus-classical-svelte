<script lang='ts'>
  import type { Performer } from '$lib/db/performers'

  interface Props {
    performer: Performer
  }

  const { performer }: Props = $props()
</script>

<div class='mb-1.5 leading-5'>
  <span>
    {#if performer.firstName}
      {performer.firstName}<span>&nbsp;</span>
    {/if}
    {performer.lastName}
  </span>
  <span class='text-xs font-light'>{performer.instrument}</span>
</div>
