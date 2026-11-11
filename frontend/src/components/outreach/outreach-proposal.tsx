"use client";

import { type ReactNode } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { outreachCopy, type OutreachCopy } from "@/components/outreach/outreach-copy";
import { cn } from "@/lib/utils";

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="proposal-section mb-8">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 text-base font-medium text-fg-primary">
        <span className="proposal-chevron text-fg-muted" aria-hidden>›</span>
        <h2 className="text-base font-medium tracking-normal">{title}</h2>
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-base text-fg-secondary leading-7 pl-4 border-l border-dotted border-border-default">
      {children}
    </div>
  );
}

function DataTable({
  headers,
  rows,
  footnote,
}: {
  headers: string[];
  rows: string[][];
  footnote?: string;
}) {
  return (
    <div className="mt-4">
      <div className="hidden sm:block">
        <table className="w-full text-sm leading-6 text-left border-collapse">
          <thead>
            <tr className="border-b border-dotted border-border-default text-fg-muted">
              {headers.map((header) => (
                <th key={header} scope="col" className="py-3 pr-4 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-dotted border-border-default/60 text-fg-secondary">
                {row.map((cell, j) => (
                  <td key={j} className={cn("py-4 pr-4 align-top", j === row.length - 1 && "font-medium text-fg-primary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-dotted divide-border-default border-y border-dotted border-border-default sm:hidden">
        {rows.map((row, i) => (
          <dl key={i} className="space-y-3 py-4 text-sm leading-6">
            {row.map((cell, j) => (
              <div key={j}>
                <dt className="text-xs text-fg-muted">{headers[j]}</dt>
                <dd className={cn("mt-1 break-words text-fg-secondary", (j === 0 || j === row.length - 1) && "font-medium text-fg-primary")}>{cell}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      {footnote ? <p className="mt-3 text-sm leading-6 text-fg-muted">{footnote}</p> : null}
    </div>
  );
}

function BuildTimeline({ rows, caption }: { rows: OutreachCopy["timeline"]; caption: string }) {
  return (
    <figure className="my-6">
      <ol className="ml-3 border-l border-dotted border-border-default">
        {rows.map((row, index) => (
          <li key={row.name} className="relative pb-7 pl-7 text-sm leading-6 last:pb-0 sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5">
            <span aria-hidden="true" className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center border border-border-default bg-[var(--bg-primary)] text-xs text-fg-primary">{index + 1}</span>
            <p className="text-xs leading-6 text-fg-muted">{row.period}</p>
            <div>
              <h3 className="font-medium text-fg-primary">{row.name}</h3>
              <p className="mt-1 text-fg-secondary">{row.note}</p>
              {row.gate ? <p className="mt-3 border-l-2 border-[var(--fg-primary)] pl-3 text-fg-primary">{row.gate}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm leading-6 text-fg-muted">{caption}</figcaption>
    </figure>
  );
}

export function OutreachProposal() {
  const { locale } = useLocale();
  const copy = outreachCopy[locale];

  return (
    <div className="mx-auto proposal-document max-w-4xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {copy.badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl leading-tight tracking-tight font-medium mb-5">{copy.title}</h1>
        <p className="text-base text-fg-secondary max-w-2xl leading-7">{copy.lede}</p>
        <div className="my-6 border-y border-border-default py-5 text-sm leading-6 text-fg-muted">
          {copy.recommendLabel}
          <span className="block my-2 text-2xl font-medium tracking-tight text-fg-primary sm:text-3xl">{copy.price}</span>
          {copy.recommendRest}
          <p className="mt-3 max-w-2xl text-fg-secondary">{copy.priceAnchor}</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-fg-muted">
          {copy.prepared}
          {" · "}
          <a
            href="https://iamhoste.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg-primary transition-colors"
          >
            iamhoste.com
          </a>
          {" · "}
          {copy.separate}
        </p>
        <dl className="mt-8 grid border border-border-default sm:grid-cols-3">
          {copy.facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-dotted border-border-default px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0"
            >
              <dt className="text-xs text-fg-subtle">{fact.label}</dt>
              <dd className="mt-1 text-sm text-fg-primary">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <CollapsibleSection title={copy.sections.what}>
        <Prose>
          {copy.what.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.path}>
        <ol className="border border-border-default">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-3 border-b border-dotted border-border-default px-4 py-4 text-base leading-7 last:border-b-0"
            >
              <span className="w-4 shrink-0 text-fg-subtle">{index + 1}</span>
              <span>
                <span className="text-fg-primary">{step.title}</span>
                <span className="mt-1 block text-fg-secondary">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <Prose>
          {copy.pathNotes.map((paragraph) => (
            <p key={paragraph} className="pt-4 first:pt-4">
              {paragraph}
            </p>
          ))}
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.build}>
        <DataTable
          headers={copy.buildHeaders}
          rows={copy.buildRows}
          footnote={copy.buildFoot}
        />
        <Prose>
          {copy.buildNotes.map((paragraph) => (
            <p key={paragraph} className="pt-4">
              {paragraph}
            </p>
          ))}
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <section id="timeline" aria-labelledby="timeline-heading" className="mb-8 scroll-mt-8">
        <h2 id="timeline-heading" className="flex min-h-12 items-center text-base font-medium tracking-normal text-fg-primary">{copy.sections.timeline}</h2>
        <p className="mt-4 text-base leading-7 text-fg-secondary">{copy.timelineIntro}</p>
        <BuildTimeline rows={copy.timeline} caption={copy.timelineCaption} />
      </section>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.source}>
        <Prose>
          <p>{copy.sourceIntro}</p>
        </Prose>
        <DataTable
          headers={copy.sourceHeaders}
          rows={copy.sourceRows}
          footnote={copy.sourceFoot}
        />
        <Prose>
          {copy.sourceNotes.map((paragraph) => (
            <p key={paragraph} className="pt-4">
              {paragraph}
            </p>
          ))}
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.cost}>
        <Prose>
          <p>{copy.costIntro}</p>
        </Prose>
        <DataTable headers={copy.costHeaders} rows={copy.costRows} footnote={copy.costFoot} />
        <Prose>
          {copy.costNotes.map((paragraph) => (
            <p key={paragraph} className="pt-4">
              {paragraph}
            </p>
          ))}
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.next}>
        <Prose>
          {copy.next.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <div className="mt-6 pl-4 border-l border-dotted border-border-default">
          <p className="text-sm text-fg-muted mb-3">{copy.nextLabel}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:contato@v1torres.dev?subject=Hoste%20owner%20outreach"
              className="text-fg-primary hover:text-fg-muted transition-colors"
            >
              {copy.email}
            </a>
            <span className="text-fg-subtle">|</span>
            <a
              href="https://wa.me/5581982290877"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-primary hover:text-fg-muted transition-colors"
            >
              whatsapp
            </a>
          </div>
        </div>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.sources} defaultOpen={false}>
        <ul className="space-y-2 text-sm">
          {copy.sources.map((source) => (
            <li key={source.href} className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-fg-primary transition-colors"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </div>
  );
}
