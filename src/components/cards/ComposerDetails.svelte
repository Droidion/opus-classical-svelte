<script lang="ts">
  import type { Composer } from "$lib/db/composers";
  import { formatYearsRangeString } from "$lib/helpers";

  interface Props {
    composer: Composer;
  }

  let { composer }: Props = $props();
  let yearsRange = $derived(
    formatYearsRangeString(composer.yearBorn, composer.yearDied),
  );
</script>

<h1>
  <span>{composer.firstName}</span>
  <span>&nbsp;</span>
  <span>{composer.lastName}</span>
</h1>
<div class="mb-4 w-full text-center">
  <span>{composer.countries}</span>
  <span class="vertical-separator"></span>
  <span>{yearsRange}</span>
  {#if composer.wikipediaLink}
    <span class="vertical-separator"></span>
    <a href={composer.wikipediaLink}>Wikipedia</a>
  {/if}
  {#if composer.imslpLink}
    <span class="vertical-separator"></span>
    <a href={composer.imslpLink}>IMSLP</a>
  {/if}
</div>
