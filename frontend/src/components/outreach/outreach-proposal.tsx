"use client";

import { useEffect, type ReactNode } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { outreachCopy, type OutreachCopy } from "@/components/outreach/outreach-copy";
import { cn } from "@/lib/utils";

function SectionTitle({ value }: { value: string }) {
  const [index, ...label] = value.split(" · ");

  return (
    <>
      <span className="tabular-nums text-fg-subtle">{index}</span>
      {label.length > 0 ? <span> · {label.join(" · ")}</span> : null}
    </>
  );
}

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="proposal-section mb-8">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 text-[16px] font-medium text-fg-primary">
        <span className="proposal-chevron text-fg-muted" aria-hidden>›</span>
        <h2 className="text-[16px] font-medium tracking-normal"><SectionTitle value={title} /></h2>
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 border-l border-dotted border-border-default pl-4 text-[15px] leading-7 text-fg-secondary">
      {children}
    </div>
  );
}

function DataTable({
  headers,
  rows,
  footnote,
  widths,
  numericLast = false,
}: {
  headers: string[];
  rows: string[][];
  footnote?: string;
  widths?: string[];
  numericLast?: boolean;
}) {
  const lastRow = rows.length - 1;

  return (
    <div className="mt-4">
      <div className="hidden sm:block">
        <table className="w-full table-fixed border-collapse text-left text-sm leading-6">
          {widths ? (
            <colgroup>
              {widths.map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
          ) : null}
          <thead>
            <tr className="border-b border-dotted border-border-default text-fg-muted">
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "py-3 pr-4 font-medium",
                    numericLast && index === headers.length - 1 && "pr-0 text-right",
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-dotted border-border-default/60 text-fg-secondary",
                  rowIndex === lastRow && "bg-bg-secondary/40",
                )}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "py-4 pr-4 align-top whitespace-pre-line",
                      cellIndex === row.length - 1 && "font-medium text-fg-primary",
                      numericLast &&
                        cellIndex === row.length - 1 &&
                        "whitespace-nowrap pr-0 text-right tabular-nums",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-y border-dotted border-border-default sm:hidden">
        {rows.map((row, rowIndex) => {
          const [title, ...rest] = row;
          return (
            <div
              key={rowIndex}
              className={cn(
                "py-4",
                rowIndex > 0 && "border-t border-dotted border-border-default",
                rowIndex === lastRow && "bg-bg-secondary/40",
              )}
            >
              <p className="text-sm font-medium leading-6 text-fg-primary">{title}</p>
              {rest.length > 0 ? (
                <dl className="mt-2 space-y-2">
                  {rest.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-3"
                    >
                      <dt className="text-xs leading-6 text-fg-muted">
                        {headers[cellIndex + 1]}
                      </dt>
                      <dd
                        className={cn(
                          "break-words whitespace-pre-line text-sm leading-6 text-fg-secondary",
                          cellIndex === rest.length - 1 && "font-medium text-fg-primary",
                        )}
                      >
                        {cell}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          );
        })}
      </div>

      {footnote ? (
        <p className="mt-3 max-w-3xl text-sm leading-6 text-fg-muted">{footnote}</p>
      ) : null}
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
              <p className="mt-1 text-[15px] leading-7 text-fg-secondary">{row.note}</p>
              {row.gate ? <p className="mt-3 border-l-2 border-[var(--fg-primary)] pl-3 text-[15px] leading-7 text-fg-primary">{row.gate}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 max-w-3xl text-sm leading-6 text-fg-muted">{caption}</figcaption>
    </figure>
  );
}

export function OutreachProposal() {
  const { locale } = useLocale();
  const copy = outreachCopy[locale];

  // Expand every section so a printed or PDF copy is complete.
  useEffect(() => {
    const openSections = () => {
      document
        .querySelectorAll<HTMLDetailsElement>(".proposal-section")
        .forEach((section) => {
          section.open = true;
        });
    };

    window.addEventListener("beforeprint", openSections);
    return () => window.removeEventListener("beforeprint", openSections);
  }, []);

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
        <p className="text-base text-fg-secondary max-w-3xl leading-7">{copy.lede}</p>

        <div className="mt-7 border border-border-default">
          <div className="bg-bg-secondary/50 px-4 py-5 sm:px-5 sm:py-6">
            <p className="text-xs leading-5 text-fg-subtle">{copy.recommendLabel}</p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[2rem] font-medium leading-none tracking-tight text-fg-primary sm:text-[2.25rem]">
                {copy.priceValue}
              </span>
              <span className="text-sm text-fg-muted">{copy.priceLabel}</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-fg-muted">{copy.recommendRest}</p>
          </div>
          <div className="border-t border-dotted border-border-default px-4 py-4 sm:px-5">
            <p className="max-w-3xl text-sm leading-6 text-fg-secondary">{copy.priceAnchor}</p>
          </div>
          <dl className="grid border-t border-border-default sm:grid-cols-3">
            {copy.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-dotted border-border-default px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:px-5"
              >
                <dt className="text-xs text-fg-subtle">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-6 text-fg-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-4 text-sm leading-6 text-fg-muted">
          {copy.prepared}
          {" · "}
          <a
            href="https://iamhoste.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="print-plain hover:text-fg-primary transition-colors"
          >
            iamhoste.com
          </a>
          {" · "}
          {copy.separate}
        </p>
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
              className="flex gap-3 border-b border-dotted border-border-default px-4 py-4 text-[15px] leading-7 last:border-b-0"
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
          widths={["auto", "7.5rem"]}
          numericLast
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

      <CollapsibleSection title={copy.sections.timeline}>
        <p className="max-w-3xl text-[15px] leading-7 text-fg-secondary">{copy.timelineIntro}</p>
        <BuildTimeline rows={copy.timeline} caption={copy.timelineCaption} />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title={copy.sections.source}>
        <Prose>
          <p>{copy.sourceIntro}</p>
        </Prose>
        <DataTable
          headers={copy.sourceHeaders}
          rows={copy.sourceRows}
          footnote={copy.sourceFoot}
          widths={["18%", "36%", "28%", "18%"]}
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
        <DataTable
          headers={copy.costHeaders}
          rows={copy.costRows}
          footnote={copy.costFoot}
          widths={["auto", "9.5rem"]}
          numericLast
        />
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
