import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  BlogArticleContent,
  type ArticleMeta,
} from "@/components/blog/blog-article-content";
import { MdxArticle } from "@/components/mdx/mdx-article";
import type { Locale } from "@/i18n";
import {
  getAllContentSlugs,
  getContentBySlug,
  type ContentEntry,
} from "@/lib/content";
import { mdxToPlainText } from "@/lib/scramble";
import { getAbsoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

function toMeta(entry: ContentEntry): ArticleMeta {
  return {
    title: entry.title,
    date: entry.date,
    tags: entry.tags,
    readingTime: entry.readingTime,
    summary: entry.summary,
  };
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

  const entryPt = getContentBySlug(slug, "pt-BR");
  const entryEn = getContentBySlug(slug, "en");

  if (!entryPt && !entryEn) {
    notFound();
  }

  const pt = entryPt ?? entryEn!;
  const en = entryEn ?? entryPt!;

  return (
    <BlogArticleContent
      metaByLocale={{
        "pt-BR": toMeta(pt),
        en: toMeta(en),
      }}
      bodyByLocale={{
        "pt-BR": <MdxArticle source={pt.content} locale="pt-BR" />,
        en: <MdxArticle source={en.content} locale="en" />,
      }}
      plainByLocale={{
        "pt-BR": mdxToPlainText(pt.content),
        en: mdxToPlainText(en.content),
      }}
    />
  );
}
