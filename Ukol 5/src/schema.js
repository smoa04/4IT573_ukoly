import {
  sqliteTable,
  int,
  text,
} from "drizzle-orm/sqlite-core";

// Tabulka s novým sloupečkem priority
export const todosTable = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  done: int({ mode: "boolean" }).notNull(),
  priority: text().notNull(), // Novy sloupec v ramci Ukolu 5
});
