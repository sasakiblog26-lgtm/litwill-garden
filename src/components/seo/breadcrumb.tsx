import Link from "next/link";
import { brand } from "@/config/brand";
import { JsonLd } from "./json-ld";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** パンくずリストを表示しJSON-LD構造化データも出力するコンポーネント */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "ホーム", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${brand.url}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <span className="text-text-dim">/</span>}
              {item.href && index < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-text">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
