"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { ScrambleText } from "@/components/ui/scramble-text";
import { T } from "@/components/ui/t";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";
import type { ContentMeta } from "@/lib/content";

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  rightContent,
}: {
  title: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg-primary transition-colors group cursor-pointer"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "text-fg-subtle transition-transform duration-200 ease-out",
              isOpen ? "rotate-90" : "rotate-0"
            )}
          >
            ›
          </span>
          <span>{title}</span>
        </button>
        {rightContent}
      </div>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function HomeContent({
  recentPostsByLocale,
}: {
  recentPostsByLocale: Record<Locale, ContentMeta[]>;
}) {
  const { locale } = useLocale();
  const recentPosts = recentPostsByLocale[locale];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-20">
        <div>
          <section className="mb-16">
            <div className="mb-8">
              <p className="text-fg-muted text-sm mb-1">
                <T k="home.greeting" />
              </p>
              <h1 className="text-2xl font-medium mb-2">
                <T k="home.name" />
              </h1>
              <p className="text-fg-muted text-sm">
                <T k="home.role" />
              </p>
            </div>

            <p className="text-fg-secondary leading-relaxed">
              <T k="home.bio" />
            </p>
          </section>

          <hr className="separator-dotted" />

          <CollapsibleSection
            title={<T k="home.recent.title" />}
            defaultOpen={true}
            rightContent={
              <Link
                href={locale === "pt-BR" ? "/blog" : "/en/blog"}
                className="text-xs text-fg-muted hover:text-fg-primary border-none"
              >
                <T k="home.recent.viewAll" /> →
              </Link>
            }
          >
            <RecentPosts posts={recentPosts} />
          </CollapsibleSection>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <CollapsibleSection title={<T k="home.now.title" />} defaultOpen={true}>
              <div className="pl-4 border-l border-dotted border-border-default">
                <NowContent />
              </div>
            </CollapsibleSection>
          </div>
        </aside>
      </div>

      <section className="mt-16 lg:hidden">
        <hr className="separator-dotted mb-16" />
        <CollapsibleSection title={<T k="home.now.title" />} defaultOpen={true}>
          <div className="pl-4 border-l border-dotted border-border-default">
            <NowContent />
          </div>
        </CollapsibleSection>
      </section>
    </div>
  );
}

function NowContent() {
  const { locale } = useLocale();

  const items =
    locale === "pt-BR"
      ? [
          "realizando onboarding e contribuindo em novo projeto como engenheiro de software",
          "escrevendo sobre arquitetura de sistemas de ml",
          "finalizando meu tcc e preparando conteúdo dos modelos para o blog",
        ]
      : [
          "onboarding and contributing to a new project as software engineer",
          "writing about ml systems architecture",
          "finishing my thesis and preparing model content for the blog",
        ];

  return (
    <ul className="space-y-2 text-sm text-fg-secondary">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-fg-subtle">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RecentPosts({ posts }: { posts: ContentMeta[] }) {
  const { locale } = useLocale();

  if (posts.length === 0) {
    return (
      <p className="text-sm text-fg-subtle">
        <T k="blog.empty" />
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={
              locale === "pt-BR"
                ? `/blog/${post.slug}`
                : `/en/blog/${post.slug}`
            }
            className="group block border-none"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-fg-primary group-hover:text-fg-muted transition-colors">
                <ScrambleText text={post.title} duration={2500} />
              </span>
              <span className="text-xs text-fg-subtle shrink-0">
                {post.date}
              </span>
            </div>
            <div className="flex gap-2 mt-1">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
