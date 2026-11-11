"use client";

import { useState, type ReactNode } from "react";
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
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3 text-sm text-fg-secondary leading-relaxed pl-4 border-l border-dotted border-border-default">
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
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-dotted border-border-default text-fg-subtle">
              {headers.map((header) => (
                <th key={header} className="py-2 pr-4 font-medium whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-dotted border-border-default/60 text-fg-secondary"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      "py-2 pr-4 align-top",
                      j === row.length - 1 && "font-medium text-fg-primary"
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
      {footnote ? <p className="mt-2 text-xs text-fg-subtle">{footnote}</p> : null}
    </div>
  );
}

const WEEKS = ["wk1", "wk2", "wk3"] as const;

const BUILD_ROWS = [
  { name: "airdna connection", start: 0, end: 1, note: "US$ 600" },
  { name: "address + confidence", start: 1, end: 1.9, note: "US$ 550" },
  { name: "queue, owner, sheet, test", start: 1.9, end: 2.8, note: "US$ 550" },
] as const;

function BuildTimeline() {
  return (
    <figure className="mt-4">
      <div className="border border-border-default">
        <div className="grid grid-cols-3 border-b border-dotted border-border-default text-[11px] text-fg-subtle">
          {WEEKS.map((week) => (
            <div
              key={week}
              className="border-l border-dotted border-border-default px-2 py-2 first:border-l-0"
            >
              {week}
            </div>
          ))}
        </div>
        {BUILD_ROWS.map((row) => (
          <div
            key={row.name}
            className="border-b border-dotted border-border-default px-0 py-3 last:border-b-0"
          >
            <div className="mb-2 flex items-baseline justify-between gap-3 px-2 text-xs">
              <span className="text-fg-primary">{row.name}</span>
              <span className="shrink-0 text-fg-muted">{row.note}</span>
            </div>
            <div className="relative h-5">
              <div className="pointer-events-none absolute inset-0 grid grid-cols-3" aria-hidden>
                {WEEKS.map((week) => (
                  <div
                    key={week}
                    className="border-l border-dotted border-border-default first:border-l-0"
                  />
                ))}
              </div>
              <div
                className="absolute top-1/2 h-[3px] -translate-y-1/2"
                style={{
                  left: `${(row.start / WEEKS.length) * 100}%`,
                  width: `calc(${((row.end - row.start) / WEEKS.length) * 100}% - 0.55rem)`,
                  backgroundColor: "var(--fg-primary)",
                }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs leading-none text-fg-primary"
                style={{ left: `calc(${(row.end / WEEKS.length) * 100}% - 0.55rem)` }}
                aria-hidden
              >
                ●
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-fg-subtle">
        <span className="mr-1">›</span>
        phase 1 in order, at 20h/week. the fixed price lands near the end of week 3.
      </figcaption>
    </figure>
  );
}

const STEPS = [
  {
    mark: "1",
    title: "search",
    detail: "city, rating cap of 4.8, and how many leads. the result is a queue of listings, not a call list.",
  },
  {
    mark: "2",
    title: "address",
    detail: "the pin is approximate on purpose. the system proposes the house and a confidence score.",
  },
  {
    mark: "3",
    title: "confirm",
    detail: "a clear match can continue. a doubtful match stops, with the photos side by side, until a person says yes or no.",
  },
  {
    mark: "4",
    title: "owner",
    detail: "only a confirmed address is looked up. the row becomes a spreadsheet line, or an explicit incomplete.",
  },
] as const;

export function OutreachProposal() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="badge">proposal</span>
          <span className="badge">hoste</span>
          <span className="badge">owner outreach</span>
        </div>
        <h1 className="text-xl font-medium mb-3">hoste · owner outreach</h1>
        <p className="text-sm text-fg-secondary max-w-2xl leading-relaxed">
          A panel that turns a market search into a spreadsheet of confirmed
          houses and owner contacts. The person who already matches houses keeps
          the doubtful ones. The system does the rest.
        </p>
        <p className="mt-4 text-sm text-fg-muted">
          recommendation ·{" "}
          <span className="text-fg-primary font-medium">phase 1 · US$ 1,700</span>
          {" · "}fixed, it does not go above this · about 3 weeks · uses the AirDNA account Hoste already pays
        </p>
        <p className="mt-2 text-xs text-fg-subtle">
          prepared for Hoste ·{" "}
          <a
            href="https://iamhoste.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg-primary transition-colors"
          >
            iamhoste.com
          </a>
          {" · "}separate from the listing onboarding delivery
        </p>
      </header>

      <CollapsibleSection title="1 · what this is">
        <Prose>
          <p>
            Hoste already finds short-term rentals for outreach. Someone opens a
            market, filters to 4.8 stars and below, opens the listing, and
            matches the approximate map pin to a real house by the pool, the
            roof, and the chairs. Then the address goes to a spreadsheet and
            gets skip traced for the owner.
          </p>
          <p>
            The product is that same path, inside one panel. Macario picks the
            city and the cap. The system returns a queue. A person confirms the
            house when two or three candidates remain. Only a confirmed address
            is sent for the owner&apos;s phone and email.
          </p>
          <p>
            This is not a phone app, a chat, or a bot that messages owners. A
            wrong house is the expensive mistake, so outreach never starts from
            a guess.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="2 · how it runs">
        <ol className="mt-1 border border-border-default">
          {STEPS.map((step) => (
            <li
              key={step.mark}
              className="flex gap-3 border-b border-dotted border-border-default px-3 py-3 text-xs last:border-b-0"
            >
              <span className="w-4 shrink-0 text-fg-subtle">{step.mark}</span>
              <span>
                <span className="text-fg-primary">{step.title}</span>
                <span className="mt-1 block text-fg-secondary">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <Prose>
          <p className="pt-4">
            Airbnb hides the exact address. The pin can sit hundreds of meters
            off, which is why the house in the Loom almost became the neighbor.
            In Phoenix a lot of houses look alike, and Street View does not show
            the backyard pool. The system crosses the pin with public parcel
            maps first. Pool shape, roof, and furniture are checked only when a
            few houses are still possible.
          </p>
          <p>
            A language model does not research the owner. Asked to &quot;find the
            phone,&quot; it will invent one. Owner name, phone, and email come
            from a property-data vendor, and only after the address is
            confirmed. An LLC or a trust often comes back incomplete, and the
            row says so.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="3 · where the listings come from">
        <Prose>
          <p>
            AirDNA stays the source. Hoste already pays for the account used in
            the Loom. Their sales follow-up confirms which API would do this
            job, and the price still does not fit.
          </p>
        </Prose>
        <DataTable
          headers={["path", "what you get", "price they quoted", "fit"]}
          rows={[
            [
              "Market Data API",
              "city and submarket totals: occupancy, rate, revenue, supply, trends",
              "US$ 7,000/year · 2,000 calls/mo · US$ 0.50 after",
              "no individual house",
            ],
            [
              "Property Valuations & Comps",
              "search a market with filters, then each listing: location, attributes, listing info",
              "US$ 12,000/year · 4,000 calls/mo · US$ 0.50 after",
              "the tier that fits, and it is too expensive",
            ],
            [
              "account Hoste already has",
              "the same screens, collected for the panel",
              "no new AirDNA bill",
              "this proposal",
            ],
          ]}
          footnote="Written follow-up from AirDNA after the sales call. Prices are not on their site. They did not name photos in the US$ 12,000 tier. Matching two similar houses still needs those photos. The price rules the tier out either way."
        />
        <Prose>
          <p className="pt-4">
            The licence would be Hoste's, with me named as the contractor, and
            it would cover Hoste only. AirDNA wrote the customer name as
            Hosty in that email. That has to be corrected before any contract.
          </p>
          <p>
            I maintain the connection when AirDNA changes the site. That upkeep
            is mine, billed at US$ 30/h when it happens. If they block automated
            use of the login, this route stops and the API is the fallback,
            at their price.
          </p>
          <p>
            Building a separate system that collects listings from Airbnb,
            Vrbo, and the other sites is a different project. AirDNA already
            does that collection. This proposal does not try to replace them.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="4 · what I build">
        <DataTable
          headers={["piece", "amount"]}
          rows={[
            ["connection to the AirDNA account Hoste already pays", "US$ 600"],
            ["address proposal, parcel match, confidence", "US$ 550"],
            ["confirmation queue, owner lookup, spreadsheet, Phoenix test", "US$ 550"],
            ["phase 1 total", "US$ 1,700"],
          ]}
          footnote="Fixed price. It does not go above US$ 1,700. About 3 weeks at 20h/week. The first hours confirm the screens still match the Loom. A full unattended crawl of a market is a later phase, quoted after this panel is in use."
        />
        <BuildTimeline />
        <Prose>
          <p className="pt-4">
            Phase 1 is one market at a time, started by a person, with a cap on
            how many listings come back. Phoenix is the first test, because
            that is the market in the Loom and the county publishes parcel maps.
          </p>
          <p>
            Acceptance is one Phoenix search that lands in the queue, one
            doubtful house confirmed by a person, one confirmed address that
            returns an owner or an explicit incomplete, and a spreadsheet.
            No owner is contacted by the system.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="5 · what a lead costs to run">
        <Prose>
          <p>
            The bill follows the lead, not the radius. Hoste pays the vendors
            directly. There is no markup.
          </p>
        </Prose>
        <DataTable
          headers={["step", "when", "published example"]}
          rows={[
            ["parcel map", "every candidate house", "US$ 0 · county open data"],
            ["map lookup", "pin to street", "US$ 0.005 after 10,000 free/month"],
            ["photo check", "only if a few houses remain", "about US$ 0.02"],
            ["owner, from address only", "after a person confirms", "US$ 0.04 per hit · misses free"],
          ]}
          footnote="Map price is Google Geocoding. Owner price is Tracerfy Advanced, address in, contact out, as published. The vendor can change at build time. A monthly skip-trace plan is the wrong shape here: Hoste pays per hit, not a US$ 2,000 block."
        />
        <DataTable
          headers={["confirmed leads / mo", "owner lookups if every one hits", "maps + photos", "vendor total"]}
          rows={[
            ["50", "US$ 2", "inside the free map tier", "about US$ 3"],
            ["200", "US$ 8", "about US$ 2", "about US$ 10"],
            ["1,000", "US$ 40", "about US$ 8", "about US$ 50"],
          ]}
          footnote="Illustration. One in three leads is assumed to need a photo check. The AirDNA login Hoste already pays is not in this table. A person's time confirming doubtful houses costs more than these vendor fees once volume grows."
        />
        <Prose>
          <p className="pt-4">
            Against that, the property-level API starts at US$ 1,000 a month
            before a single extra call. The account Hoste already has, plus a
            few dollars of lookups, is the lean path.
          </p>
          <p>
            Calls and texts stay with Hoste. When the vendor returns a Do Not
            Call flag, the row shows it. The system does not dial.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="6 · upkeep">
        <Prose>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">when AirDNA changes the site</span>
                {" · "}US$ 30/h. this connection will break. the listing pipeline does not have this problem.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">optional reserve</span>
                {" · "}4h/month, US$ 120, if you want the fix time already set aside.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">hosting</span>
                {" · "}the same private panel pattern as the listing system. a few dollars a month at this volume, on Hoste&apos;s Google once that move is done.
              </span>
            </li>
          </ul>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="7 · in / out">
        <Prose>
          <p>
            <span className="text-fg-primary font-medium">in this build</span>
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>market, rating cap, and lead cap</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>listings from the AirDNA account, with pin and photos</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>proposed address and a confidence score</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>a queue where a person confirms the doubtful houses</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>owner lookup on confirmed addresses, then a spreadsheet</span>
            </li>
          </ul>
          <p className="pt-2">
            <span className="text-fg-primary font-medium">not in this build</span>
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>messages, calls, or emails to owners</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>a crawl that runs a whole market with nobody starting it</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>a replacement for AirDNA across Airbnb, Vrbo, and the other sites</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>the AirDNA subscription itself</span>
            </li>
          </ul>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="8 · next step">
        <Prose>
          <p>
            Phase 1 is the product: US$ 1,700, and it does not go above that. About 3 weeks, on the AirDNA
            account Hoste already pays. I start with Phoenix and the 4.8 filter
            from the Loom.
          </p>
          <p>
            The person who matches houses today stays on the doubtful ones.
            Everyone else stops scrolling the map.
          </p>
        </Prose>
        <div className="mt-6 pl-4 border-l border-dotted border-border-default">
          <p className="text-sm text-fg-muted mb-3">next step</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:contato@v1torres.dev?subject=Hoste%20owner%20outreach%20proposal"
              className="text-fg-primary hover:text-fg-muted transition-colors"
            >
              email · contato@v1torres.dev
            </a>
            <span className="text-fg-subtle">|</span>
            <a
              href="http://wa.me/5581982290877"
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

      <CollapsibleSection title="9 · sources" defaultOpen={false}>
        <ul className="space-y-2 text-sm">
          {[
            ["AirDNA API overview", "https://airdna.redoc.ly/#section/Introduction"],
            ["AirDNA contact", "https://www.airdna.co/contact"],
            ["Google Geocoding pricing", "https://developers.google.com/maps/billing-and-pricing/pricing"],
            ["Tracerfy skip trace pricing", "https://www.tracerfy.com/pricing"],
          ].map(([label, href]) => (
            <li key={href} className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-fg-primary transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </div>
  );
}
