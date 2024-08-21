<script lang="ts">
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let count = $state(0);
  function increment() {
    count += 1;
  }
</script>

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button onclick={increment}>
  clicks: {count}
</button>

{#each data.periods as period}
  <div>{period.name}</div>
{/each}
