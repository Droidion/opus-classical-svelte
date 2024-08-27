import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { db } from "./index";

export const composerSearchResultsTable = pgTable("composers", {
  id: integer("id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  slug: text("slug").notNull(),
});

export type ComposerSearchResult =
  typeof composerSearchResultsTable.$inferSelect;

async function getComposerSearchResults(): Promise<ComposerSearchResult[]> {
  return db.select().from(composerSearchResultsTable);
}

export const composerSearchResultRepo = {
  getComposerSearchResults,
};
