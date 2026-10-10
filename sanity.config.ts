"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

// The site is a single page, so `profile` is a singleton with a fixed id.
const SINGLETON = "profile";

export default defineConfig({
  name: "default",
  title: "Executive Profile",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => t.schemaType !== SINGLETON),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === SINGLETON
        ? actions.filter((a) => a.action !== "duplicate" && a.action !== "delete" && a.action !== "unpublish")
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Executive profile")
              .id(SINGLETON)
              .child(S.document().schemaType(SINGLETON).documentId(SINGLETON)),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
