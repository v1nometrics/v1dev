"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}";

const PRESERVE = /[\s.,;:!?()[\]{}<>\/\\-–—·│─┌┐└┘┬▼►←→]/;

function scrambleFrame(from: string, to: string, eased: number): string {
  const maxLength = Math.max(from.length, to.length);
  let result = "";

  for (let i = 0; i < maxLength; i++) {
    // Same sweep as <T>: left-to-right settle with a long tail of noise
    const charProgress = Math.min(1, eased * 1.8 - (i / maxLength) * 0.8);

    if (charProgress >= 1) {
      result += to[i] ?? "";
    } else if (charProgress <= 0) {
      result += from[i] ?? " ";
    } else {
      const target = to[i] ?? "";
      if (PRESERVE.test(target)) {
        result += target;
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
  }

  return result;
}

function readPlain(el: HTMLElement | null): string {
  if (!el) return "";
  // innerText keeps block newlines; falls back if unavailable
  return (el.innerText || el.textContent || "").replace(/\n{3,}/g, "\n\n");
}

/**
 * Swaps locale-bound rich content with the same matrix scramble used by <T>.
 * Both trees stay mounted so we can morph plain text, then reveal the MDX.
 */
export function ScrambleSwap({
  byLocale,
  duration = 2500,
  className,
}: {
  byLocale: Record<Locale, ReactNode>;
  duration?: number;
  className?: string;
}) {
  const { locale, lastChange } = useLocale();
  const [displayLocale, setDisplayLocale] = useState<Locale>(locale);
  const [overlay, setOverlay] = useState<string | null>(null);

  const ptRef = useRef<HTMLDivElement>(null);
  const enRef = useRef<HTMLDivElement>(null);
  const displayLocaleRef = useRef(displayLocale);
  const lastChangeRef = useRef(lastChange);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    displayLocaleRef.current = displayLocale;
  }, [displayLocale]);

  useEffect(() => {
    const localeChanged =
      lastChangeRef.current !== lastChange && lastChange > 0;
    lastChangeRef.current = lastChange;

    if (!localeChanged || locale === displayLocaleRef.current) {
      return;
    }

    const fromEl =
      displayLocaleRef.current === "pt-BR" ? ptRef.current : enRef.current;
    const toEl = locale === "pt-BR" ? ptRef.current : enRef.current;
    const fromText = readPlain(fromEl);
    const toText = readPlain(toEl);

    if (fromText === toText) {
      setDisplayLocale(locale);
      setOverlay(null);
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const startTime = performance.now();
    setOverlay(fromText);

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setOverlay(scrambleFrame(fromText, toText, eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayLocale(locale);
        setOverlay(null);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [locale, lastChange, duration]);

  const scrambling = overlay !== null;
  const showPt = displayLocale === "pt-BR" && !scrambling;
  const showEn = displayLocale === "en" && !scrambling;

  // Inactive tree stays visibility:hidden (not display:none) so innerText
  // still returns laid-out plain text with paragraph breaks.
  const inactive =
    "invisible absolute inset-x-0 top-0 -z-10 w-full pointer-events-none";

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ptRef}
        className={showPt ? "relative" : inactive}
        aria-hidden={!showPt}
      >
        {byLocale["pt-BR"]}
      </div>
      <div
        ref={enRef}
        className={showEn ? "relative" : inactive}
        aria-hidden={!showEn}
      >
        {byLocale.en}
      </div>

      {scrambling ? (
        <div
          className="mdx-content mdx-scramble-overlay"
          aria-live="polite"
          aria-busy="true"
        >
          {overlay}
        </div>
      ) : null}
    </div>
  );
}
