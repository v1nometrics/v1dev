"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { scrambleFrame } from "@/lib/scramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Duration in ms — default matches `<T>` */
  duration?: number;
}

/**
 * Matrix scramble for dynamic (non-JSON) strings.
 * Uses `lastChange` from LocaleProvider — same contract as `<T>`.
 */
export function ScrambleText({
  text,
  className,
  duration = 2500,
}: ScrambleTextProps) {
  const { lastChange } = useLocale();
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
      // Fall through to live `text` if cancelled mid-flight.
      setAnimationText(null);
    };
  }, [text, lastChange, duration]);

  return <span className={className}>{animationText ?? text}</span>;
}
