import type { ReactNode } from "react";

export type CalloutType = "note" | "tip" | "warning" | "decision";

const LABELS: Record<CalloutType, string> = {
  note: "nota",
  tip: "dica",
  warning: "atenção",
  decision: "decisão",
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const label = title ? `${LABELS[type]} — ${title}` : LABELS[type];

  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-label">{label}</div>
      <div className="callout-body">{children}</div>
    </div>
  );
}
