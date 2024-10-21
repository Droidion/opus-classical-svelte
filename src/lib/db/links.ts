import { inArray } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { getDb } from './index'

export const linksTable = pgTable('links_with_streamers', {
  recordingId: integer('recording_id').notNull(),
  recordingLink: text('recording_link').notNull(),
  streamer: text('streamer').notNull(),
  icon: text('icon'),
  linkPrefix: text('link_prefix').notNull(),
})

export type Link = typeof linksTable.$inferSelect

async function getLinksByRecordings(recordingIds: number[]): Promise<Link[]> {
  return getDb()
    .select()
    .from(linksTable)
    .where(inArray(linksTable.recordingId, recordingIds))
}

export const linkRepo = {
  getLinksByRecordings,
}
