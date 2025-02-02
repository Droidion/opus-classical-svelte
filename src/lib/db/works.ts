import { eq } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { composersTable } from './composers'
import { getDb } from './index'

export const worksTable = pgTable('works_with_genres', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  yearStart: integer('year_start'),
  yearFinish: integer('year_finish'),
  averageMintues: integer('average_minutes').notNull(),
  catalogueName: text('catalogue_name'),
  catalogueNumber: integer('catalogue_number'),
  cataloguePostfix: text('catalogue_postfix'),
  no: integer('no'),
  nickname: text('nickname'),
  composerId: integer('composer_id')
    .notNull()
    .references(() => composersTable.id),
  sort: integer('sort'),
  genreId: integer('genre_id').notNull(),
  genreName: text('genre_name').notNull(),
})

export type Work = typeof worksTable.$inferSelect

async function getWorkById(id: number): Promise<Work | undefined> {
  const works = await getDb().select().from(worksTable).where(eq(worksTable.id, id))
  if (works.length === 0) {
    return
  }
  return works[0]
}

async function getWorksByComposerId(composerId: number): Promise<Work[]> {
  return await getDb()
    .select()
    .from(worksTable)
    .where(eq(worksTable.composerId, composerId))
    .orderBy(worksTable.genreName, worksTable.sort, worksTable.catalogueNumber)
}

export const workRepo = {
  getWorkById,
  getWorksByComposerId,
}
