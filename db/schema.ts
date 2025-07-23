import {
  pgTable,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("User", {
  id: text("id").primaryKey().default("cuid()"), // à remplacer par uuid() si tu veux
  email: text("email").unique(),
  name: text("name"),
  avatarUrl: text("avatarUrl"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const accounts = pgTable(
  "Account",
  {
    id: text("id").primaryKey().default("cuid()"),
    userId: text("userId").unique().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    providerUnique: uniqueIndex("provider_providerAccountId").on(
      table.provider,
      table.providerAccountId
    ),
  })
);

export const posts = pgTable("Post", {
  id: text("id").primaryKey().default("cuid()"),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false),
  authorId: text("authorId").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  posts: many(posts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const schema = {
  users,
  accounts,
  posts,
  usersRelations,
  accountsRelations,
  postsRelations,
};
