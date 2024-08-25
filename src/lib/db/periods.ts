import { pgTable, serial, numeric, text } from "drizzle-orm/pg-core";
import { db } from './index'

const periodsTable = pgTable('periods', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  yearStart: numeric('year_start').notNull(),
  yearEnd: numeric('year_end'),
  slug: text('slug').notNull(),
});

type SelectPeriod = typeof periodsTable.$inferSelect;

async function getPeriods(): Promise<SelectPeriod[]> {
  return await db.select().from(periodsTable);
}

interface PeriodsRepo {
  getPeriods(): Promise<SelectPeriod[]>
}

export const periodsRepo: PeriodsRepo = {
  getPeriods,
}
