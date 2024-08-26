<script lang="ts">
  import type { Composer } from "$lib/db/composers";
  import { formatYearsRangeString } from "$lib/helpers";

  interface Props {
    composer: Composer;
  }

  let { composer }: Props = $props();
  let composerLink = $derived(`/composer/${composer.slug}`);
  let yearsRange = $derived(
    formatYearsRangeString(composer.yearBorn, composer.yearDied),
  );
</script>

<a href={composerLink}>
  <div class="mb-3 mr-6">
    <div>
      <span>{composer.lastName},&nbsp;</span>
      <span class="font-light">{composer.firstName}</span>
    </div>
    <div class="text-xs font-light whitespace-nowrap">
      <span>{composer.countries}</span>
      <span class="vertical-separator"></span>
      <span>{yearsRange}</span>
    </div>
  </div>
</a>
