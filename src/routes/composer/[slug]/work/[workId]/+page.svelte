<script lang="ts">
  import type { PageData } from "./$types";
  import { PUBLIC_IMAGES_URL } from "$env/dynamic/public";
  import { formatWorkName, formatYearsRangeString } from "$lib/helpers";
  import RecordingCard from "$components/cards/RecordingCard.svelte";

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
  const composer = $derived(data.composer);
  const work = $derived(data.work);
  const recordingsWithPerformersAndLinks = $derived(
    data.recordingsWithPerformersAndLinks || [],
  );

  const workName = $derived(formatWorkName(work.title, work.no, work.nickname));
  const workYears = $derived(
    formatYearsRangeString(work.yearStart, work.yearFinish),
  );
  const link = $derived(`composer/${composer.slug}`);
</script>

<svelte:head>
  <title>{workName} | Opus Classical</title>
</svelte:head>

<div>
  <h1>
    <span>{workName}</span>
  </h1>
  <div class="mb-4 w-full text-center">
    <a href={link}>
      {composer.firstName}
      {composer.lastName}
    </a>{#if workYears}
      <span>, {workYears}</span>
    {/if}
  </div>
  <h2>Recommended Recordings</h2>
  <hr />
  <div class="full-width mb-4 flex flex-wrap">
    {#each recordingsWithPerformersAndLinks as recording}
      <RecordingCard
        links={recording.links}
        performers={recording.performers}
        recording={recording.recording}
        imagesUrl={PUBLIC_IMAGES_URL}
      />
    {/each}
  </div>
</div>
