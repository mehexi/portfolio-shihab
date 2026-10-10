import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    type: "image",
    ...(group && { group }),
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
  });

export const profile = defineType({
  name: "profile",
  title: "Executive profile",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "experience", title: "Experience" },
    { name: "projects", title: "Projects" },
    { name: "technology", title: "Technology" },
    { name: "insights", title: "Insights" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({
      name: "role",
      title: "Role line",
      description: "Shown above the headline, e.g. “Group Chief Executive · Meridian Group”.",
      type: "string",
      group: "hero",
    }),
    defineField({ name: "headline", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "showPortrait", title: "Show portrait", type: "boolean", group: "hero", initialValue: true }),
    imageWithAlt("portrait", "Portrait photograph", "hero"),
    defineField({
      name: "stats",
      title: "Headline figures",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({ name: "aboutHeading", title: "Heading", type: "string", group: "about" }),
    defineField({
      name: "aboutBody",
      title: "Paragraphs",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "principles",
      description: "Numbered automatically in the order shown here.",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),

    defineField({
      name: "career",
      type: "array",
      group: "experience",
      of: [
        defineArrayMember({
          type: "object",
          name: "careerEntry",
          fields: [
            defineField({ name: "years", type: "string", description: "e.g. “2017 – Present”" }),
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "org", title: "Organisation", type: "string" }),
            defineField({ name: "note", title: "Summary", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "role", subtitle: "org" } },
        }),
      ],
    }),
    defineField({
      name: "cv",
      title: "Full CV",
      description: "The file behind the “Download full CV” button.",
      type: "file",
      group: "experience",
    }),

    defineField({
      name: "projects",
      title: "Featured projects",
      type: "array",
      group: "projects",
      of: [
        defineArrayMember({
          type: "object",
          name: "project",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "sector", type: "string" }),
            defineField({ name: "year", type: "string" }),
            defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "outcome", type: "string" }),
            imageWithAlt("image", "Project image"),
          ],
          preview: { select: { title: "title", subtitle: "sector", media: "image" } },
        }),
      ],
    }),

    defineField({ name: "techHeading", title: "Heading", type: "string", group: "technology" }),
    defineField({ name: "techIntro", title: "Introduction", type: "text", rows: 3, group: "technology" }),
    defineField({
      name: "tech",
      title: "Technology groups",
      type: "array",
      group: "technology",
      of: [
        defineArrayMember({
          type: "object",
          name: "techGroup",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "tools",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),

    defineField({ name: "showInsights", title: "Show insights section", type: "boolean", group: "insights", initialValue: true }),
    defineField({
      name: "insights",
      type: "array",
      group: "insights",
      of: [
        defineArrayMember({
          type: "object",
          name: "insight",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "type", type: "string", description: "e.g. Article, Interview, Podcast" }),
            defineField({ name: "source", type: "string", description: "e.g. Harvard Business Review" }),
            defineField({ name: "url", title: "Link", type: "url" }),
            imageWithAlt("image", "Image"),
          ],
          preview: { select: { title: "title", subtitle: "source", media: "image" } },
        }),
      ],
    }),

    defineField({ name: "contactHeading", title: "Heading", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Primary email", type: "string", group: "contact", validation: (r) => r.email() }),
    defineField({
      name: "contacts",
      title: "Contact details",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "contact",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "url",
              title: "Link (optional)",
              type: "url",
              validation: (r) => r.uri({ scheme: ["http", "https", "mailto", "tel"] }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    defineField({ name: "seoTitle", title: "Page title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 2, group: "seo" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});
