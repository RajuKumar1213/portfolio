import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";

// Users table for Clerk sync
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  username: text("username"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const heroContent = pgTable("hero_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull().default("Rajiv"),
  subtitle: text("subtitle").notNull().default("Full Stack Developer."),
  description: text("description")
    .notNull()
    .default(
      "I build accessible, pixel-perfect, secure, and performant web applications."
    ),
  imageUrl: text("image_url").notNull().default("./images/horo.svg"),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array(), // Store as array of strings
  link: text("link"),
  github: text("github"),
  createdAt: timestamp("created_at").defaultNow(),
});
