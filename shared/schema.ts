import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const weatherRequestSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type WeatherRequest = z.infer<typeof weatherRequestSchema>;

export const forecastDaySchema = z.object({
  day: z.string(),
  temp: z.number(),
  rain: z.number(),
});

export const weatherDataSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  precipitation: z.number(),
  forecast: z.array(forecastDaySchema),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;

export const cropSchema = z.object({
  name: z.string(),
  icon: z.enum(["wheat", "corn", "carrot"]),
  suitability: z.enum(["high", "medium", "low"]),
});

export const cropRecommendationSchema = z.object({
  crops: z.array(cropSchema),
  advice: z.string(),
});

export type CropRecommendation = z.infer<typeof cropRecommendationSchema>;
