import {
  pgTable,
  uuid,
  varchar,
  serial,
  text,
  timestamp,
  json,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password : text('password')
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

//     export const Waitlist = pgTable('waitlist', {
//       id: uuid('id').defaultRandom().primaryKey(),
//       email: varchar('email').notNull(),
//   });

//   export type Waitlist = typeof Waitlist.$inferSelect;
//   export type NewWaitlist = typeof Waitlist.$inferInsert;

//   export const Subscriptions = pgTable('subscriptions',{
//     id: uuid('id').defaultRandom().primaryKey(),
//     userId: varchar("user_id").notNull().unique(),
//     plan: varchar("plan_name").notNull(),
//     subscription: text("subscription").notNull(),
//     usageLimit:integer("usage_limit"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   })
