"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { scrambleFrame } from "@/lib/scramble";

interface TProps {
  /** Translation key (dot notation) */
  k: string;
  /** Custom className */
  className?: string;
  /** Animation duration in ms */
  duration?: number;
  /** HTML tag to render */
  as?: ElementType;
}

/**
 * Translated text component with matrix scramble animation.
 * Usage: <T k="nav.home" /> or <T k="home.bio" as="p" className="text-muted" />
 */
export function T({ k, className, duration = 2500, as: Tag = "span" }: TProps) {
  const { t, lastChange } = useLocale();
  const text = t(k);

  const [animationText, setAnimationText] = useState<string | null>(null);
  const previousTextRef = useRef(text);
  const lastChangeRef = useRef(lastChange);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prevText = previousTextRef.current;
    const newText = text;
    const localeChanged =
      lastChangeRef.current !== lastChange && lastChange > 0;

    previousTextRef.current = newText;
    lastChangeRef.current = lastChange;

    if (!localeChanged || prevText === newText) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    let cancelled = false;
    const startTime = performance.now();

    const animate = (now: number) => {
      if (cancelled) return;

      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationText(scrambleFrame(prevText, newText, eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
        setAnimationText(null);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      // Live `text` remains correct if Strict Mode cancels mid-flight.
      setAnimationText(null);
    };
  }, [text, lastChange, duration]);

  return <Tag className={className}>{animationText ?? text}</Tag>;
}
