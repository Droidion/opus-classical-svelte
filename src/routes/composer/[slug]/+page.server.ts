import type { Work } from '$lib/db/works'
import type { PageServerLoad } from './$types'
import { composerRepo } from '$lib/db/composers'
import { workRepo } from '$lib/db/works'
import { error } from '@sveltejs/kit'

export interface GenreWithWorks {
  genreName: string
  works: Work[]
}

export const load: PageServerLoad = async ({ params }) => {
  const composer = await composerRepo.getComposerBySlug(params.slug)
  if (!composer) {
    error(404, 'Composer not found')
  }
  const works = await workRepo.getWorksByComposerId(composer.id)
  const genresWithWorks = Object.values(
    works.reduce<Record<string, GenreWithWorks>>((acc, work) => {
      if (!acc[work.genreName]) {
        acc[work.genreName] = { genreName: work.genreName, works: [] }
      }
      acc[work.genreName].works.push(work)
      return acc
    }, {}),
  )

  return {
    composer,
    genresWithWorks,
  }
}
