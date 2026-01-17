"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { T } from "@/components/ui/t";
import type { Locale } from "@/i18n";

interface Project {
  slug: string;
  title: string;
  status: "production" | "completed" | "development" | "archived";
  type: "internal" | "personal" | "oss" | "client";
  domain: string[];
  period: string;
  summary: {
    "pt-BR": string;
    en: string;
  };
  description: {
    "pt-BR": string;
    en: string;
  };
  stack: string[];
  highlights: {
    "pt-BR": string[];
    en: string[];
  };
  images?: string[];
}

const projects: Project[] = [
  {
    slug: "saep",
    title: "SAEP",
    status: "production",
    type: "internal",
    domain: ["backend", "data"],
    period: "2023—now",
    summary: {
      "pt-BR": "Sistema de apoio à elaboração de propostas para licitações públicas.",
      en: "Proposal elaboration support system for public tenders.",
    },
    description: {
      "pt-BR": "Plataforma interna que automatiza a criação de propostas técnicas e comerciais para processos licitatórios, integrando templates, cálculos de precificação e validação de conformidade com editais.",
      en: "Internal platform that automates the creation of technical and commercial proposals for bidding processes, integrating templates, pricing calculations and compliance validation with public notices.",
    },
    stack: ["Python", "FastAPI", "PostgreSQL", "AWS", "React"],
    highlights: {
      "pt-BR": [
        "Redução de 60% no tempo de elaboração de propostas",
        "Integração com APIs de órgãos públicos",
        "Motor de templates com versionamento",
        "Pipeline de validação automatizada",
      ],
      en: [
        "60% reduction in proposal preparation time",
        "Integration with government APIs",
        "Template engine with versioning",
        "Automated validation pipeline",
      ],
    },
  },
  {
    slug: "migracao-aws-vpc",
    title: "AWS VPC Migration",
    status: "completed",
    type: "internal",
    domain: ["infra", "devops"],
    period: "2024",
    summary: {
      "pt-BR": "Redesign de arquitetura de rede para multi-AZ com zero downtime.",
      en: "Network architecture redesign for multi-AZ with zero downtime.",
    },
    description: {
      "pt-BR": "Migração completa de infraestrutura de rede AWS de single-AZ para multi-AZ, incluindo VPC peering, transit gateway e redesign de security groups mantendo disponibilidade 100% durante a transição.",
      en: "Complete AWS network infrastructure migration from single-AZ to multi-AZ, including VPC peering, transit gateway and security groups redesign while maintaining 100% availability during transition.",
    },
    stack: ["Terraform", "AWS", "Python", "Networking"],
    highlights: {
      "pt-BR": [
        "Zero downtime durante migração",
        "Redução de 40% em custos de transferência",
        "Melhoria de latência inter-serviços",
        "Documentação completa de runbooks",
      ],
      en: [
        "Zero downtime during migration",
        "40% reduction in transfer costs",
        "Improved inter-service latency",
        "Complete runbook documentation",
      ],
    },
  },
  {
    slug: "semantic-search",
    title: "Semantic Search Engine",
    status: "development",
    type: "personal",
    domain: ["ml", "data"],
    period: "2025",
    summary: {
      "pt-BR": "Motor de busca semântica com embeddings e reranking.",
      en: "Semantic search engine with embeddings and reranking.",
    },
    description: {
      "pt-BR": "Sistema de busca vetorial para documentos internos usando sentence-transformers, pgvector e reranking com cross-encoders. Inclui pipeline de indexação incremental e monitoramento de qualidade.",
      en: "Vector search system for internal documents using sentence-transformers, pgvector and reranking with cross-encoders. Includes incremental indexing pipeline and quality monitoring.",
    },
    stack: ["Python", "SBERT", "pgvector", "FastAPI", "Redis"],
    highlights: {
      "pt-BR": [
        "Latência p99 < 200ms",
        "Recall@10 > 0.85 em benchmark interno",
        "Indexação incremental em tempo real",
        "Dashboard de métricas de qualidade",
      ],
      en: [
        "p99 latency < 200ms",
        "Recall@10 > 0.85 on internal benchmark",
        "Real-time incremental indexing",
        "Quality metrics dashboard",
      ],
    },
  },
];

