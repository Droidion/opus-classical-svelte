<script lang="ts">
  import { registerSW } from "virtual:pwa-register";
  import "../app.css";
  import Footer from "$components/layout/Footer.svelte";
  import Header from "$components/layout/Header.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  onMount(() => {
    if (browser) {
      const updateSW = registerSW({
        onNeedRefresh() {
          // Prompt user to refresh
        },
        onOfflineReady() {
          // Notify user app is ready for offline use
        },
      });
    }
  });
</script>

<div
  class="grid justify-items-center min-h-screen w-full grid-rows-[auto_1fr_auto]"
>
  <Header />
  <main
    class="main flex flex-col w-full max-w-screen-xl overflow-auto px-4 pb-4"
  >
    <slot></slot>
  </main>
  <Footer />
</div>
