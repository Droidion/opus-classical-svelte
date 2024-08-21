import { pgTable, serial, numeric, text } from "drizzle-orm/pg-core";

export const periodsTable = pgTable('periods', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  yearStart: numeric('year_start').notNull(),
  yearEnd: numeric('year_end'),
  slug: text('slug').notNull(),
});

export type SelectPeriod = typeof periodsTable.$inferSelect;
