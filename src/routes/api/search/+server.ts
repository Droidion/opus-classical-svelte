import type { RequestHandler } from './$types'
import { composerSearchResultRepo } from '$lib/db/composerSearchResults'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  const composers = await composerSearchResultRepo.getComposerSearchResults()
  return json(composers)
}
