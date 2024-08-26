import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { db } from "./index";

export const periodsTable = pgTable("periods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  yearStart: integer("year_start").notNull(),
  yearEnd: integer("year_end"),
  slug: text("slug").notNull(),
});

export type Period = typeof periodsTable.$inferSelect;

async function getPeriods(): Promise<Period[]> {
  return db.select().from(periodsTable);
}

interface PeriodRepo {
  getPeriods(): Promise<Period[]>;
}

export const periodRepo: PeriodRepo = {
  getPeriods,
};
