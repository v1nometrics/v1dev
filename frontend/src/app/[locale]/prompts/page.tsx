"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { T } from "@/components/ui/t";
import { cn } from "@/lib/utils";

interface Prompt {
  id: string;
  title: {
    "pt-BR": string;
    en: string;
  };
  description: {
    "pt-BR": string;
    en: string;
  };
  category: string;
  content: string;
  references: string[];
  usage: {
    "pt-BR": string;
    en: string;
  };
}

// Sample prompts with embedded references
const prompts: Prompt[] = [
  {
    id: "data-pipeline-review",
    title: {
      "pt-BR": "Revisão de Pipeline de Dados",
      en: "Data Pipeline Review",
    },
    description: {
      "pt-BR": "Prompt para análise crítica de pipelines de dados com base em princípios de Kleppmann.",
      en: "Prompt for critical analysis of data pipelines based on Kleppmann's principles.",
    },
    category: "data-engineering",
    content: `<prompt id="data-pipeline-review" version="1.0">
  <context>
    Você é um engenheiro de dados sênior revisando um pipeline.
    Analise com base nos princípios de sistemas data-intensive.
  </context>
  
  <references>
    <ref id="kleppmann-ddia" chapter="10-11">
      Batch and Stream Processing fundamentals
    </ref>
    <ref id="google-sre" chapter="service-level-objectives">
      SLO definition and monitoring
    </ref>
  </references>
  
  <instructions>
    1. Identifique pontos de falha (single points of failure)
    2. Avalie garantias de entrega (at-least-once, exactly-once)
    3. Verifique idempotência das transformações
    4. Analise estratégia de backpressure
    5. Revise observabilidade (logs, metrics, traces)
  </instructions>
  
  <output_format>
    - Resumo executivo (2-3 linhas)
    - Issues encontrados (severity: critical/high/medium/low)
    - Recomendações priorizadas
    - Referências específicas para cada issue
  </output_format>
</prompt>`,
    references: ["kleppmann-ddia", "google-sre"],
    usage: {
      "pt-BR": "Cole o código do pipeline após o prompt. Funciona melhor com Claude ou GPT-4.",
      en: "Paste the pipeline code after the prompt. Works best with Claude or GPT-4.",
    },
  },
  {
    id: "ml-system-design",
    title: {
      "pt-BR": "Design de Sistema ML",
      en: "ML System Design",
    },
    description: {
      "pt-BR": "Framework para discussão de arquitetura de sistemas de ML em produção.",
      en: "Framework for discussing ML systems architecture in production.",
    },
    category: "ml-ops",
    content: `<prompt id="ml-system-design" version="1.0">
  <persona>
    Você é um ML Engineer sênior conduzindo uma sessão de design.
    Foco em sistemas de produção, não em modelagem.
  </persona>
  
  <references>
    <ref id="ml-design-patterns">
      Lakshmanan et al. - Design Patterns for ML
    </ref>
    <ref id="reliable-ml">
      Munn & Briesch - Reliable Machine Learning
    </ref>
    <ref id="chip-huyen-mlops">
      Designing ML Systems - Chip Huyen
    </ref>
  </references>
  
  <framework>
    1. PROBLEMA
       - Qual métrica de negócio estamos otimizando?
       - Qual a baseline atual (heurística, regras)?
       
    2. DADOS
       - Fontes disponíveis
       - Latência de features (batch vs real-time)
       - Data quality e lineage
       
    3. MODELAGEM
       - Abordagem (supervised, embeddings, etc)
       - Trade-off latência vs throughput
       - Serving: batch, online, streaming
       
    4. OPERAÇÃO
       - Monitoring: data drift, model drift
       - Rollback strategy
       - A/B testing ou shadow mode
       
    5. CUSTOS
       - Compute (training vs inference)
       - Storage
       - Human labeling se aplicável
  </framework>
</prompt>`,
    references: ["ml-design-patterns", "reliable-ml", "chip-huyen-mlops"],
    usage: {
      "pt-BR": "Descreva o problema de ML que você quer resolver. O prompt guiará a discussão.",
      en: "Describe the ML problem you want to solve. The prompt will guide the discussion.",
    },
  },
];

export default function PromptsPage() {
  return <PromptsContent />;
}

function PromptsContent() {
  const { locale } = useLocale();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const copyToClipboard = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadXML = (prompt: Prompt) => {
    const blob = new Blob([prompt.content], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.id}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-xl font-medium mb-2">
          <T k="prompts.title" />
        </h1>
        <p className="text-fg-muted text-sm">
          <T k="prompts.description" />
        </p>
      </header>

      {/* Prompts list */}
      <ul className="space-y-8">
        {prompts.map((prompt) => (
          <li
            key={prompt.id}
            className="border border-dotted border-border-default p-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-medium">{prompt.title[locale]}</h3>
                <p className="text-sm text-fg-muted">
                  {prompt.description[locale]}
                </p>
              </div>
              <span className="badge shrink-0">{prompt.category}</span>
            </div>

            {/* Usage */}
            <div className="mb-4">
              <p className="text-xs text-fg-subtle mb-1">
                <T k="prompts.usage" />:
              </p>
              <p className="text-sm text-fg-secondary">{prompt.usage[locale]}</p>
            </div>

            {/* References */}
            <div className="mb-4">
              <p className="text-xs text-fg-subtle mb-1">
                <T k="prompts.references" /> ({prompt.references.length}):
              </p>
              <div className="flex flex-wrap gap-1">
                {prompt.references.map((ref) => (
                  <span key={ref} className="text-xs text-fg-muted">
                    [{ref}]
                  </span>
                ))}
              </div>
            </div>

            {/* Preview toggle */}
            <button
              onClick={() =>
                setExpandedId(expandedId === prompt.id ? null : prompt.id)
              }
              className="flex items-center gap-2 text-xs text-fg-muted hover:text-fg-primary transition-colors mb-3 group"
            >
              <span
                className={cn(
                  "transition-transform duration-200 ease-out",
                  expandedId === prompt.id ? "rotate-90" : "rotate-0"
                )}
              >
                ›
              </span>
              <span>
                <T k="prompts.preview" />
              </span>
              <span className="flex-1 max-w-16 border-b border-dotted border-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>

            {/* Expanded preview */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                expandedId === prompt.id
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <pre className="bg-bg-code text-code-fg p-4 text-xs overflow-x-auto mb-4 border border-border-default">
                  {prompt.content}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(prompt.content, prompt.id)}
                className="badge badge-solid hover:bg-bg-tertiary transition-colors"
              >
                {copiedId === prompt.id 
                  ? <T k="prompts.copied" /> 
                  : <T k="prompts.copy" />
                }
              </button>
              <button
                onClick={() => downloadXML(prompt)}
                className="badge hover:bg-bg-secondary transition-colors"
              >
                <T k="prompts.download" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
