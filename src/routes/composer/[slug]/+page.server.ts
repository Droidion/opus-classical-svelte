import type { PageServerLoad } from "./$types";
import { composerRepo } from "$lib/db/composers";
import { workRepo } from "$lib/db/works";
import { type Work } from "$lib/db/works";

export interface GenreWithWorks {
  genreName: string;
  works: Work[];
}

export const load: PageServerLoad = async ({ params }) => {
  const composer = await composerRepo.getComposerBySlug(params.slug);
  if (!composer) {
    return;
  }
  const works = await workRepo.getWorksByComposerId(composer.id);
  console.log(works);
  const genresWithWorks = Object.values(
    works.reduce<Record<string, GenreWithWorks>>((acc, work) => {
      if (!acc[work.genreName]) {
        acc[work.genreName] = { genreName: work.genreName, works: [] };
      }
      acc[work.genreName].works.push(work);
      return acc;
    }, {}),
  );

  return {
    composer,
    genresWithWorks,
  };
};
