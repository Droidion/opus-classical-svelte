import { composerSearchResultRepo } from '$lib/db/composerSearchResults'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const composers = await composerSearchResultRepo.getComposerSearchResults()
  return json(composers)
}
