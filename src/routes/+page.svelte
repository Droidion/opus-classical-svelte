<script lang="ts">
  import type { PageData } from "./$types";
  import PeriodHeader from "$components/cards/PeriodHeader.svelte";
  import ComposerCard from "$components/cards/ComposerCard.svelte";

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

<svelte:head>
  <title>Composers | Opus Classical</title>
</svelte:head>

<div>
  <h1>Composers</h1>
  {#each data.periodsWithComposers as periodWithComposers}
    <PeriodHeader period={periodWithComposers.period} />
    <hr />
    <div class="mb-4 flex flex-wrap">
      {#each periodWithComposers.composers as composer}
        <ComposerCard {composer} />
      {/each}
    </div>
  {/each}
</div>
