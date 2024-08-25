<script lang="ts">
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

{#each data.periods as period}
  <div>{period.name}</div>
{/each}
