import { eq } from 'drizzle-orm'
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { getDb } from './index'
import { periodsTable } from './periods'

export const composersTable = pgTable('composers_with_countries', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  yearBorn: integer('year_born').notNull(),
  yearDied: integer('year_died'),
  periodId: integer('period_id')
    .notNull()
    .references(() => periodsTable.id),
  slug: text('slug').notNull(),
  wikipediaLink: text('wikipedia_link'),
  imslpLink: text('imslp_link'),
  enabled: boolean('enabled').notNull(),
  countries: text('countries').notNull(),
})

export type Composer = typeof composersTable.$inferSelect

async function getComposers(): Promise<Composer[]> {
  return await getDb().select().from(composersTable).orderBy(composersTable.lastName)
}

async function getComposerBySlug(slug: string): Promise<Composer | undefined> {
  const composers = await getDb()
    .select()
    .from(composersTable)
    .where(eq(composersTable.slug, slug))
  if (composers.length === 0) {
    return
  }
  return composers[0]
}

export const composerRepo = {
  getComposers,
  getComposerBySlug,
}
