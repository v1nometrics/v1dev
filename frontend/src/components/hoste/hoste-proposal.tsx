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

const DELIVERY_TIMELINE = `                      wk1     wk2     wk3     wk4     wk5     wk6
                      │       │       │       │       │       │
a  · claude assisted  ━━━━━━━●                                          20h  · US$ 280
b0 · reduced pilot    ━━━━━━━━━━━━━━━━━━━●                              50h  · US$ 700
b1 · api-first        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●                  80h  · US$ 1,120  · recommended
b2 · browser-heavy    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●  120h · US$ 1,680

◐ first 4h of wk1: access check confirms b1 or b2
○ b0 can expand into b1 or b2; hours already done are not billed again`;

const B1_WEEKS = `b1 · api-first · 80h at 20h/week

wk1  ◐ access check (4h) · Typeform webhook · listing state · no duplicates
wk2  ○ Guesty create + update · fees · calendar · messages
wk3  ○ DeepSeek labeling + copy · photo upload · PriceLabs / Besty
wk4  ● dashboard · tests on real listings · resume test · approved go-live

then ops ~US$ 5.54/mo at 100 listings · maintenance US$ 30/h on demand`;

const LISTING_CYCLE = `day 0         ● Typeform submitted        system validates, creates initial listing
day 1–2       ○ Breezeway onboarding      system opens checklist, assigns owners
day 2–7       ○ visit · photos · fees     team works, system waits (no compute)
on delivery   ○ fill · copy · upload      Cloud Run Job resumes from saved state
day 7–14      ○ review + approval         team decides exceptions only
              ● go-live + verification    system publishes and confirms`;

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
            computer, or a owned pipeline (Render + Google Cloud Run Jobs +
            DeepSeek Flash) with a dashboard on Hoste&apos;s domain. The
            recommended path is the owned pipeline: lower recurring cost per
            listing, durable state across the multi-day cycle, and human effort
            concentrated on photography, pricing exceptions, and final approval.
          </p>
          <p>
            Comparing only US$ 20/mo Claude Pro to a few dollars of cloud spend
            misses the main cost: administrative hours. The ROI case is hours
            freed per listing, not subscription arithmetic alone.
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
              <span>Claude Pro: US$ 20/mo (API billed separately)</span>
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
            a Pro subscription may support a small assisted pilot, but it does
            not guarantee a fixed number of listings. session and weekly limits
            apply; long tasks consume quota faster. Pro does not include the API
            used by a custom system.
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
          footnote="alternatives, not additive. first 4 hours (included) validate Guesty write access and confirm the technical path. a reduced pilot at US$ 700 / 50h remains available; work rolls forward if you expand to full scope."
        />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="3 · timeline · every option" defaultOpen={true}>
        <Prose>
          <p>
            all options side by side at 20h/week. each bar ends at a working
            delivery, not at a document.
          </p>
        </Prose>
        <MonoBlock caption="delivery timeline by option">{DELIVERY_TIMELINE}</MonoBlock>
        <MonoBlock caption="recommended path · week by week">{B1_WEEKS}</MonoBlock>
        <Prose>
          <p className="pt-4">
            b2 runs the same phases. wk2 to wk5 stretch to cover browser
            automation wherever the Guesty API has gaps.
          </p>
          <p>
            once live, every new listing follows its own one to two week cycle.
            the system only spends compute when something arrives.
          </p>
        </Prose>
        <MonoBlock caption="one listing · from Typeform to go-live">{LISTING_CYCLE}</MonoBlock>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="4 · architecture · parallel + resilient" defaultOpen={true}>
        <Prose>
          <p>
            onboarding is not one linear job. after the initial Guesty listing,
            Breezeway onboarding, photos, visit data, and commercial rules can
            advance in parallel. the system needs a coordinator that keeps one
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
            currently read-only. we will confirm write permissions on Hoste&apos;s
            account in the first hours. where API coverage is incomplete, Python
            + browser automation fills the gap.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="5 · human vs system" defaultOpen={true}>
        <Prose>
          <p>
            human effort stays where it creates value. the system presents what
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
            photos are Hoste&apos;s team work. The pipeline waits for them and
            resumes. DeepSeek Flash handles labeling: interpret answers,
            organize amenities, produce titles/descriptions from confirmed data.
            fee rules, dates, and publication stay in code.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="6 · infrastructure · minimum spend" defaultOpen={true}>
        <Prose>
          <p>
            no new domain purchase. use something like{" "}
            <span className="text-fg-primary">dashboard.iamhoste.com</span>{" "}
            (subdomain on the existing domain). a path like{" "}
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
          footnote="lean default: Render static UI + Google for processing. Render Starter (always-on) adds ~US$ 7/mo if preferred. free Render web services spin down after 15 minutes idle."
        />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="7 · monthly cost at scale" defaultOpen={true}>
        <Prose>
          <p>
            simulation assumptions: ~20 minutes total compute per listing
            (including resumes), 2 vCPU / 2 GiB, region{" "}
            <span className="text-fg-primary">us-central1</span>, and ~10k input
            + 2k output tokens for DeepSeek. Flash peak pricing without cache ≈{" "}
            <span className="text-fg-primary">US$ 0.0054 per listing</span>.
            off-peak roughly halves the AI line. numbers are planning estimates
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
          footnote="¹ with Cloud Run free tier available. without it ≈ US$ 4.34 / 10.34 / 31.70 / 63.40. tier is shared per billing account. ² budget provision, not a fixed vendor fee. more photos, retries, or browser time raise usage."
        />
        <Prose>
          <p className="pt-4">
            <span className="text-fg-primary font-medium">would US$ 20 Claude Pro cover this?</span>{" "}
            for a small assisted operation, maybe. it does not guarantee volume,
            does not replace durable orchestration, and does not include API
            usage for an autonomous pipeline. as an illustration only: a
            Sonnet-style agent accumulating ~500k input + 30k output tokens
            could spend ~US$ 1.95 in AI per listing (about US$ 195 at 100
            listings), versus ~US$ 0.54 DeepSeek in the owned path. that agent
            figure must be measured; it is not Pro billing.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="8 · the real cost · administrative hours" defaultOpen={true}>
        <Prose>
          <p>
            the week-long cycle is mostly waiting. the expensive part is active
            administrative work: receiving information, filling systems,
            chasing blockers, and checking results. automation should shrink
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
          footnote="example only. replace with Hoste's measured hours/listing and fully loaded cost of the person who owns the process. pilot must track real 1–2 week cycles including partial deliveries and resumes."
        />
        <Prose>
          <p className="pt-4">
            this does not automatically remove a full salary. if the person
            stays, you free capacity for more listings or other work. cash
            savings appear when you avoid a new hire, overtime, outsourcing, or
            other real spend. at the illustrative US$ 490/mo capacity release, a
            US$ 1,120 build pays back in roughly{" "}
            <span className="text-fg-primary">2.3 months</span> before infra and
            maintenance.
          </p>
        </Prose>
        <DataTable
          headers={["path", "build", "ops / year", "first year"]}
          rows={[
            [
              "Claude Pro + assisted pilot",
              "US$ 280",
              "US$ 240",
              "US$ 520",
            ],
            [
              "owned pipeline · API-first",
              "US$ 1,120",
              "US$ 66.48",
              "US$ 1,186.48",
            ],
            [
              "owned pipeline · browser-heavy",
              "US$ 1,680",
              "US$ 66.48³",
              "US$ 1,746.48",
            ],
          ]}
          footnote="³ keeps the 20-minute/listing compute hypothesis; browser-heavy may use more. table excludes human hours and optional maintenance. Claude is cheaper to start; owned pipeline wins on recurring cost, dashboard, history, and machine-independent execution. ~4 extra admin hours saved per month at US$ 14/h closes the first-year gap vs Claude for the US$ 1,120 option."
        />
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="9 · scope · in / out" defaultOpen={true}>
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
            the SOP still has incomplete steps. those must be defined before
            full automation. we automate available technical actions and
            coordinate human dependencies; we do not pretend every SOP line is
            already machine-ready.
          </p>
        </Prose>
      </CollapsibleSection>

      <hr className="separator-dotted" />

      <CollapsibleSection title="10 · other costs · explicit" defaultOpen={false}>
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

      <CollapsibleSection title="11 · recommendation & acceptance" defaultOpen={true}>
        <Prose>
          <p>
            start with the owned pipeline targeting{" "}
            <span className="text-fg-primary font-medium">US$ 1,120 · ~4 weeks</span>
            {" "}
            at 20h/week, confirming the technical path in the first four hours.
            operating under US$ 20/mo is viable at low volume under the
            hypotheses above. at higher volume, the win is low cost per listing
            plus admin hours saved, proven in the pilot.
          </p>
          <p>
            <span className="text-fg-primary font-medium">acceptance.</span>{" "}
            One real listing completes the agreed flow: create, configure,
            reviewed content, verified integrations, publish after approval.
            That includes resume after an interruption without duplicating the
            listing.
          </p>
          <p>
            to close ROI precisely we need three Hoste inputs: listings per
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
