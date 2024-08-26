<script lang="ts">
  import type { Work } from "$lib/db/works";
  import {
    formatYearsRangeString,
    formatWorkName,
    formatCatalogueName,
    formatWorkLength,
  } from "$lib/helpers";

  interface Props {
    work: Work;
    composerSlug: string;
  }

  let { work, composerSlug }: Props = $props();
  let workName = $derived(formatWorkName(work.title, work.no, work.nickname));
  let catalogueName = $derived(
    formatCatalogueName(
      work.catalogueName,
      work.catalogueNumber,
      work.cataloguePostfix,
    ),
  );
  let yearsRange = $derived(
    formatYearsRangeString(work.yearStart, work.yearFinish),
  );
  let workLength = $derived(formatWorkLength(work.averageMintues));
  let link = $derived(`/composer/${composerSlug}/work/${work.id}`);
</script>

<a href={link}>
  <div class="mb-3 mr-6">
    <div>
      <span>{workName}</span>
    </div>
    <div class="text-xs font-light">
      {#if catalogueName}
        <span>{catalogueName}</span>
        {#if yearsRange || workLength}
          <span class="vertical-separator"></span>
        {/if}
      {/if}
      {#if yearsRange}
        <span>{yearsRange}</span>
        {#if workLength}
          <span class="vertical-separator"></span>
        {/if}
      {/if}
      {workLength}
    </div>
  </div>
</a>
