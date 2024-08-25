<script lang="ts">
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

{#each data.periodsWithComposers as periodWithComposers}
  <h1>{periodWithComposers.period.name}</h1>
  {#each periodWithComposers.composers as composer}
    <div>{composer.firstName} {composer.lastName}</div>
  {/each}
{/each}
