"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { T } from "@/components/ui/t";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function WritingPage() {
  return <WritingContent />;
}

/**
 * Seção colapsável com animação suave
 */
function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg-primary transition-colors group cursor-pointer mb-4"
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
        <span className="flex-1 border-b border-dotted border-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2" />
      </button>

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

function WritingContent() {
  const { locale } = useLocale();

  // Placeholder data - will be replaced with MDX content
  const articles = [
    {
      slug: "embeddings-producao",
      title:
        locale === "pt-BR"
          ? "Embeddings em Produção: Lições de 6 Meses"
          : "Embeddings in Production: Lessons from 6 Months",
      date: "2024-01-15",
      summary:
        locale === "pt-BR"
          ? "Trade-offs entre modelos, indexação e latência em buscas vetoriais."
          : "Trade-offs between models, indexing and latency in vector search.",
      tags: ["ml", "embeddings", "production"],
      type: "article",
    },
    {
      slug: "cache-hierarquico-swr",
      title:
        locale === "pt-BR"
          ? "Cache Hierárquico com SWR"
          : "Hierarchical Cache with SWR",
      date: "2024-01-10",
      summary:
        locale === "pt-BR"
          ? "Estratégias de invalidação em sistemas distribuídos."
          : "Invalidation strategies in distributed systems.",
      tags: ["cache", "architecture", "react"],
      type: "article",
    },
  ];

  const notes = [
    {
      slug: "pgvector-default",
      title:
        locale === "pt-BR"
          ? "pgvector: Configurações Default"
          : "pgvector: Default Configurations",
      date: "2024-01-12",
      tags: ["postgres", "vectors"],
      type: "note",
    },
    {
      slug: "slo-busca",
      title: locale === "pt-BR" ? "SLO para Busca" : "SLO for Search",
      date: "2024-01-08",
      tags: ["sre", "observability"],
      type: "note",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-xl font-medium mb-2">
          <T k="blog.title" />
        </h1>
        <p className="text-fg-muted text-sm">
          <T k="blog.description" />
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-20">
        {/* Main - Articles */}
        <section>
          <CollapsibleSection title={<T k="blog.articles.title" />} defaultOpen={true}>
            <ul className="space-y-6">
              {articles.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group block border-none"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <span className="text-fg-primary group-hover:text-fg-muted transition-colors">
                        {post.title}
                      </span>
                      <span className="text-xs text-fg-subtle shrink-0">
                        {post.date}
                      </span>
                    </div>
                    <p className="text-sm text-fg-muted mb-2">{post.summary}</p>
                    <div className="flex gap-2">
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
          </CollapsibleSection>
        </section>

        {/* Sidebar - Notes */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <CollapsibleSection title={<T k="blog.notes.title" />} defaultOpen={true}>
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={`/${locale}/blog/${note.slug}`}
                      className="group block border-none text-sm"
                    >
                      <span className="text-fg-primary group-hover:text-fg-muted transition-colors">
                        {note.title}
                      </span>
                      <div className="flex gap-2 mt-1">
                        {note.tags.map((tag) => (
                          <span key={tag} className="text-xs text-fg-subtle">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>
        </aside>
      </div>

      {/* Notes on mobile */}
      <section className="mt-16 lg:hidden">
        <hr className="separator-dotted mb-16" />
        <CollapsibleSection title={<T k="blog.notes.title" />} defaultOpen={true}>
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/${locale}/blog/${note.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-none"
                >
                  <span className="text-fg-primary group-hover:text-fg-muted transition-colors">
                    {note.title}
                  </span>
                  <div className="flex items-center gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="badge">
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-fg-subtle">{note.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>
    </div>
  );
}
