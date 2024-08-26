<script lang="ts">
  import MainLogo from "$components/icons/MainLogo.svelte";
  import ThemeSwitcher from "$components/ui/ThemeSwitcher.svelte";
  import Search from "$components/ui/Search.svelte";
</script>

<header
  class="flex items-center justify-between w-full h-16 px-4 bg-black/20 top-0 z-10 max-w-screen-xl dark:bg-mineshaft dark:xl:bg-codgray xl:sticky xl:h-24 xl:bg-white"
>
  <MainLogo />
  <nav class="flex items-center menu">
    <div class="mr-4">
      <ThemeSwitcher />
    </div>
    <Search />
  </nav>
</header>
