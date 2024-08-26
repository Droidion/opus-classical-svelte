import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { db } from "./index";
import { inArray } from "drizzle-orm";

export const performersTable = pgTable("performers_with_instruments", {
  recordingId: integer("recording_id").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name").notNull(),
  instrument: text("instrument").notNull(),
  priority: integer("priority"),
});

export type Performer = typeof performersTable.$inferSelect;

async function getPerformersByRecordings(
  recordingIds: number[],
): Promise<Performer[]> {
  return db
    .select()
    .from(performersTable)
    .where(inArray(performersTable.recordingId, recordingIds));
}

interface PerformerRepo {
  getPerformersByRecordings(recordingIds: number[]): Promise<Performer[]>;
}

export const performerRepo: PerformerRepo = {
  getPerformersByRecordings,
};
