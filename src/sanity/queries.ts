import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "./client";
import { fallbackProfile } from "./fallback";
import type { Profile } from "./types";

export const PROFILE_TAG = "profile";

const profileQuery = defineQuery(`*[_type == "profile" && _id == "profile"][0]{
  "name": coalesce(name, ""),
  "role": coalesce(role, ""),
  "headline": coalesce(headline, ""),
  "intro": coalesce(intro, ""),
  "showPortrait": coalesce(showPortrait, true),
  portrait,
  "cvUrl": cv.asset->url,
  "stats": coalesce(stats, []),
  "aboutHeading": coalesce(aboutHeading, ""),
  "aboutBody": coalesce(aboutBody, []),
  "principles": coalesce(principles, []),
  "career": coalesce(career, []),
  "projects": coalesce(projects, []),
  "techHeading": coalesce(techHeading, ""),
  "techIntro": coalesce(techIntro, ""),
  "tech": coalesce(tech[]{title, "tools": coalesce(tools, [])}, []),
  "showInsights": coalesce(showInsights, true),
  "insights": coalesce(insights, []),
  "contactHeading": coalesce(contactHeading, ""),
  "email": coalesce(email, ""),
  "contacts": coalesce(contacts, []),
  seoTitle,
  seoDescription
}`);

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheTag(PROFILE_TAG);
  cacheLife("hours");

  if (!client) return fallbackProfile;
  const profile = await client.fetch<Profile | null>(profileQuery);
  return profile ?? fallbackProfile;
}
