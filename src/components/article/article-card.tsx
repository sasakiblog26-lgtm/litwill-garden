import Link from "next/link";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  className?: string;
};

/** 記事一覧用のカードコンポーネント */
export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={`/guides/${slug}`}
      className={cn(
        "group block rounded-xl border border-bg-elevated bg-bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)]",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
          {category}
        </span>
        <time className="text-xs text-text-dim">{publishedAt}</time>
      </div>
      <h3 className="mb-2 font-heading text-lg font-black text-text group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-text-muted line-clamp-2">{excerpt}</p>
    </Link>
  );
}
