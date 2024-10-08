<script lang='ts'>
  import type { ComposerSearchResult } from '$lib/db/composerSearchResults'
  import { goto } from '$app/navigation'
  import Fuse from 'fuse.js'
  import ky from 'ky'

  let searchData: ComposerSearchResult[] = $state([])
  let searchResults: ComposerSearchResult[] = $state([])
  let isSearchVisible = $state(false)
  let selectedSearchResultIndex = $state(0)

  function search(q: string): void {
    const keys = ['firstName', 'lastName']
    const fuse = new Fuse(searchData, {
      keys,
    })

    searchResults = fuse
      .search(q)
      .map(result => result.item)
      .slice(0, 5)
  }

  async function fetchSearchData(): Promise<void> {
    searchData = await ky.get('/api/search').json()
  }

  async function showSearch(): Promise<void> {
    await fetchSearchData()
    isSearchVisible = true
  }

  function hideSearch(): void {
    searchResults = []
    isSearchVisible = false
  }

  function focus(el: HTMLElement): void {
    el.focus()
  }

  async function redirectOnSearchResult() {
    const selectedResult = searchResults[selectedSearchResultIndex]
    if (selectedResult) {
      await goto(`/composer/${selectedResult.slug}`)
      hideSearch()
    }
  }

  function moveSelectionUp() {
    selectedSearchResultIndex
      = selectedSearchResultIndex > 0
        ? selectedSearchResultIndex - 1
        : searchResults.length - 1
  }

  function moveSelectionDown() {
    selectedSearchResultIndex
      = selectedSearchResultIndex < searchResults.length - 1
        ? selectedSearchResultIndex + 1
        : 0
  }

  function clickOutside(
    node: HTMLElement,
    handler: () => void,
  ): { destroy: () => void } {
    const onClick = (event: MouseEvent) =>
      node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler()

    document.addEventListener('click', onClick, true)

    return {
      destroy() {
        document.removeEventListener('click', onClick, true)
      },
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.code === 'ArrowUp' && searchResults.length > 0) {
      moveSelectionUp()
    }
    else if (event.code === 'ArrowDown' && searchResults.length > 0) {
      moveSelectionDown()
    }
    else if (event.code === 'Escape') {
      hideSearch()
    }
    else if (event.code === 'Enter' && searchResults.length > 0) {
      redirectOnSearchResult()
    }
  }

  function handleSearchInput(event: { currentTarget: HTMLInputElement }): void {
    const inputEvent = event.currentTarget.value.trim()
    if (searchData.length > 0) {
      search(inputEvent)
    }
  }

  function handleResultHover(index: number): void {
    selectedSearchResultIndex = index
  }
</script>

<div
  class='search-button label cursor-pointer duration-150 hover:scale-125'
  role='button'
  aria-label='Search Icon'
  tabindex='0'
  onclick={showSearch}
  onkeypress={showSearch}
>
  <svg
    class='icon h-4 w-4 xl:h-5 xl:w-5'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='m23.809 21.646-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z'
    />
  </svg>
</div>

{#if isSearchVisible}
  <div
    role='link'
    tabindex='0'
    class='fixed inset-0 bg-black/35 backdrop-blur-sm'
    onkeydown={handleKeydown}
  >
    <div
      class='absolute left-[calc(50%-10rem)] top-32 w-80 rounded bg-white text-lg shadow-md dark:bg-mineshaft'
      use:clickOutside={hideSearch}
    >
      <input
        class='m-1.5 h-8 w-[calc(100%-0.8rem)] appearance-none rounded-sm border-0 bg-black/10 px-1.5 py-4 text-black placeholder:font-light focus:outline-none dark:text-white/80'
        type='search'
        placeholder='Search composers by last name'
        oninput={handleSearchInput}
        use:focus
      />
      {#each searchResults as composer, i}
        <a
          href='/composer/{composer.slug}'
          onmouseenter={() => handleResultHover(i)}
          data-sveltekit-preload-data='hover'
          onclick={hideSearch}
        >
          <div
            class={selectedSearchResultIndex === i
              ? 'mx-1.5 my-1 rounded-sm bg-black/10 px-2 py-0.5'
              : 'mx-1.5 my-1 rounded-sm px-2 py-0.5'}
          >
            {composer.lastName}, {composer.firstName}
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}
