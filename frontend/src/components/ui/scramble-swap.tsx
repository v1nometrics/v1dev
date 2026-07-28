"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/i18n";
import { scrambleFrame } from "@/lib/scramble";
import { cn } from "@/lib/utils";

/**
 * Locale-bound MDX body with matrix scramble on toggle.
 *
 * Invariants:
 * 1. Rendered body is always `byLocale[locale]` (never a stale displayLocale).
 * 2. Overlay is decorative; cleanup never leaves the wrong language on screen.
 * 3. Frames write to a DOM node (no setState per frame).
 * 4. Plain texts come from props (stable, no hidden-tree innerText).
 */
export function ScrambleSwap({
  byLocale,
  plainByLocale,
  duration = 2500,
  className,
}: {
  byLocale: Record<Locale, ReactNode>;
  plainByLocale: Record<Locale, string>;
  duration?: number;
  className?: string;
}) {
  const { locale, lastChange } = useLocale();
  const [scrambling, setScrambling] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const localeRef = useRef<Locale>(locale);
  const handledChangeRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (lastChange === 0) return;
    if (handledChangeRef.current === lastChange) return;

    const fromLocale = localeRef.current;
    if (fromLocale === locale) {
      handledChangeRef.current = lastChange;
      return;
    }

    const fromText = plainByLocale[fromLocale] ?? "";
    const toText = plainByLocale[locale] ?? "";

    if (!fromText || !toText || fromText === toText) {
      localeRef.current = locale;
      handledChangeRef.current = lastChange;
      return;
    }

    let cancelled = false;
    let finished = false;

    const finish = () => {
      finished = true;
      localeRef.current = locale;
      handledChangeRef.current = lastChange;
      frameRef.current = null;
      setScrambling(false);
    };

    const startTime = performance.now();

    const animate = (now: number) => {
      if (cancelled) return;

      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (overlayRef.current) {
        overlayRef.current.textContent = scrambleFrame(fromText, toText, eased);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        finish();
      }
    };

    // Overlay node is always mounted — safe to write immediately after flag flip.
    frameRef.current = requestAnimationFrame(() => {
      if (cancelled) return;
      setScrambling(true);
      if (overlayRef.current) {
        overlayRef.current.textContent = fromText;
      }
      frameRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelled = true;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (!finished) {
        // Strict Mode remount can retry (localeRef unchanged, handledChange unset).
        setScrambling(false);
      }
    };
  }, [locale, lastChange, duration, plainByLocale]);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(scrambling && "invisible")}
        aria-hidden={scrambling}
      >
        {byLocale[locale]}
      </div>

      <div
        ref={overlayRef}
        className={cn(
          "mdx-content mdx-scramble-overlay absolute inset-x-0 top-0",
          !scrambling && "hidden"
        )}
        aria-hidden={!scrambling}
        aria-live="polite"
        aria-busy={scrambling}
      />
    </div>
  );
}
