<script lang="ts">
  import type { Recording } from "$lib/db/recordings";
  import { formatYearsRangeString, formatWorkLength } from "$lib/helpers";
  import PerformerCard from "./PerformerCard.svelte";
  import LinkCard from "./LinkCard.svelte";
  import { type Link } from "$lib/db/links";
  import type { Performer } from "$lib/db/performers";

  interface Props {
    imagesUrl: string;
    performers: Performer[];
    recording: Recording;
    links: Link[];
  }

  let { imagesUrl, performers, recording, links }: Props = $props();
  let imagePath = $derived(`${imagesUrl}/${recording.coverName}`);
  let recordingYears = $derived(
    formatYearsRangeString(recording.yearStart, recording.yearFinish),
  );
  let workLength = $derived(formatWorkLength(recording.length));
</script>

<div class="mb-6 mr-8 mt-2 flex min-w-full flex-1 xl:min-w-[450px]">
  <img
    class="cover float-left mr-4 h-24 w-24 border border-black/20 xl:mr-6 xl:h-52 xl:w-52 dark:border-white/20"
    src={imagePath}
    alt="Recording cover."
    width="400"
    height="400"
  />
  <div>
    {#each performers as performer}
      <PerformerCard {performer}></PerformerCard>
    {/each}
    <div class="text-xs font-light">
      <span>{recording.label}</span>
      <span class="vertical-separator"></span>
      <span>{recordingYears}</span>
      <span class="vertical-separator"></span>
      <span>{workLength}</span>
    </div>
    <div class="flex items-center">
      {#each links as link}
        <LinkCard {link} />
      {/each}
    </div>
  </div>
</div>
