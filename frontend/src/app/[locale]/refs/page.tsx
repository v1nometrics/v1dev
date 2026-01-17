"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { T } from "@/components/ui/t";
import type { Locale } from "@/i18n";

interface Reference {
  id: string;
  title: string;
  author: string;
  category: "books" | "papers" | "articles" | "tools" | "courses";
  year?: number;
  url?: string;
  description: {
    "pt-BR": string;
    en: string;
  };
  tags: string[];
}

// Curated references with official purchase links
const references: Reference[] = [
  // === BOOKS: Data & Architecture ===
  {
    id: "kleppmann-ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "books",
    year: 2017,
    url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
    description: {
      "pt-BR": "Bíblia de arquitetura de sistemas de dados. Fundamentos de replicação, particionamento, consenso distribuído e trade-offs de consistência.",
      en: "Data systems architecture bible. Fundamentals of replication, partitioning, distributed consensus and consistency trade-offs.",
    },
    tags: ["architecture", "distributed-systems", "databases"],
  },
  {
    id: "google-sre",
    title: "Site Reliability Engineering: How Google Runs Production Systems",
    author: "Beyer, Jones, Petoff, Murphy",
    category: "books",
    year: 2016,
    url: "https://sre.google/sre-book/table-of-contents/",
    description: {
      "pt-BR": "O livro canônico de SRE. SLOs, error budgets, toil, on-call e cultura de confiabilidade.",
      en: "The canonical SRE book. SLOs, error budgets, toil, on-call and reliability culture.",
    },
    tags: ["sre", "observability", "production", "google"],
  },

  // === BOOKS: Machine Learning ===
  {
    id: "murphy-pml",
    title: "Probabilistic Machine Learning: An Introduction",
    author: "Kevin P. Murphy",
    category: "books",
    year: 2022,
    url: "https://probml.github.io/pml-book/book1.html",
    description: {
      "pt-BR": "Fundamentos matemáticos de ML com abordagem probabilística moderna. Disponível gratuitamente pelo autor.",
      en: "Mathematical foundations of ML with modern probabilistic approach. Free from the author.",
    },
    tags: ["ml", "statistics", "probability", "bayesian"],
  },
  {
    id: "goodfellow-dlbook",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    category: "books",
    year: 2016,
    url: "https://www.deeplearningbook.org/",
    description: {
      "pt-BR": "Referência fundamental de deep learning. Redes neurais, otimização, regularização, arquiteturas. Disponível gratuitamente.",
      en: "Fundamental deep learning reference. Neural networks, optimization, regularization, architectures. Free online.",
    },
    tags: ["ml", "deep-learning", "neural-networks"],
  },
  {
    id: "bishop-prml",
    title: "Pattern Recognition and Machine Learning",
    author: "Christopher M. Bishop",
    category: "books",
    year: 2006,
    url: "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/",
    description: {
      "pt-BR": "Clássico de ML teórico. Modelos gráficos, inferência bayesiana, métodos de kernel. PDF disponível pela Microsoft Research.",
      en: "Theoretical ML classic. Graphical models, Bayesian inference, kernel methods. PDF available from Microsoft Research.",
    },
    tags: ["ml", "statistics", "bayesian", "theory"],
  },
  {
    id: "lakshmanan-mldp",
    title: "Machine Learning Design Patterns",
    author: "Valliappa Lakshmanan, Sara Robinson, Michael Munn",
    category: "books",
    year: 2020,
    url: "https://www.oreilly.com/library/view/machine-learning-design/9781098115777/",
    description: {
      "pt-BR": "Padrões de projeto para ML em produção. Feature engineering, treinamento, serving, reprodutibilidade.",
      en: "Design patterns for production ML. Feature engineering, training, serving, reproducibility.",
    },
    tags: ["ml", "mlops", "design-patterns", "production"],
  },
  {
    id: "huyen-mlsystems",
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    category: "books",
    year: 2022,
    url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
    description: {
      "pt-BR": "ML systems de ponta a ponta. Data pipelines, feature stores, model serving, monitoramento.",
      en: "End-to-end ML systems. Data pipelines, feature stores, model serving, monitoring.",
    },
    tags: ["ml", "mlops", "systems", "production"],
  },
  {
    id: "munn-reliable-ml",
    title: "Reliable Machine Learning",
    author: "Cathy Chen, Niall Richard Murphy, Kranti Parisa, D. Sculley, Todd Underwood",
    category: "books",
    year: 2022,
    url: "https://www.oreilly.com/library/view/reliable-machine-learning/9781098106218/",
    description: {
      "pt-BR": "SRE aplicado a ML. Confiabilidade, monitoramento de modelos, debugging em produção, incident response.",
      en: "SRE applied to ML. Reliability, model monitoring, production debugging, incident response.",
    },
    tags: ["ml", "sre", "mlops", "reliability"],
  },

  // === BOOKS: NLP ===
  {
    id: "jurafsky-slp",
    title: "Speech and Language Processing (3rd ed.)",
    author: "Dan Jurafsky, James H. Martin",
    category: "books",
    year: 2024,
    url: "https://web.stanford.edu/~jurafsky/slp3/",
    description: {
      "pt-BR": "Referência completa de NLP. De n-gramas a transformers, parsing, semântica. Draft gratuito atualizado regularmente.",
      en: "Complete NLP reference. From n-grams to transformers, parsing, semantics. Free draft updated regularly.",
    },
    tags: ["nlp", "ml", "linguistics", "transformers"],
  },

  // === BOOKS: AI Engineering ===
  {
    id: "huyen-ai-engineering",
    title: "AI Engineering: Building Applications with Foundation Models",
    author: "Chip Huyen",
    category: "books",
    year: 2025,
    url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
    description: {
      "pt-BR": "Engenharia de aplicações com LLMs. RAG, fine-tuning, prompt engineering, avaliação, deployment.",
      en: "Engineering applications with LLMs. RAG, fine-tuning, prompt engineering, evaluation, deployment.",
    },
    tags: ["llm", "ai", "rag", "production"],
  },

  // === BOOKS: Experimentation ===
  {
    id: "kohavi-experiments",
    title: "Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing",
    author: "Ron Kohavi, Diane Tang, Ya Xu",
    category: "books",
    year: 2020,
    url: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59",
    description: {
      "pt-BR": "Guia definitivo de A/B testing por ex-Microsoft/LinkedIn. Métricas, statistical power, pitfalls, cultura de experimentação.",
      en: "Definitive A/B testing guide by ex-Microsoft/LinkedIn. Metrics, statistical power, pitfalls, experimentation culture.",
    },
    tags: ["experimentation", "ab-testing", "statistics", "product"],
  },

  // === BOOKS: Statistics & Econometrics ===
  {
    id: "morettin-estatistica",
    title: "Estatística Básica",
    author: "Pedro A. Morettin, Wilton de O. Bussab",
    category: "books",
    year: 2017,
    url: "https://www.amazon.com.br/Estat%C3%ADstica-B%C3%A1sica-Pedro-Alberto-Morettin/dp/8547220224",
    description: {
      "pt-BR": "Referência brasileira de estatística. Probabilidade, inferência, regressão. Linguagem clara, exemplos práticos. 9ª edição.",
      en: "Brazilian statistics reference. Probability, inference, regression. Clear language, practical examples. 9th edition.",
    },
    tags: ["statistics", "probability", "inference", "brazilian"],
  },
  {
    id: "gujarati-econometrics",
    title: "Basic Econometrics",
    author: "Damodar N. Gujarati, Dawn C. Porter",
    category: "books",
    year: 2008,
    url: "https://www.mheducation.com/highered/product/basic-econometrics-gujarati-porter/M9780073375779.html",
    description: {
      "pt-BR": "Clássico de econometria. Regressão, séries temporais, dados em painel. Abordagem intuitiva com rigor matemático. 5ª edição.",
      en: "Econometrics classic. Regression, time series, panel data. Intuitive approach with mathematical rigor. 5th edition.",
    },
    tags: ["econometrics", "statistics", "regression", "time-series"],
  },

  // === BOOKS: Data Science / Python ===
  {
    id: "chen-pandas",
    title: "Pandas for Everyone: Python Data Analysis",
    author: "Daniel Y. Chen",
    category: "books",
    year: 2023,
    url: "https://www.pearson.com/en-us/subject-catalog/p/pandas-for-everyone-python-data-analysis/P200000009561",
    description: {
      "pt-BR": "Guia prático de Pandas. Limpeza, transformação, visualização, séries temporais. 2ª edição atualizada.",
      en: "Practical Pandas guide. Cleaning, transformation, visualization, time series. Updated 2nd edition.",
    },
    tags: ["python", "pandas", "data-analysis", "data-science"],
  },

  // === PAPERS ===
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    category: "papers",
    year: 2017,
    url: "https://arxiv.org/abs/1706.03762",
    description: {
      "pt-BR": "Paper original dos Transformers. Arquitetura de atenção que revolucionou NLP e fundamenta LLMs modernos.",
      en: "Original Transformers paper. Attention architecture that revolutionized NLP and underlies modern LLMs.",
    },
    tags: ["ml", "transformers", "nlp", "attention"],
  },
  {
    id: "rag-paper",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    author: "Lewis et al.",
    category: "papers",
    year: 2020,
    url: "https://arxiv.org/abs/2005.11401",
    description: {
      "pt-BR": "Paper fundacional de RAG. Combinação de retrieval com geração para grounding de LLMs.",
      en: "Foundational RAG paper. Combining retrieval with generation for LLM grounding.",
    },
    tags: ["ml", "rag", "nlp", "llm"],
  },
];

