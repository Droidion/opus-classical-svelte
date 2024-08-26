import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { db } from "./index";
import { inArray } from "drizzle-orm";

export const linksTable = pgTable("links_with_streamers", {
  recordingId: integer("recording_id").notNull(),
  recordingLink: text("recording_link").notNull(),
  streamer: text("streamer").notNull(),
  icon: text("icon"),
  linkPrefix: text("link_prefix").notNull(),
});

export type Link = typeof linksTable.$inferSelect;

async function getLinksByRecordings(recordingIds: number[]): Promise<Link[]> {
  return db
    .select()
    .from(linksTable)
    .where(inArray(linksTable.recordingId, recordingIds));
}

interface LinkRepo {
  getLinksByRecordings(recordingIds: number[]): Promise<Link[]>;
}

export const linkRepo: LinkRepo = {
  getLinksByRecordings,
};
