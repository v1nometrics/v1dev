const WEEKS = ["wk1", "wk2", "wk3", "wk4", "wk5", "wk6"] as const;

const DELIVERY_ROWS = [
  {
    key: "a",
    name: "claude assisted",
    span: 1,
    note: "20h · US$ 280",
    extra: "+ Max US$ 100–200/mo",
  },
  {
    key: "b0",
    name: "reduced pilot",
    span: 2.5,
    note: "50h · US$ 700",
  },
  {
    key: "b1",
    name: "api-first",
    span: 4,
    note: "80h · US$ 1,120",
    recommended: true,
  },
  {
    key: "b2",
    name: "browser-heavy",
    span: 6,
    note: "120h · US$ 1,680",
  },
] as const;

function WeekGuides() {
  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-6" aria-hidden>
      {WEEKS.map((week) => (
        <div
          key={week}
          className="border-l border-dotted border-border-default first:border-l-0"
        />
      ))}
    </div>
  );
}

export function DeliveryTimeline() {
  return (
    <figure className="mt-4">
      <div className="border border-border-default">
        <div className="grid grid-cols-6 border-b border-dotted border-border-default text-[11px] text-fg-subtle">
          {WEEKS.map((week) => (
            <div
              key={week}
              className="border-l border-dotted border-border-default px-2 py-2 first:border-l-0"
            >
              {week}
            </div>
          ))}
        </div>

        {DELIVERY_ROWS.map((row) => (
          <div
            key={row.key}
            className="border-b border-dotted border-border-default px-0 py-3 last:border-b-0"
          >
            <div className="mb-2 flex items-baseline justify-between gap-3 px-2 text-xs">
              <span className="min-w-0">
                <span className="text-fg-subtle">{row.key}</span>
                <span className="text-fg-subtle"> · </span>
                <span className="text-fg-primary">{row.name}</span>
                {"recommended" in row && row.recommended ? (
                  <span className="badge ml-2">recommended</span>
                ) : null}
              </span>
              <span className="shrink-0 text-right text-fg-muted">
                {row.note}
                {"extra" in row && row.extra ? (
                  <span className="mt-0.5 block text-fg-subtle">{row.extra}</span>
                ) : null}
              </span>
            </div>
            <div className="relative h-5">
              <WeekGuides />
              <div
                className="absolute top-1/2 h-[3px] -translate-y-1/2"
                style={{
                  width: `calc(${(row.span / WEEKS.length) * 100}% - 0.7rem)`,
                  backgroundColor: "var(--fg-primary)",
                }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs leading-none text-fg-primary"
                style={{ left: `calc(${(row.span / WEEKS.length) * 100}% - 0.7rem)` }}
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
        delivery at 20h/week. ● is a working delivery, not a document.
      </figcaption>
      <ul className="mt-3 space-y-1 text-xs text-fg-muted">
        <li className="flex gap-2">
          <span className="text-fg-subtle">◐</span>
          <span>first 4h of wk1 confirm b1 or b2</span>
        </li>
        <li className="flex gap-2">
          <span className="text-fg-subtle">○</span>
          <span>b0 can expand into b1 or b2. Hours already done are not billed again</span>
        </li>
      </ul>
    </figure>
  );
}

const WEEK_PLAN = [
  {
    week: "wk1",
    mark: "◐",
    text: "access check (4h) · Typeform webhook · listing state · no duplicates",
  },
  {
    week: "wk2",
    mark: "○",
    text: "Guesty create + update · fees · calendar · messages",
  },
  {
    week: "wk3",
    mark: "○",
    text: "DeepSeek labeling + copy · photo upload · PriceLabs / Besty",
  },
  {
    week: "wk4",
    mark: "●",
    text: "dashboard · tests on real listings · resume test · approved go-live",
  },
] as const;

export function WeekPlan() {
  return (
    <figure className="mt-4">
      <div className="border border-border-default">
        <div className="border-b border-dotted border-border-default px-3 py-2 text-xs text-fg-muted">
          b1 · api-first · 80h at 20h/week
        </div>
        <ol>
          {WEEK_PLAN.map((step) => (
            <li
              key={step.week}
              className="grid grid-cols-[3.25rem_1.25rem_1fr] items-baseline gap-2 border-b border-dotted border-border-default px-3 py-2.5 text-xs last:border-b-0"
            >
              <span className="text-fg-subtle">{step.week}</span>
              <span className="text-fg-primary" aria-hidden>
                {step.mark}
              </span>
              <span className="text-fg-secondary">{step.text}</span>
            </li>
          ))}
        </ol>
        <p className="border-t border-dotted border-border-default px-3 py-2 text-xs text-fg-muted">
          Then ops ~US$ 5.54/mo at 100 listings · maintenance US$ 30/h on demand
        </p>
      </div>
      <figcaption className="mt-2 text-xs text-fg-subtle">
        <span className="mr-1">›</span>
        recommended path, week by week
      </figcaption>
    </figure>
  );
}

const LISTING_CYCLE = [
  {
    when: "day 0",
    mark: "●",
    title: "Typeform submitted",
    detail: "system validates and creates the initial listing",
  },
  {
    when: "day 1–2",
    mark: "○",
    title: "Breezeway onboarding",
    detail: "system opens the checklist and assigns owners",
  },
  {
    when: "day 2–7",
    mark: "○",
    title: "visit · photos · fees",
    detail: "team works. system waits and spends no compute",
  },
  {
    when: "on delivery",
    mark: "○",
    title: "fill · copy · upload",
    detail: "Cloud Run Job resumes from the saved state",
  },
  {
    when: "day 7–14",
    mark: "○",
    title: "review + approval",
    detail: "team decides exceptions only",
  },
  {
    when: "",
    mark: "●",
    title: "go-live + verification",
    detail: "system publishes and confirms",
  },
] as const;

export function ListingCycle() {
  return (
    <figure className="mt-4">
      <ol className="border border-border-default px-3 py-3">
        {LISTING_CYCLE.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[5.25rem_1.25rem_1fr] gap-x-2">
            <div className="pt-0.5 text-xs text-fg-subtle">{step.when}</div>
            <div className="flex flex-col items-center">
              <span className="text-xs leading-none text-fg-primary" aria-hidden>
                {step.mark}
              </span>
              {index < LISTING_CYCLE.length - 1 ? (
                <span className="my-1 min-h-6 w-px flex-1 border-l border-dotted border-border-default" />
              ) : null}
            </div>
            <div className={index < LISTING_CYCLE.length - 1 ? "pb-3" : ""}>
              <div className="text-xs text-fg-primary">{step.title}</div>
              <div className="mt-0.5 text-xs text-fg-muted">{step.detail}</div>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-xs text-fg-subtle">
        <span className="mr-1">›</span>
        one listing, from Typeform to go-live
      </figcaption>
    </figure>
  );
}
