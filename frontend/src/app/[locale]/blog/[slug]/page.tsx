import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MdxArticle } from "@/components/mdx/mdx-article";
import type { Locale } from "@/i18n";
import { getAllContentSlugs, getContentBySlug } from "@/lib/content";
import { formatDate, getAbsoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getContentBySlug(slug, locale as Locale);

  if (!entry) {
    return { title: locale === "en" ? "Post not found" : "Post não encontrado" };
  }

  const url = getAbsoluteUrl(
    locale === "en" ? `/en/blog/${entry.slug}` : `/blog/${entry.slug}`
  );

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
      locale: locale === "en" ? "en_US" : "pt_BR",
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

  const entry = getContentBySlug(slug, locale as Locale);

  if (!entry) {
    notFound();
  }

  const t = await getTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article>
        <header className="mb-10">
          <Link
            href={`/${locale === "pt-BR" ? "" : "en/"}blog`}
            className="text-xs text-fg-muted hover:text-fg-primary border-none inline-flex items-center gap-1 mb-6"
          >
            <span>‹</span>
            <span>{t("backToBlog")}</span>
          </Link>

          <h1 className="text-2xl font-medium mb-3 leading-tight">
            {entry.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
            <time dateTime={entry.date}>
              {formatDate(entry.date, locale)}
            </time>
            <span>·</span>
            <span>
              {entry.readingTime} {t("readingTime")}
            </span>
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

        <MdxArticle source={entry.content} locale={locale as Locale} />
      </article>
    </div>
  );
}
