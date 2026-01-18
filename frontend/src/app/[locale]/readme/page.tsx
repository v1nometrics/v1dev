"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { T } from "@/components/ui/t";
import { cn } from "@/lib/utils";

export default function ReadmePage() {
  return <ReadmeContent />;
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
    <section className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg-primary transition-colors group cursor-pointer"
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
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
        )}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}

function ReadmeContent() {
  const { locale } = useLocale();

  const stack = {
    languages: ["Go", "Python", "TypeScript", "Ruby", "R", "SQL", "Bash"],
    data: ["Spark", "dbt", "Airflow"],
    ml: ["PyTorch", "scikit-learn", "Hugging Face", "Sentence-Transformers", "LangChain"],
    infra: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes"],
    databases: ["PostgreSQL", "pgvector", "Redis", "Supabase", "Elasticsearch"],
    observability: ["Prometheus"],
  };

  const links = [
    { label: "github", url: "https://github.com/v1nometrics" },
    { label: "linkedin", url: "https://www.linkedin.com/in/vin%C3%ADcius-torres-gomes/" },
    { label: "email", url: "mailto:contato@v1torres.dev" },
    { label: "whatsapp", url: "http://wa.me/5581982290877" },
  ];

  const nowItems = locale === "pt-BR"
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

  const principleItems = locale === "pt-BR"
    ? [
        "resolver o problema antes de escalar",
        "dados > opiniões",
        "shipping > perfeição",
        "simplicidade é sofisticação",
        "documentar é parte do trabalho",
        "máximo com mínimo",
      ]
    : [
        "solve the problem before scaling",
        "data > opinions",
        "shipping > perfection",
        "simplicity is sophistication",
        "documenting is part of the job",
        "maximum with minimum",
      ];

  const languageItems = locale === "pt-BR"
    ? [
        "português (nativo)",
        "inglês (c1 · cambridge)",
        "espanhol (fluente · intercâmbio na argentina por 1 ano)"
      ]
    : [
        "portuguese (native)",
        "english (c1 · cambridge)",
        "spanish (fluent · exchange student in argentina for 1 year)"
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-xl font-medium mb-2">
          <T k="readme.title" />
        </h1>
      </header>

      {/* Bio */}
      <CollapsibleSection title={<T k="readme.bio.title" />} defaultOpen={true}>
        <div className="pl-4 border-l border-dotted border-border-default">
          <p className="text-fg-secondary leading-relaxed">
            <T k="readme.bio.content" />
          </p>
        </div>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      {/* Now */}
      <CollapsibleSection 
        title={
          <>
            <T k="readme.now.title" />
            {" · "}
            {new Date().toLocaleDateString(locale, { month: "long", year: "numeric" })}
          </>
        } 
        defaultOpen={true}
      >
        <ul className="space-y-2 text-sm text-fg-secondary">
          {nowItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-fg-subtle">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      {/* Stack */}
      <CollapsibleSection title={<T k="readme.stack.title" />} defaultOpen={true}>
        <div className="space-y-4">
          {Object.entries(stack).map(([category, items]) => (
            <div key={category} className="flex items-start gap-4">
              <span className="text-xs text-fg-subtle w-20 shrink-0">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      {/* Languages */}
      <CollapsibleSection title={<T k="readme.languages.title" />} defaultOpen={true}>
        <div className="flex flex-wrap gap-2">
          {languageItems.map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      {/* Principles */}
      <CollapsibleSection title={<T k="readme.principles.title" />} defaultOpen={true}>
        <ul className="space-y-2 text-sm text-fg-secondary">
          {principleItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-fg-subtle">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      {/* Contact */}
      <CollapsibleSection title={<T k="readme.contact.title" />} defaultOpen={true}>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted hover:text-fg-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <span className="text-fg-subtle">|</span>
          <a
            href="/cv.pdf"
            download="Vinicius_Torres_CV.pdf"
            className="text-sm text-fg-muted hover:text-fg-primary transition-colors"
          >
            <T k="readme.contact.downloadCV" />
          </a>
        </div>
      </CollapsibleSection>
    </div>
  );
}
