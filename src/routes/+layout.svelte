<script lang="ts">
  import '../app.css';
</script>

<svelte:head>
  <script type="module" src="/js/theme-init.js" defer></script>
  <script type="module" src="/js/set-initial-theme.js"></script>
</svelte:head>

<div class="grid justify-items-center min-h-screen w-full grid-rows-[auto_1fr_auto]">
  <header>
    <nav>
      <!-- Admin Navigation links -->
      <a href="/admin/dashboard">Dashboard</a>
      <a href="/admin/settings">Settings</a>
    </nav>
  </header>

  <main>
    <slot></slot>
    <!-- Content of the admin pages will be injected here -->
  </main>

  <footer
    class="flex items-center justify-center w-full h-16 px-4 bg-black/20 dark:bg-mineshaft dark:xl:bg-codgray max-w-screen-xl xl:bg-white"
  >
    <a
      class="mx-3"
      title="Buy me a coffee"
      href="https://www.buymeacoffee.com/zunh"
      aria-label="Buy me a coffee"
      rel="noopener noreferrer"
    >
      <img alt="Buy me a coffee" class="h-8" width="128" height="36" src="/images/bmc-button.svg" />
    </a>
    <a
      class="mx-3"
      title="Github repository"
      href="https://github.com/Droidion/opus-classical-elysia"
      aria-label="Github repository"
      rel="noopener noreferrer"
    >
    </a>
  </footer>
</div>
