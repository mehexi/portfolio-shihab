import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "./client";
import { fallbackArticles, fallbackProfile } from "./fallback";
import type { Article, ArticleCard, Profile } from "./types";

export const PROFILE_TAG = "profile";
export const ARTICLE_TAG = "article";

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

const articleCardFields = `title, "slug": slug.current, kind, source, publishedAt, image`;

const articlesQuery = defineQuery(`*[_type == "article" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc){${articleCardFields}}`);

const articleQuery = defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  ${articleCardFields},
  excerpt,
  body,
  externalUrl
}`);

export async function getArticles(): Promise<ArticleCard[]> {
  "use cache";
  cacheTag(ARTICLE_TAG);
  cacheLife("hours");

  if (!client) return fallbackArticles;
  return client.fetch<ArticleCard[]>(articlesQuery);
}

export async function getArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheTag(ARTICLE_TAG);
  cacheLife("hours");

  if (!client) return fallbackArticles.find((a) => a.slug === slug) ?? null;
  return client.fetch<Article | null>(articleQuery, { slug });
}
