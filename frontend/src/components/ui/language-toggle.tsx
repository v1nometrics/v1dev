"use client";

import { useLocale } from "@/components/providers/locale-provider";

/**
 * Bandeiras minimalistas em SVG com estética pontilhada
 */
function BrazilFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden="true"
      className="text-fg-muted"
    >
      {/* Retângulo externo */}
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="13"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 1"
        fill="none"
      />
      {/* Losango */}
      <path
        d="M10 2 L17 7 L10 12 L3 7 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Círculo central */}
      <circle
        cx="10"
        cy="7"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 1"
        fill="none"
      />
    </svg>
  );
}

function USAFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden="true"
      className="text-fg-muted"
    >
      {/* Retângulo externo */}
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="13"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 1"
        fill="none"
      />
      {/* Listras */}
      <line x1="0" y1="3.5" x2="20" y2="3.5" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="10.5" x2="20" y2="10.5" stroke="currentColor" strokeWidth="0.75" />
      {/* Canton (quadrado das estrelas) */}
      <rect
        x="1"
        y="1"
        width="7"
        height="5.5"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Estrelas simplificadas como pontos */}
      <circle cx="2.5" cy="2.5" r="0.6" fill="currentColor" />
      <circle cx="4.5" cy="2.5" r="0.6" fill="currentColor" />
      <circle cx="6.5" cy="2.5" r="0.6" fill="currentColor" />
      <circle cx="3.5" cy="4.5" r="0.6" fill="currentColor" />
      <circle cx="5.5" cy="4.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLocale();

  // Mostra a bandeira do idioma alternativo (para onde vai mudar)
  const Flag = locale === "pt-BR" ? USAFlag : BrazilFlag;

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 text-fg-muted hover:text-fg-primary transition-colors border border-dotted border-border-default px-2 py-1"
      aria-label={t("common.language")}
      title={locale === "pt-BR" ? "Switch to English" : "Mudar para Português"}
    >
      <Flag />
      <span className="text-[10px] uppercase tracking-wider">
        {locale === "pt-BR" ? "en" : "pt"}
      </span>
    </button>
  );
}
