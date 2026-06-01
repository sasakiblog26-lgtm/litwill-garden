import Link from "next/link";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  href?: string;
  className?: string;
};

/** 記事一覧用のカードコンポーネント */
export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  href,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={href ?? `/articles/${slug}`}
      className={cn(
        "celestial-panel group block rounded-xl p-5 transition-all hover:border-primary/45 hover:shadow-[0_18px_48px_rgba(80,64,120,0.16)]",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
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
