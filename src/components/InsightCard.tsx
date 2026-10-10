import Link from "next/link";
import type { ArticleCard } from "@/sanity/types";
import { Media } from "./Media";

export function InsightCard({ article }: { article: ArticleCard }) {
  return (
    <Link className="insight" href={`/insights/${article.slug}`}>
      <Media
        image={article.image}
        placeholder="Image"
        className="insight__image"
        ratio={3 / 2}
        sizes="(min-width: 1080px) 350px, (min-width: 720px) 50vw, 100vw"
      />
      <div className="meta">
        <span className="meta__key">{article.kind}</span>
        <span>{article.source}</span>
      </div>
      <div className="insight__title">{article.title}</div>
    </Link>
  );
}
