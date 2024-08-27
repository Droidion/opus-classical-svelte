import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { db } from "./index";
import { eq } from "drizzle-orm";
import { composersTable } from "./composers";

export const worksTable = pgTable("works_with_genres", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  yearStart: integer("year_start"),
  yearFinish: integer("year_finish"),
  averageMintues: integer("average_minutes").notNull(),
  catalogueName: text("catalogue_name"),
  catalogueNumber: integer("catalogue_number"),
  cataloguePostfix: text("catalogue_postfix"),
  no: integer("no"),
  nickname: text("nickname"),
  composerId: integer("composer_id")
    .notNull()
    .references(() => composersTable.id),
  sort: integer("sort"),
  genreId: integer("genre_id").notNull(),
  genreName: text("genre_name").notNull(),
});

export type Work = typeof worksTable.$inferSelect;

async function getWorkById(id: number): Promise<Work | undefined> {
  const works = await db.select().from(worksTable).where(eq(worksTable.id, id));
  if (works.length === 0) {
    return;
  }
  return works[0];
}

async function getWorksByComposerId(composerId: number): Promise<Work[]> {
  return await db
    .select()
    .from(worksTable)
    .where(eq(worksTable.composerId, composerId))
    .orderBy(worksTable.genreName, worksTable.sort, worksTable.catalogueNumber);
}

interface WorkRepo {
  getWorkById(id: number): Promise<Work | undefined>;
  getWorksByComposerId(composerId: number): Promise<Work[]>;
}

export const workRepo: WorkRepo = {
  getWorkById,
  getWorksByComposerId,
};