export default function RefsPage() {
  return <RefsContent />;
}

function RefsContent() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year" | "alpha">("year");
  const [sortAsc, setSortAsc] = useState(false); // false = desc (mais recente/Z-A primeiro)

  const toggleSort = (type: "year" | "alpha") => {
    if (sortBy === type) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(type);
      setSortAsc(false);
    }
  };

  const categories = ["books", "papers", "articles", "tools", "courses"] as const;

  const filteredRefs = references
    .filter((ref) => {
      const matchesFilter = !filter || ref.category === filter;
      const matchesSearch =
        !search ||
        ref.title.toLowerCase().includes(search.toLowerCase()) ||
        ref.author.toLowerCase().includes(search.toLowerCase()) ||
        ref.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "year") {
        const diff = (a.year || 0) - (b.year || 0);
        return sortAsc ? diff : -diff;
      }
      const diff = a.title.localeCompare(b.title);
      return sortAsc ? diff : -diff;
    });

  const exportXML = () => {
    const xml = generateXML(filteredRefs, locale);
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "v1torres-references.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl font-medium mb-2">
          <T k="refs.title" />
        </h1>
        <p className="text-fg-muted text-sm">
          <T k="refs.description" />
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`badge ${!filter ? "badge-solid" : ""}`}
          >
            all
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`badge ${filter === cat ? "badge-solid" : ""}`}
            >
              <T k={`refs.categories.${cat}`} />
            </button>
          ))}
        </div>

        {/* Search & Export */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="flex items-center gap-1 text-xs text-fg-muted">
            <button
              onClick={() => toggleSort("year")}
              className={`px-1.5 py-0.5 transition-colors ${
                sortBy === "year" 
                  ? "text-fg-primary" 
                  : "hover:text-fg-primary"
              }`}
            >
              {locale === "pt-BR" ? "ano" : "year"}
              {sortBy === "year" && (
                <span className="ml-0.5">{sortAsc ? "↑" : "↓"}</span>
              )}
            </button>
            <span className="text-fg-subtle">/</span>
            <button
              onClick={() => toggleSort("alpha")}
              className={`px-1.5 py-0.5 transition-colors ${
                sortBy === "alpha" 
                  ? "text-fg-primary" 
                  : "hover:text-fg-primary"
              }`}
            >
              {sortBy === "alpha" ? (sortAsc ? "a→z" : "z→a") : "a-z"}
            </button>
          </div>

          <input
            type="text"
            placeholder={locale === "pt-BR" ? "buscar..." : "search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-bg-secondary border border-border-default px-3 py-1 text-sm focus:outline-none focus:border-fg-muted w-40"
          />
          <button
            onClick={exportXML}
            className="badge badge-solid hover:bg-bg-tertiary transition-colors"
          >
            <T k="refs.export" />
          </button>
        </div>
      </div>

      {/* References list */}
      {filteredRefs.length === 0 ? (
        <p className="text-fg-muted text-sm">
          <T k="refs.empty" />
        </p>
      ) : (
        <ul className="space-y-6">
          {filteredRefs.map((ref) => (
            <li
              key={ref.id}
              className="border-l border-dotted border-border-default pl-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-fg-muted transition-colors"
                      >
                        {ref.title}
                      </a>
                    ) : (
                      ref.title
                    )}
                  </h3>
                  <p className="text-sm text-fg-muted">
                    {ref.author}
                    {ref.year && ` · ${ref.year}`}
                  </p>
                </div>
                <span className="badge shrink-0">
                  <T k={`refs.categories.${ref.category}`} />
                </span>
              </div>

              <p className="text-sm text-fg-secondary mt-2">
                {ref.description[locale]}
              </p>

              <div className="flex gap-2 mt-2">
                {ref.tags.map((tag) => (
                  <span key={tag} className="text-xs text-fg-subtle">
                    #{tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function generateXML(refs: Reference[], locale: Locale): string {
  const items = refs
    .map(
      (ref) => `  <reference id="${ref.id}">
    <title>${escapeXML(ref.title)}</title>
    <author>${escapeXML(ref.author)}</author>
    <category>${ref.category}</category>
    ${ref.year ? `<year>${ref.year}</year>` : ""}
    ${ref.url ? `<url>${escapeXML(ref.url)}</url>` : ""}
    <description>${escapeXML(ref.description[locale])}</description>
    <tags>${ref.tags.join(", ")}</tags>
  </reference>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<references source="v1torres.dev" locale="${locale}" exported="${new Date().toISOString()}">
${items}
</references>`;
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
