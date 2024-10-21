import { inArray } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { getDb } from './index'

export const performersTable = pgTable('performers_with_instruments', {
  recordingId: integer('recording_id').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name').notNull(),
  instrument: text('instrument').notNull(),
  priority: integer('priority'),
})

export type Performer = typeof performersTable.$inferSelect

async function getPerformersByRecordings(
  recordingIds: number[],
): Promise<Performer[]> {
  return getDb()
    .select()
    .from(performersTable)
    .where(inArray(performersTable.recordingId, recordingIds))
}

export const performerRepo = {
  getPerformersByRecordings,
}
