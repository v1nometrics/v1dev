import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MdxArticle } from "@/components/mdx/mdx-article";
import { getAllContentSlugs, getContentBySlug } from "@/lib/content";
import { formatDate, getAbsoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getContentBySlug(slug);

  if (!entry) {
    return { title: "Post não encontrado" };
  }

  const url = getAbsoluteUrl(`/blog/${entry.slug}`);

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url,
      type: "article",
      publishedTime: entry.date,
      tags: entry.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.summary,
    },
  };
}

export default async function WritingSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const entry = getContentBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article>
        <header className="mb-10">
          <Link
            href={`/${locale === "pt-BR" ? "" : "en/"}blog`}
            className="text-xs text-fg-muted hover:text-fg-primary border-none inline-flex items-center gap-1 mb-6"
          >
            <span>‹</span>
            <span>voltar ao blog</span>
          </Link>

          <h1 className="text-2xl font-medium mb-3 leading-tight">
            {entry.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            <span>·</span>
            <span>{entry.readingTime} min de leitura</span>
          </div>

          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {entry.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MdxArticle source={entry.content} />
      </article>
    </div>
  );
}
