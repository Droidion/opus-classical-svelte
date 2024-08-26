import type { PageServerLoad } from "./$types";
import { composerRepo, type Composer } from "$lib/db/composers";
import { workRepo } from "$lib/db/works";
import { recordingRepo } from "$lib/db/recordings";
import { type Recording } from "$lib/db/recordings";
import { performerRepo } from "$lib/db/performers";
import { type Performer } from "$lib/db/performers";
import { linkRepo } from "$lib/db/links";
import { type Link } from "$lib/db/links";
import { type Work } from "$lib/db/works";
import { error } from "@sveltejs/kit";

export interface RecordingWithPerformersAndLinks {
  recording: Recording;
  performers: Performer[];
  links: Link[];
}

export const load: PageServerLoad = async ({
  params,
}): Promise<{
  composer: Composer;
  work: Work;
  recordingsWithPerformersAndLinks: RecordingWithPerformersAndLinks[];
}> => {
  const work = await workRepo.getWorkById(Number(params.workId));
  const composer = await composerRepo.getComposerBySlug(params.slug);
  if (!composer || !work) {
    throw error(404, "Composer or work not found");
  }
  const recordings = await recordingRepo.getRecordingsByWork(work.id);
  const recordingsIds = recordings.map((recording: Recording) => recording.id);
  const performers =
    await performerRepo.getPerformersByRecordings(recordingsIds);
  const links = await linkRepo.getLinksByRecordings(recordingsIds);
  const recordingsWithPerformersAndLinks = recordings.map(
    (recording: Recording) => {
      return {
        recording,
        performers: performers.filter(
          (performer: Performer) => performer.recordingId === recording.id,
        ),
        links: links.filter((link: Link) => link.recordingId === recording.id),
      };
    },
  );

  return {
    composer,
    work,
    recordingsWithPerformersAndLinks,
  };
};
