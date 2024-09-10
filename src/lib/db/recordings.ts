import { eq } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { db } from './index'
import { worksTable } from './works'

export const recordingsTable = pgTable('recordings_with_labels', {
  id: integer('id').primaryKey(),
  coverName: text('cover_name').notNull(),
  length: integer('length').notNull(),
  label: text('label').notNull(),
  workId: integer('work_id').references(() => worksTable.id),
  yearStart: integer('year_start'),
  yearFinish: integer('year_finish'),
})

export type Recording = typeof recordingsTable.$inferSelect

async function getRecordingsByWork(workId: number): Promise<Recording[]> {
  return db
    .select()
    .from(recordingsTable)
    .where(eq(recordingsTable.workId, workId))
    .orderBy(recordingsTable.yearFinish)
}

export const recordingRepo = {
  getRecordingsByWork,
}
