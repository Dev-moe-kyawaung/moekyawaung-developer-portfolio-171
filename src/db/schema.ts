import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const transmissions = pgTable("transmissions", {
  id: serial("id").primaryKey(),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  senderRole: text("sender_role").default("Visitor"),
  transmissionType: text("transmission_type").default("Holocall Inquiry"),
  message: text("message").notNull(),
  signalStrength: integer("signal_strength").default(98),
  encryptionProtocol: text("encryption_protocol").default("QUANTUM-AES256"),
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectEndorsements = pgTable("project_endorsements", {
  id: serial("id").primaryKey(),
  projectId: text("project_id").notNull().unique(),
  projectTitle: text("project_title").notNull(),
  pulseCount: integer("pulse_count").default(0).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  bookmarkCount: integer("bookmark_count").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiInteractions = pgTable("ai_interactions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userQuery: text("user_query").notNull(),
  aiResponse: text("ai_response").notNull(),
  topic: text("topic").default("general"),
  spatialFocusNode: text("spatial_focus_node").default("core"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
