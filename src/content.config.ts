import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/articles",
    generateId: ({ entry }) => entry,
  }),
  schema: z.object({
    title: z.string().min(1),
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use a permanent lowercase, hyphenated URL slug.",
      ),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((value) => {
        const parsed = new Date(`${value}T00:00:00Z`);
        return (
          !Number.isNaN(parsed.valueOf()) &&
          parsed.toISOString().slice(0, 10) === value
        );
      }, "Use a valid YYYY-MM-DD date in quotes."),
    description: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    lang: z.enum(["en", "zh-CN"]).default("zh-CN"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