export default function LabPage() {
  return <LabContent />;
}

function LabContent() {
  const { locale } = useLocale();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const statusIndicator = {
    production: "●",
    completed: "○",
    development: "◐",
    archived: "□",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-xl font-medium mb-2">
          <T k="lab.title" />
        </h1>
        <p className="text-fg-muted text-sm">
          <T k="lab.description" />
        </p>
      </header>

      {/* Projects list */}
      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.slug}>
            <button
              onClick={() => setSelectedProject(project)}
              className="group block w-full text-left border-none"
            >
              <div className="flex items-start gap-3">
                <span 
                  className="text-fg-subtle text-sm mt-0.5"
                  title={locale === "pt-BR"
                    ? { production: "em produção", completed: "concluído", development: "em desenvolvimento", archived: "arquivado" }[project.status]
                    : project.status
                  }
                >
                  {statusIndicator[project.status]}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="text-fg-primary group-hover:text-fg-muted transition-colors font-medium">
                      {project.title}
                    </span>
                    <span className="text-xs text-fg-subtle shrink-0">
                      {project.period}
                    </span>
                  </div>

                  <p className="text-sm text-fg-muted mb-2">
                    {project.summary[locale]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs text-fg-subtle">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-xs text-fg-subtle">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Legend */}
      <footer className="mt-12 pt-6 border-t border-dotted border-border-default">
        <div className="flex flex-wrap gap-4 text-xs text-fg-subtle">
          <span>● <T k="lab.status.production" /></span>
          <span>◐ <T k="lab.status.development" /></span>
          <span>○ <T k="lab.status.completed" /></span>
          <span>□ <T k="lab.status.archived" /></span>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          locale={locale}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function ProjectModal({
  project,
  locale,
  onClose,
}: {
  project: Project;
  locale: Locale;
  onClose: () => void;
}) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-bg-primary border border-border-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-primary border-b border-dotted border-border-default px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-medium">{project.title}</h2>
                <span className="text-xs text-fg-subtle border border-dotted border-border-default px-1.5 py-0.5">
                  {locale === "pt-BR" 
                    ? { internal: "interno", personal: "pessoal", oss: "oss", client: "cliente" }[project.type]
                    : project.type}
                </span>
              </div>
              <p className="text-sm text-fg-muted">{project.period}</p>
            </div>
            <button
              onClick={onClose}
              className="text-fg-muted hover:text-fg-primary transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Domain */}
          <section>
            <h3 className="text-sm font-medium mb-3 text-fg-muted">
              <span className="text-fg-subtle">›</span>{" "}
              {locale === "pt-BR" ? "Área" : "Domain"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.domain.map((d) => (
                <span
                  key={d}
                  className="text-xs border border-dotted border-border-default px-2 py-1"
                >
                  {d}
                </span>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <p className="text-fg-secondary leading-relaxed">
              {project.description[locale]}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-sm font-medium mb-3 text-fg-muted">
              <span className="text-fg-subtle">›</span>{" "}
              {locale === "pt-BR" ? "Destaques" : "Highlights"}
            </h3>
            <ul className="space-y-2">
              {project.highlights[locale].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-fg-secondary">
                  <span className="text-fg-subtle mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Stack */}
          <section>
            <h3 className="text-sm font-medium mb-3 text-fg-muted">
              <span className="text-fg-subtle">›</span> Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs border border-dotted border-border-default px-2 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Images placeholder */}
          {project.images && project.images.length > 0 && (
            <section>
              <h3 className="text-sm font-medium mb-3 text-fg-muted">
                <span className="text-fg-subtle">›</span>{" "}
                {locale === "pt-BR" ? "Capturas" : "Screenshots"}
              </h3>
              <div className="grid gap-4">
                {project.images.map((img, i) => (
                  <div 
                    key={i}
                    className="aspect-video bg-bg-secondary border border-dotted border-border-default flex items-center justify-center text-fg-subtle text-sm"
                  >
                    {img}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-bg-primary border-t border-dotted border-border-default px-6 py-3">
          <button
            onClick={onClose}
            className="text-sm text-fg-muted hover:text-fg-primary transition-colors"
          >
            {locale === "pt-BR" ? "← fechar" : "← close"}
          </button>
        </div>
      </div>
    </div>
  );
}
