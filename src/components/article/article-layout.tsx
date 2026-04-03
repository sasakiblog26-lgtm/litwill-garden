import { Breadcrumb } from "@/components/seo/breadcrumb";
import { LineCta } from "@/components/cta/line-cta";

type ArticleLayoutProps = {
  title: string;
  category: string;
  categoryHref: string;
  publishedAt: string;
  updatedAt?: string;
  children: React.ReactNode;
};

/** 記事詳細ページ用レイアウトコンポーネント */
export function ArticleLayout({
  title,
  category,
  categoryHref,
  publishedAt,
  updatedAt,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumb
        items={[
          { label: category, href: categoryHref },
          { label: title },
        ]}
      />

      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded bg-primary/20 px-2.5 py-1 text-sm font-bold text-primary">
            {category}
          </span>
          <time className="text-sm text-text-dim">{publishedAt}</time>
          {updatedAt && (
            <span className="text-sm text-text-dim">
              （更新: {updatedAt}）
            </span>
          )}
        </div>
        <h1 className="font-heading text-3xl font-black leading-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          by Litwill Garden 編集部
        </p>
      </header>

      <div className="prose-gaming mb-12">{children}</div>

      <LineCta />
    </article>
  );
}
