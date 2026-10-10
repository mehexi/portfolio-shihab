import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { InsightCard } from "@/components/InsightCard";
import { Media } from "@/components/Media";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { urlFor } from "@/sanity/client";
import { getArticle, getArticles, getProfile } from "@/sanity/queries";

// The page needs the slug before it can show anything, so navigating here may wait for
// the article instead of showing a placeholder first. Known slugs are still prerendered.
export const instant = false;

// Cache Components needs at least one sample param; an unknown slug renders the 404.
const PLACEHOLDER_SLUG = "__none__";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.length > 0 ? articles.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [article, profile] = await Promise.all([getArticle(slug), getProfile()]);
  if (!article) return {};
  return {
    title: `${article.title} | ${profile.name}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      ...(article.image?.asset && { images: [urlFor(article.image).width(1200).height(630).url()] }),
    },
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(date),
  );
}

const bodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <figure>
          <Image
            src={urlFor(value).width(1400).fit("max").url()}
            alt={value.alt ?? ""}
            width={1400}
            height={900}
            sizes="(min-width: 860px) 760px, 100vw"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} {...(external && { target: "_blank", rel: "noreferrer" })}>
          {children}
        </a>
      );
    },
  },
};

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const [article, articles, profile] = await Promise.all([getArticle(slug), getArticles(), getProfile()]);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SiteHeader name={profile.name} showInsights={profile.showInsights} home={false} />

      <main>
        <article className="container article">
          <header className="article__header">
            <Link href="/#insights" className="article__back">
              ← All insights
            </Link>
            <div className="meta article__meta">
              {article.kind && <span className="meta__key">{article.kind}</span>}
              {article.source && <span>{article.source}</span>}
              {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>}
            </div>
            <h1 className="article__title">{article.title}</h1>
            {article.excerpt && <p className="article__excerpt">{article.excerpt}</p>}
          </header>

          {article.image?.asset && (
            <Media
              image={article.image}
              placeholder=""
              className="article__image"
              ratio={16 / 9}
              sizes="(min-width: 1100px) 1000px, 100vw"
              priority
            />
          )}

          {article.body && article.body.length > 0 && (
            <div className="article__body">
              <PortableText value={article.body} components={bodyComponents} />
            </div>
          )}

          {article.externalUrl && (
            <div className="article__actions">
              <a href={article.externalUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
                {article.source ? `Read the original on ${article.source}` : "Read the original"} ↗
              </a>
            </div>
          )}
        </article>

        {more.length > 0 && (
          <section className="band">
            <div className="container section">
              <div className="eyebrow">Insights</div>
              <h2 className="section-title projects__title">More perspectives</h2>
              <div className="insights">
                {more.map((a) => (
                  <InsightCard article={a} key={a.slug} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter name={profile.name} />
    </>
  );
}
