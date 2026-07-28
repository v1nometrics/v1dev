import type { ReactNode } from "react";

export type CalloutType = "note" | "tip" | "warning" | "decision";

const LABELS_PT: Record<CalloutType, string> = {
  note: "nota",
  tip: "dica",
  warning: "atenção",
  decision: "decisão",
};

const LABELS_EN: Record<CalloutType, string> = {
  note: "note",
  tip: "tip",
  warning: "warning",
  decision: "decision",
};

export function Callout({
  type = "note",
  title,
  locale = "pt-BR",
  children,
}: {
  type?: CalloutType;
  title?: string;
  locale?: "pt-BR" | "en";
  children: ReactNode;
}) {
  const labels = locale === "en" ? LABELS_EN : LABELS_PT;
  const label = title ? `${labels[type]}: ${title}` : labels[type];

  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-label">{label}</div>
      <div className="callout-body">{children}</div>
    </div>
  );
}
