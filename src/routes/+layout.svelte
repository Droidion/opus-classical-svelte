<script lang="ts">
  import { registerPWA } from "$lib/pwa";
  import "../app.css";
  import Footer from "$components/layout/Footer.svelte";
  import Header from "$components/layout/Header.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  onMount(() => {
    if (browser) {
      registerPWA();
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
