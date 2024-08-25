import { pgTable, serial, integer, text, boolean } from 'drizzle-orm/pg-core';
import { db } from './index';
import { periodsTable } from './periods';

const composersTable = pgTable('composers', {
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
  countries: text('countries').notNull()
});

type SelectPeriod = typeof periodsTable.$inferSelect;

async function getPeriods(): Promise<SelectPeriod[]> {
  return await db.select().from(periodsTable);
}

interface PeriodsRepo {
  getPeriods(): Promise<SelectPeriod[]>;
}

export const periodsRepo: PeriodsRepo = {
  getPeriods
};
