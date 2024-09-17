<script lang='ts'>
  import type { PageData } from './$types'
  import ComposerDetails from '$components/cards/ComposerDetails.svelte'
  import WorkCard from '$components/cards/WorkCard.svelte'

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()
  const composer = $derived(data.composer)
  const genresWithWorks = $derived(data.genresWithWorks || [])
</script>

<svelte:head>
  <title>{composer?.lastName} | Opus Classical</title>
</svelte:head>

<div>
  {#if composer}
    <ComposerDetails {composer} />
    {#each genresWithWorks as genreWithWorks}
      <h2>{genreWithWorks.genreName}</h2>
      <hr />
      <div class='mb-4 flex flex-wrap'>
        {#each genreWithWorks.works as work}
          <WorkCard {work} composerSlug={composer.slug} />
        {/each}
      </div>
    {/each}
  {/if}
</div>
