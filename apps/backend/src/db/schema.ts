import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    profile: text("profile"),
    dateOfBirth: text('date_of_birth'),
    createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`) 
    .$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert