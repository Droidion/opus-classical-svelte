<script lang="ts">
  import type { Link } from "$lib/db/links";

  interface Props {
    link: Link;
  }

  let { link }: Props = $props();
  let fullLink = $derived(link.linkPrefix + link.recordingLink);
</script>

<div class="mr-2 mt-2">
  <a href={fullLink}>
    <img
      src={`/images/${link.icon}`}
      height="24"
      width="24"
      alt={link.streamer}
    />
  </a>
</div>
