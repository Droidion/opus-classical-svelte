import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { getDb } from './index'

export const periodsTable = pgTable('periods', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  yearStart: integer('year_start').notNull(),
  yearEnd: integer('year_end'),
  slug: text('slug').notNull(),
})

export type Period = typeof periodsTable.$inferSelect

async function getPeriods(): Promise<Period[]> {
  return getDb().select().from(periodsTable)
}

export const periodRepo = {
  getPeriods,
}
