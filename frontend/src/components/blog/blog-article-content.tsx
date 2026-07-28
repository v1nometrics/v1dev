"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ScrambleSwap } from "@/components/ui/scramble-swap";
import { T } from "@/components/ui/t";
import type { Locale } from "@/i18n";
import { formatDate } from "@/lib/utils";

export type ArticleMeta = {
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
  summary: string;
};

/**
 * Client shell for /blog/[slug].
 * LocaleProvider toggles without navigation — both locales are preloaded.
 * Header + full article body use the matrix scramble (same feel as <T>).
 */
export function BlogArticleContent({
  metaByLocale,
  bodyByLocale,
}: {
  metaByLocale: Record<Locale, ArticleMeta>;
  bodyByLocale: Record<Locale, ReactNode>;
}) {
  const { locale } = useLocale();
  const meta = metaByLocale[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article>
        <header className="mb-10">
          <Link
            href={locale === "pt-BR" ? "/blog" : "/en/blog"}
            className="text-xs text-fg-muted hover:text-fg-primary border-none inline-flex items-center gap-1 mb-6"
          >
            <span>‹</span>
            <span>
              <T k="common.backToBlog" />
            </span>
          </Link>

          <h1 className="text-2xl font-medium mb-3 leading-tight">
            <ScrambleText text={meta.title} duration={2500} />
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
            <time dateTime={meta.date}>
              <ScrambleText text={formatDate(meta.date, locale)} duration={2500} />
            </time>
            <span>·</span>
            <span>
              {meta.readingTime} <T k="common.readingTime" />
            </span>
          </div>

          {meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {meta.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <ScrambleSwap byLocale={bodyByLocale} duration={2500} />
      </article>
    </div>
  );
}
