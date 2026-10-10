import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      description: "The page address: /insights/your-slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "kind", title: "Type", type: "string", description: "e.g. Article, Interview, Podcast" }),
    defineField({ name: "source", type: "string", description: "e.g. Harvard Business Review" }),
    defineField({ name: "publishedAt", title: "Published", type: "date" }),
    defineField({
      name: "excerpt",
      description: "One or two sentences shown under the title and in search results.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternative text", type: "string" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "Original link (optional)",
      description: "Adds a “Read the original” button, e.g. to the publication or podcast.",
      type: "url",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "source", media: "image" } },
});
