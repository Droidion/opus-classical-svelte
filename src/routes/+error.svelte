<script>
  import { page } from "$app/stores";
</script>

{#if $page.status === 404}
  <img
    width="400"
    height="400"
    class="dark:invert dark:opacity-75 mx-auto mt-20"
    src="/images/404.webp"
    alt="Not found"
  />
{:else}
  <h1>{$page.status}: {$page.error?.message}</h1>
{/if}
