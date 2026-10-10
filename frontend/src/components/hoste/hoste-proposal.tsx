"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DeliveryTimeline, ListingCycle, WeekPlan } from "@/components/hoste/hoste-timeline";

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

function MonoBlock({ children, caption }: { children: string; caption?: string }) {
  return (
    <figure className="mt-4">
      <pre className="bg-bg-code text-code-fg p-4 text-xs overflow-x-auto border border-border-default whitespace-pre leading-relaxed">
        {children}
      </pre>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fg-subtle flex items-center gap-1">
          <span>›</span>
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
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
              {headers.map((h) => (
                <th key={h} className="py-2 pr-4 font-medium whitespace-nowrap">
                  {h}
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
      {footnote ? (
        <p className="mt-2 text-xs text-fg-subtle">{footnote}</p>
      ) : null}
    </div>
  );
}

const PIPELINE_FLOW = `Typeform (existing)
        ↓
validate data + create initial Guesty listing
        ↓
 ┌──────────────────┬───────────────────┬──────────────────┐
 │ property data    │ photos            │ commercial rules │
 │ team visit       │ team photographs  │ fees & pricing   │
 │ amenities        │ file delivery     │ policies & dates │
 └──────────────────┴───────────────────┴──────────────────┘
        ↓ each delivery updates the same listing
fill + texts + uploads + configs
        ↓
integrations + completeness checks
        ↓
final review of decisions & exceptions
        ↓
authorized publication + verification`;

const OWN_PIPELINE = `Typeform (existing)
        ↓
validate data + identify gaps
        ↓
DeepSeek · organize info + generate copy
        ↓
Python · execute listing setup
        ↓
Guesty → PriceLabs → Besty
        ↓
team review & approval
        ↓
authorized go-live + verification`;

export function HosteProposal() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="badge">proposal</span>
          <span className="badge">hoste</span>
          <span className="badge">listing automation</span>
        </div>
        <h1 className="text-xl font-medium mb-3">
          hoste · listing onboarding automation
        </h1>
        <p className="text-sm text-fg-secondary max-w-2xl leading-relaxed">
          proposal for automating Hoste&apos;s property listing creation from
          the existing Typeform through Guesty, content, integrations, and
          publication, with a lean dashboard and measurable operating cost.
        </p>
        <p className="mt-4 text-sm text-fg-muted">
          recommendation ·{" "}
          <span className="text-fg-primary font-medium">
            own pipeline · US$ 1,120
          </span>{" "}
          · ~US$ 5.54/mo at 100 new listings · human review focused on decisions
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
          </a>{" "}
          · rate US$ 14/h · preliminary until access validation
        </p>
      </header>

      <CollapsibleSection title="1 · summary" defaultOpen={true}>
        <Prose>
          <p>
            Hoste already runs onboarding through Typeform, Guesty, Breezeway,
            PriceLabs, Besty, and team photography. Today the administrative
            path from form submit to a ready listing takes about one to two
            weeks. That is not because someone works that whole time. Data,
            photos, and decisions arrive in parallel and must be coordinated.
          </p>
          <p>
            This proposal covers two paths: a Claude-assisted setup on a
            computer, or an owned pipeline (Render + Google Cloud Run Jobs +
            DeepSeek Flash) with a dashboard on Hoste&apos;s domain. The
            recommended path is the owned pipeline: lower recurring cost per
            listing, durable state across the multi-day cycle, and human effort
            concentrated on photography, pricing exceptions, and final approval.
          </p>
          <p>
            A basic Claude Pro seat would not sustain the session volume of
            this operation. A realistic Claude path starts at Max 5x (US$
            100/mo) and can require Max 20x (US$ 200/mo). Even then, the main
            cost is administrative hours. The ROI case is hours freed per
            listing, plus a pipeline Hoste owns and can extend.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="2 · two paths" defaultOpen={true}>
        <Prose>
          <p>
            <span className="text-fg-primary font-medium">path a · claude on a computer.</span>{" "}
            Configure instructions, content templates, and tools so an agent
            helps with listing setup. A person watches execution, unblocks
            issues, and approves publication.
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>setup + assisted pilot: US$ 280 (20h × US$ 14/h)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>Claude Max 5x: US$ 100/mo baseline (Pro at US$ 20 does not hold the sessions)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>Claude Max 20x: US$ 200/mo for heavier weeks · both monthly only</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>best for few listings, variable process, idea validation</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>no owned dashboard or autonomous integrations</span>
            </li>
          </ul>
          <p>
            Listing setup means long browser sessions and many tool calls per
            property. Pro runs out within a session. Max raises the ceiling but
            keeps five-hour and weekly caps, so no plan guarantees a fixed
            number of listings. Every run still needs a person at the computer,
            and the subscription does not cover the API a custom system uses.
          </p>
          <p className="pt-2">
            <span className="text-fg-primary font-medium">path b · owned pipeline (recommended).</span>{" "}
            Take the technical pipeline end-to-end with durable state, parallel
            wait points, and a dashboard for completeness.
          </p>
        </Prose>
        <MonoBlock caption="owned pipeline · high level">{OWN_PIPELINE}</MonoBlock>
        <DataTable
          headers={[
            "owned pipeline option",
            "effort target",
            "budget",
            "timeline @ 20h/wk",
          ]}
          rows={[
            [
              "API-first · browser for gaps",
              "80 hours",
              "US$ 1,120",
              "~4 weeks",
            ],
            [
              "heavy browser automation",
              "120 hours",
              "US$ 1,680",
              "~6 weeks",
            ],
          ]}
          footnote="Alternatives, not additive. The first 4 hours (included) validate Guesty write access and confirm the technical path. A reduced pilot at US$ 700 / 50h remains available. Work rolls forward if you expand to full scope."
        />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="3 · timeline · every option" defaultOpen={true}>
        <Prose>
          <p>
            All options side by side at 20h/week. Each bar ends at a working
            delivery, not at a document.
          </p>
        </Prose>
        <DeliveryTimeline />
        <WeekPlan />
        <Prose>
          <p className="pt-4">
            B2 runs the same phases. Weeks 2 to 5 stretch to cover browser
            automation wherever the Guesty API has gaps.
          </p>
          <p>
            Once live, every new listing follows its own one to two week cycle.
            The system only spends compute when something arrives.
          </p>
        </Prose>
        <ListingCycle />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="4 · architecture · parallel + resilient" defaultOpen={true}>
        <Prose>
          <p>
            Onboarding is not one linear job. After the initial Guesty listing,
            Breezeway onboarding, photos, visit data, and commercial rules can
            advance in parallel. The system needs a coordinator that keeps one
            listing state open for one to two weeks and resumes when each
            delivery arrives. It does not hold a browser open while waiting.
          </p>
        </Prose>
        <MonoBlock caption="end-to-end onboarding with parallel fronts">{PIPELINE_FLOW}</MonoBlock>
        <Prose>
          <p className="pt-4">completeness requirements for point-to-point coverage:</p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">completeness</span>
                {" · "}checklist of data, photos, configs, and integrations
                needed to publish
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">resume</span>
                {" · "}continue from the last confirmed step after failures or
                restarts
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">idempotency</span>
                {" · "}Typeform retries must not create duplicate listings
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">coordination</span>
                {" · "}owners, due dates, blockers, alerts for stalled items
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">verification</span>
                {" · "}confirm what was written in each system and that go-live
                happened
              </span>
            </li>
          </ul>
          <p>
            Guesty documents listing creation via Open API; the MCP server is
            currently read-only. We will confirm write permissions on Hoste&apos;s
            account in the first hours. Where API coverage is incomplete, Python
            + browser automation fills the gap.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="5 · human vs system" defaultOpen={true}>
        <Prose>
          <p>
            Human effort stays where it creates value. The system presents what
            is missing, what diverges, and what needs a decision. It does not
            ask for every field again.
          </p>
        </Prose>
        <DataTable
          headers={["activity", "team", "system"]}
          rows={[
            [
              "visit & photography",
              "go on-site, verify, shoot",
              "track delivery & gaps",
            ],
            [
              "data & photos",
              "provide info & files",
              "validate, organize, upload",
            ],
            [
              "fees & policies",
              "define / approve exceptions",
              "apply agreed rules",
            ],
            [
              "copy & listing fields",
              "review flagged points",
              "generate, fill, verify",
            ],
            [
              "publication",
              "authorize go-live",
              "execute & confirm",
            ],
          ]}
        />
        <Prose>
          <p className="pt-4">
            Photos are Hoste&apos;s team work. The pipeline waits for them and
            resumes. DeepSeek Flash handles labeling: interpret answers,
            organize amenities, produce titles/descriptions from confirmed data.
            Fee rules, dates, and publication stay in code.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="6 · infrastructure · minimum spend" defaultOpen={true}>
        <Prose>
          <p>
            No new domain purchase. Use something like{" "}
            <span className="text-fg-primary">dashboard.iamhoste.com</span>{" "}
            (subdomain on the existing domain). A path like{" "}
            <span className="text-fg-primary">iamhoste.com/dashboard</span>{" "}
            would require wiring into the current site. The subdomain is cleaner.
          </p>
        </Prose>
        <DataTable
          headers={["component", "choice", "expected cost"]}
          rows={[
            ["dashboard", "Render Static Site", "US$ 0 within limits"],
            ["address + HTTPS", "dashboard.iamhoste.com", "US$ 0 extra"],
            [
              "webhook + panel API",
              "Cloud Run Service (scale to zero)",
              "usage; low volume in free tier",
            ],
            ["python / browser jobs", "Cloud Run Jobs", "per execution time"],
            ["history & blockers", "Firestore", "within free allowance"],
            ["labeling + copy", "DeepSeek Flash API", "per tokens"],
            [
              "temp files, logs, builds, secrets",
              "auxiliary services",
              "joint reserve US$ 3–10/mo",
            ],
          ]}
          footnote="Lean default: Render static UI + Google for processing. Render Starter (always-on) adds ~US$ 7/mo if preferred. Free Render web services spin down after 15 minutes idle."
        />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="7 · monthly cost at scale" defaultOpen={true}>
        <Prose>
          <p>
            Simulation assumptions: ~20 minutes total compute per listing
            (including resumes), 2 vCPU / 2 GiB, region{" "}
            <span className="text-fg-primary">us-central1</span>, and ~10k input
            + 2k output tokens for DeepSeek. Flash peak pricing without cache ≈{" "}
            <span className="text-fg-primary">US$ 0.0054 per listing</span>.
            Off-peak roughly halves the AI line. Numbers are planning estimates
            until the pilot measures real usage.
          </p>
        </Prose>
        <DataTable
          headers={[
            "new listings / mo",
            "cloud run jobs¹",
            "deepseek",
            "aux reserve²",
            "monthly budget",
          ]}
          rows={[
            ["25", "US$ 0", "US$ 0.14", "US$ 3", "US$ 3.14"],
            ["100", "US$ 0", "US$ 0.54", "US$ 5", "US$ 5.54"],
            ["500", "US$ 18.78", "US$ 2.70", "US$ 5", "US$ 26.48"],
            ["1,000", "US$ 42.78", "US$ 5.40", "US$ 10", "US$ 58.18"],
          ]}
          footnote="¹ With Cloud Run free tier available. Without it ≈ US$ 4.34 / 10.34 / 31.70 / 63.40. The tier is shared per billing account. ² Budget provision, not a fixed vendor fee. More photos, retries, or browser time raise usage."
        />
        <Prose>
          <p className="pt-4">
            <span className="text-fg-primary font-medium">owned pipeline vs Claude subscriptions.</span>{" "}
            same volumes, recurring cost only. Pro is left out because it does
            not hold the sessions.
          </p>
        </Prose>
        <DataTable
          headers={[
            "new listings / mo",
            "Claude Max 20x",
            "Claude Max 5x",
            "owned pipeline",
          ]}
          rows={[
            ["25", "US$ 200", "US$ 100", "US$ 3.14"],
            ["100", "US$ 200", "US$ 100", "US$ 5.54"],
            ["500", "US$ 200+ ³", "US$ 100+ ³", "US$ 26.48"],
            ["1,000", "US$ 200+ ³", "US$ 100+ ³", "US$ 58.18"],
          ]}
          footnote="³ One seat, run by one person. At this volume the caps make extra seats or paid usage credits likely, plus the operator time to drive every session. The owned pipeline stays below a single Max 5x seat at every volume simulated."
        />
        <Prose>
          <p className="pt-4">
            The API alternative is not cheaper either. As an illustration only:
            a Sonnet-style agent accumulating ~500k input + 30k output tokens
            could spend ~US$ 1.95 in AI per listing (about US$ 195 at 100
            listings), versus ~US$ 0.54 DeepSeek in the owned path. That agent
            figure must be measured before any decision.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="8 · the real cost · administrative hours" defaultOpen={true}>
        <Prose>
          <p>
            The week-long cycle is mostly waiting. The expensive part is active
            administrative work: receiving information, filling systems,
            chasing blockers, and checking results. Automation should shrink
            that active work; photography and travel stay with the team.
          </p>
          <p>illustrative comparison at US$ 14/h (same rate as this proposal):</p>
        </Prose>
        <DataTable
          headers={["for 20 listings / mo", "today", "with automation"]}
          rows={[
            ["admin work per listing", "2 hours", "15 minutes"],
            ["admin work per month", "40 hours", "5 hours"],
            ["value of that time", "US$ 560", "US$ 70"],
            ["capacity released", "n/a", "35 hours · US$ 490/mo"],
          ]}
          footnote="Example only. Replace with Hoste's measured hours per listing and the fully loaded cost of the person who owns the process. The pilot must track real 1–2 week cycles, including partial deliveries and resumes."
        />
        <Prose>
          <p className="pt-4">
            This does not automatically remove a full salary. If the person
            stays, you free capacity for more listings or other work. Cash
            savings appear when you avoid a new hire, overtime, outsourcing, or
            other real spend. At the illustrative US$ 490/mo capacity release, a
            US$ 1,120 build pays back in roughly{" "}
            <span className="text-fg-primary">2.3 months</span> before infra and
            maintenance.
          </p>
        </Prose>
        <Prose>
          <p className="pt-4">
            subscriptions vs build, at 100 listings/mo, before counting any
            admin hours:
          </p>
        </Prose>
        <DataTable
          headers={["path", "build", "ops / year", "first year", "3 years"]}
          rows={[
            [
              "Claude Max 5x + assisted setup",
              "US$ 280",
              "US$ 1,200",
              "US$ 1,480",
              "US$ 3,880",
            ],
            [
              "Claude Max 20x + assisted setup",
              "US$ 280",
              "US$ 2,400",
              "US$ 2,680",
              "US$ 7,480",
            ],
            [
              "owned pipeline · API-first",
              "US$ 1,120",
              "US$ 66.48",
              "US$ 1,186.48",
              "US$ 1,319.44",
            ],
            [
              "owned pipeline · browser-heavy",
              "US$ 1,680",
              "US$ 66.48⁴",
              "US$ 1,746.48",
              "US$ 1,879.44",
            ],
          ]}
          footnote="⁴ Keeps the 20-minute-per-listing compute hypothesis. Browser-heavy may use more. The table excludes human hours and optional maintenance."
        />
        <Prose>
          <p className="pt-4">
            The API-first build is already cheaper than Max 5x in the first
            year. Against subscription cost alone, it pays back in{" "}
            <span className="text-fg-primary">~9 months vs Max 5x</span> and{" "}
            <span className="text-fg-primary">~4 months vs Max 20x</span>.
            Browser-heavy pays back in ~15 and ~7 months. Over three years the
            API-first build saves ~US$ 2,560 vs Max 5x and ~US$ 6,160 vs Max
            20x. That is before the admin hours saved, which are the larger
            number.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="9 · why own the pipeline · what comes next" defaultOpen={true}>
        <Prose>
          <p>
            A Claude subscription rents capacity that runs on one person&apos;s
            computer. An owned pipeline is an asset: Hoste keeps the code, the
            data, and the integrations, and can extend them.
          </p>
        </Prose>
        <DataTable
          headers={["", "Claude subscription", "owned pipeline"]}
          rows={[
            ["runs without a person", "no, every session is driven", "yes, triggered by events"],
            ["cost as volume grows", "seats and caps", "cents per listing"],
            ["listing history & audit", "scattered in chats", "every step logged in one place"],
            ["AI model choice", "Claude only", "best model per step, swappable"],
            ["business rules", "re-explained in prompts", "fixed in code, same every time"],
            ["failure recovery", "start the session over", "resume from last confirmed step"],
            ["reuse for other workflows", "manual, per session", "same connectors, new jobs"],
          ]}
        />
        <Prose>
          <p className="pt-4">
            Once Typeform, Guesty, Breezeway, PriceLabs, and Besty are wired
            into one system with shared state, each new automation is a smaller
            project. The expensive part, connecting the tools and modeling the
            data, is already paid for. Possible next modules, each scoped and
            priced separately:
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">listing quality monitor</span>
                {" · "}flag listings with missing photos, weak copy, or drift
                between channels
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">homeowner reporting</span>
                {" · "}onboarding status and performance summaries sent to owners
                automatically
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">pricing & occupancy alerts</span>
                {" · "}PriceLabs and calendar signals turned into actions for the
                team
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">operations follow-up</span>
                {" · "}Breezeway tasks, cleanings, and maintenance tickets tracked
                against each property
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">reviews & guest messages</span>
                {" · "}classify feedback and draft replies for approval
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">new markets</span>
                {" · "}the same flow serves new Colorado and Arizona cities
                without extra headcount
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">other apps</span>
                {" · "}Slack, email, Google Drive, CRM, or BI connected through the
                same webhooks and API
              </span>
            </li>
          </ul>
          <p>
            Claude can still be one of the models inside the pipeline where it
            is the best fit. The difference is that Hoste controls when it runs,
            what it costs, and what happens to the results.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="10 · scope · in / out" defaultOpen={true}>
        <Prose>
          <p>
            <span className="text-fg-primary font-medium">in scope (owned pipeline)</span>
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>Typeform webhook → validate → initial Guesty create/update</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>field fill, fees/calendar/messages where automatable</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>DeepSeek labeling + title/description generation</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>photo upload after team delivery · PriceLabs / Besty hooks as agreed</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>dashboard with login · history · blockers · resume · alerts</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>deploy, tests on real listings, publication after approval</span>
            </li>
          </ul>
          <p className="pt-2">
            <span className="text-fg-primary font-medium">stays with Hoste</span>
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>site visits, photography, on-the-ground verification</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>pricing decisions, commercial exceptions, final go-live approval</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>existing SaaS plans: Typeform, Guesty, Breezeway, PriceLabs, Besty, storage, domain renewal</span>
            </li>
          </ul>
          <p>
            The SOP still has incomplete steps. Those must be defined before
            full automation. We automate available technical actions and
            coordinate human dependencies. We do not pretend every SOP line is
            already machine-ready.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="11 · other costs · explicit" defaultOpen={true}>
        <Prose>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">maintenance</span>
                {" · "}US$ 30/h when needed; optional 2h/mo reserve = US$ 50/mo
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">possible extras</span>
                {" · "}plan upgrades, Guesty API access fees, external lookup
                services, taxes/FX if applicable
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-subtle shrink-0">-</span>
              <span>
                <span className="text-fg-primary">total company cost</span>
                {" · "}current plans + automation + actual maintenance + human
                work + applicable charges
              </span>
            </li>
          </ul>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="12 · recommendation & acceptance" defaultOpen={true}>
        <Prose>
          <p>
            Start with the owned pipeline targeting{" "}
            <span className="text-fg-primary font-medium">US$ 1,120 · ~4 weeks</span>
            {" "}
            at 20h/week, confirming the technical path in the first four hours.
            Operating cost stays between ~US$ 3 and ~US$ 60/mo across the
            simulated volumes, below a single Claude Max 5x seat. On top of
            that come the admin hours saved and a pipeline Hoste can extend.
            Both get measured in the pilot.
          </p>
          <p>
            <span className="text-fg-primary font-medium">acceptance.</span>{" "}
            One real listing completes the agreed flow: create, configure,
            reviewed content, verified integrations, publish after approval.
            That includes resume after an interruption without duplicating the
            listing.
          </p>
          <p>
            To close ROI precisely we need three Hoste inputs: listings per
            month, admin hours per listing today, and monthly cost of the person
            who owns the process.
          </p>
        </Prose>
        <div className="mt-6 pl-4 border-l border-dotted border-border-default">
          <p className="text-sm text-fg-muted mb-3">next step</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:contato@v1torres.dev?subject=Hoste%20listing%20automation%20proposal"
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
            <span className="text-fg-subtle">|</span>
            <a
              href="https://iamhoste.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg-primary transition-colors"
            >
              hoste site
            </a>
          </div>
        </div>
      </CollapsibleSection>

    </div>
  );
}
