import type { ReactNode } from "react";

/**
 * Terminal-style figure for ASCII or structured diagrams in MDX.
 * Keeps the mono aesthetic without Mermaid chrome.
 */
export function Diagram({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="mdx-diagram">
      <div className="mdx-diagram-frame">
        <pre className="mdx-diagram-pre">{children}</pre>
      </div>
      {caption ? (
        <figcaption className="mdx-diagram-caption">
          <span className="mdx-diagram-caption-mark">›</span>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type FlowStep = {
  label: string;
  note?: string;
};

/**
 * Vertical step flow with dotted connectors — pipeline / cascade visuals.
 */
export function Flow({
  caption,
  steps,
}: {
  caption?: string;
  steps: FlowStep[];
}) {
  return (
    <figure className="mdx-diagram">
      <div className="mdx-flow">
        {steps.map((step, i) => (
          <div key={`${step.label}-${i}`} className="mdx-flow-step">
            <div className="mdx-flow-rail">
              <span className="mdx-flow-dot" aria-hidden>
                {i === steps.length - 1 ? "●" : "○"}
              </span>
              {i < steps.length - 1 ? (
                <span className="mdx-flow-line" aria-hidden />
              ) : null}
            </div>
            <div className="mdx-flow-body">
              <div className="mdx-flow-label">{step.label}</div>
              {step.note ? (
                <div className="mdx-flow-note">{step.note}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {caption ? (
        <figcaption className="mdx-diagram-caption">
          <span className="mdx-diagram-caption-mark">›</span>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type CompareSide = {
  title: string;
  items: string[];
};

/**
 * Side-by-side comparison panels (demo vs system, before vs after).
 */
export function Compare({
  caption,
  left,
  right,
}: {
  caption?: string;
  left: CompareSide;
  right: CompareSide;
}) {
  return (
    <figure className="mdx-diagram">
      <div className="mdx-compare">
        <div className="mdx-compare-side">
          <div className="mdx-compare-title">{left.title}</div>
          <ul className="mdx-compare-list">
            {left.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mdx-compare-divider" aria-hidden>
          <span>vs</span>
        </div>
        <div className="mdx-compare-side mdx-compare-side-emphasis">
          <div className="mdx-compare-title">{right.title}</div>
          <ul className="mdx-compare-list">
            {right.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {caption ? (
        <figcaption className="mdx-diagram-caption">
          <span className="mdx-diagram-caption-mark">›</span>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Compact before → after metric strip (e.g. latency under contention).
 */
export function Delta({
  caption,
  from,
  to,
  unit,
  label,
  fromHint = "isolado",
  toHint = "sob contenção",
}: {
  caption?: string;
  from: string;
  to: string;
  unit?: string;
  label?: string;
  fromHint?: string;
  toHint?: string;
}) {
  return (
    <figure className="mdx-diagram">
      <div className="mdx-delta">
        {label ? <div className="mdx-delta-label">{label}</div> : null}
        <div className="mdx-delta-row">
          <div className="mdx-delta-value">
            <div className="mdx-delta-main">
              <span className="mdx-delta-num">{from}</span>
              {unit ? <span className="mdx-delta-unit">{unit}</span> : null}
            </div>
            <span className="mdx-delta-hint">{fromHint}</span>
          </div>
          <span className="mdx-delta-arrow" aria-hidden>
            →
          </span>
          <div className="mdx-delta-value mdx-delta-value-bad">
            <div className="mdx-delta-main">
              <span className="mdx-delta-num">{to}</span>
              {unit ? <span className="mdx-delta-unit">{unit}</span> : null}
            </div>
            <span className="mdx-delta-hint">{toHint}</span>
          </div>
        </div>
      </div>
      {caption ? (
        <figcaption className="mdx-diagram-caption">
          <span className="mdx-diagram-caption-mark">›</span>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
